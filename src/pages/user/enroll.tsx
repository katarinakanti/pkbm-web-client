import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Textarea,
  Progress,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  addToast,
} from "@heroui/react";
import {
  User,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Info,
  UserPlus,
  Plus,
  X,
} from "lucide-react";
import { Layout } from "../../components/layout/Layout";
import { UserUtility } from "../../utility";
import { UserApplicant } from "../../api/model/table/UserApplicant";
import { Gender } from "../../api/model/enum/Gender";
import { AxiosClient } from "../../api/AxiosClient";
import moment from "moment";

export function EnrollPage() {
  UserUtility.redirectIfNotLogin();
  const [loading_submit, setLoadingSubmit] = useState<boolean>(false);
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: boolean }>({});
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id_user_applicant: undefined as number | undefined,
    application_type: "",
    nisn: "",
    nik: "",
    pendidikan_terakhir: "",
    grade_terakhir: "",
    asal_sekolah: "",
    student_status: "BARU",
    alasan_pindah: "",
    parent_fullname: "",
    parent_phone: "",
    parent_email: "",
    kk_url: "",
    akta_lahir_url: "",
    ktp_ortu_url: "",
    photo_url: "",
    selfie_url: "",
    ijazah_terakhir_url: "",
    raport_url: "",
    surat_pindah_url: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jenisSiswa, setJenisSiswa] = useState<"siswa-tersimpan" | "siswa-baru">("siswa-baru");
  const [selectedApplicant, setSelectedApplicant] = useState<UserApplicant | null>(null);
  const [savedApplicants, setSavedApplicants] = useState<UserApplicant[]>([]);
  // Form for new applicant
  const [newApplicant, setNewApplicant] = useState<UserApplicant>({
    id: 0,
    id_user: 0,
    fullname: "",
    email: "",
    phone_number: "",
    address: "",
    gender: Gender.M,
    birth_date: new Date(),
    birth_place: "",
    religion: "",
  });

  // Fetch user applicants on component mount
  useEffect(() => {
    fetchUserApplicants();
  }, []);

  async function fetchUserApplicants() {
    try {
      const response = await AxiosClient.userGetUserApplicantsList({
        headers: {
          authorization: UserUtility.getAuthHeader(),
        },
      });
      setSavedApplicants(response || []);
    } catch (err: any) {
      addToast({
        title: "Gagal memuat data siswa",
        description: err?.response?.data?.toString() ?? err?.message ?? "Terjadi kesalahan",
        color: "danger",
      });
    }
  }

  // const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const nextStep = () => {
    // Validate step 1: Check if student is selected
    if (step === 1) {
      if (!selectedApplicant) {
        addToast({
          title: "Silakan pilih atau tambah siswa dahulu",
          color: "danger",
        });
        return;
      }
      if (!formData.application_type || !formData.nik || !formData.student_status || !formData.pendidikan_terakhir || !formData.grade_terakhir) {
        addToast({
          title: "Mohon lengkapi semua field yang wajib diisi",
          color: "danger",
        });
        return;
      }
    }

    // Validate step 2
    if (step === 2) {
      if (!formData.parent_fullname || !formData.parent_phone || !formData.parent_email) {
        addToast({
          title: "Mohon lengkapi semua field yang wajib diisi",
          color: "danger",
        });
        return;
      }
    }

    setStep((prev) => Math.min(prev + 1, 3));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Upload file to server and return URL
  async function uploadFile(file: File, fieldKey: string): Promise<string | null> {
    try {
      setUploadingFiles((prev) => ({ ...prev, [fieldKey]: true }));

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: UserUtility.getAuthHeader(),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      
      addToast({
        title: "File berhasil diupload",
        color: "success",
      });

      // Handle response - could be string directly or object with path
      const filePath = typeof data === 'string' ? data : (data.url || data.file_url || data.path || data);
      
      // Return the path (e.g., "/uploads/file.png")
      return filePath;
    } catch (err: any) {
      addToast({
        title: "Gagal upload file",
        description: err?.message ?? "Terjadi kesalahan saat mengupload file",
        color: "danger",
      });
      return null;
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [fieldKey]: false }));
    }
  }

  const handleFileChange = async (field: string, file: File | null) => {
    if (!file) {
      handleInputChange(field, "");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      addToast({
        title: "Ukuran file terlalu besar",
        description: "Ukuran file maksimal 10MB. File yang Anda pilih berukuran " + (file.size / (1024 * 1024)).toFixed(2) + "MB",
        color: "danger",
      });
      return;
    }

    // Validate file type
    const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      addToast({
        title: "Format file tidak didukung",
        description: "Format file harus PDF, JPG, JPEG, atau PNG. File yang Anda pilih: " + file.type,
        color: "danger",
      });
      return;
    }

    // Upload file and store URL
    const uploadedUrl = await uploadFile(file, field);
    if (uploadedUrl) {
      handleInputChange(field, uploadedUrl);
    }
  };

  const handleSelectApplicant = (applicant: UserApplicant) => {
    setSelectedApplicant(applicant);
    setFormData((prev) => ({
      ...prev,
      id_user_applicant: applicant.id,
    }));
    onClose();
  };

  const handleCreateNewApplicant = async () => {
    try {
      // Validate required fields
      if (!newApplicant.fullname || !newApplicant.email || !newApplicant.phone_number || !newApplicant.birth_date) {
        addToast({
          title: "Data tidak lengkap",
          description: "Mohon lengkapi semua field yang wajib diisi: Nama Lengkap, Email, No. Telepon, dan Tanggal Lahir",
          color: "danger",
        });
        return;
      }

      // Validate birth_date is a valid Date
      if (!(newApplicant.birth_date instanceof Date) || isNaN(newApplicant.birth_date.getTime())) {
        addToast({
          title: "Tanggal lahir tidak valid",
          description: "Mohon masukkan tanggal lahir yang valid",
          color: "danger",
        });
        return;
      }

      // API call to create new applicant
      const response = await AxiosClient.userCreateUserApplicant({
        headers: {
          authorization: UserUtility.getAuthHeader(),
        },
        body: {
          fullname: newApplicant.fullname,
          email: newApplicant.email,
          phone_number: newApplicant.phone_number,
          address: newApplicant.address || "",
          gender: newApplicant.gender,
          birth_date: parseInt(moment(newApplicant.birth_date).format('YYYYMMDD')), // Convert to YYYYMMDD number
          birth_place: newApplicant.birth_place || "",
          religion: newApplicant.religion || "",
        },
      });

      // Set the newly created applicant as selected
      setSelectedApplicant(response);
      setFormData((prev) => ({
        ...prev,
        id_user_applicant: response.id,
      }));

      // Refresh the list of applicants
      await fetchUserApplicants();

      // Close modal
      onClose();

      // Reset form
      setNewApplicant({
        id: 0,
        id_user: 0,
        fullname: "",
        email: "",
        phone_number: "",
        address: "",
        gender: Gender.M,
        birth_date: new Date(),
        birth_place: "",
        religion: "",
      });

      addToast({
        title: "Siswa berhasil ditambahkan",
        color: "success",
      });
    } catch (err: any) {
      addToast({
        title: "Gagal menambahkan siswa",
        description: err?.response?.data?.toString() ?? err?.message ?? "Terjadi kesalahan saat menambahkan siswa",
        color: "danger",
      });
    }
  };

  const StepIndicator = () => (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <p className="text-primary font-bold text-sm uppercase tracking-widest">
            Langkah {step} dari 3
          </p>
          <h2 className="text-2xl font-black text-secondary">
            {step === 1 && "Data Calon Siswa"}
            {step === 2 && "Data Orang Tua / Wali"}
            {step === 3 && "Unggah Dokumen Pendukung"}
          </h2>
        </div>
        <div className="hidden md:block text-secondary/40 font-bold text-4xl italic">
          0{step}
        </div>
      </div>
      <Progress
        aria-label="Enrollment progress"
        value={(step / 3) * 100}
        color="primary"
        className="h-2 shadow-inner"
      />
    </div>
  );

  async function submitApplication() {
    try {
      setLoadingSubmit(true);

      // Validate required documents
      if (!formData.kk_url || !formData.akta_lahir_url || !formData.ktp_ortu_url || !formData.photo_url || !formData.selfie_url) {
        addToast({
          title: "Dokumen belum lengkap",
          description: "Mohon upload semua dokumen yang wajib: Kartu Keluarga, Akte Lahir, KTP Orang Tua, Pasfoto, dan Foto Selfie",
          color: "danger",
        });
        return;
      }

      // // Validate required fields
      // if (!formData.id_user_applicant || !formData.application_type || !formData.nik || !formData.parent_fullname || !formData.parent_phone || !formData.parent_email || !formData.pendidikan_terakhir || !formData.grade_terakhir || !formData.asal_sekolah || !formData.student_status) {
      //   addToast({
      //     title: "Mohon lengkapi semua field yang wajib diisi",
      //     color: "danger",
      //   });
      //   return;
      // }

      // Validate id_user_applicant is set
      if (!formData.id_user_applicant) {
        addToast({
          title: "Data siswa tidak valid. Silakan pilih siswa terlebih dahulu.",
          color: "danger",
        });
        return;
      }

      // Get user profile to get user ID
      const userProfile = await AxiosClient.getProfile({
        headers: {
          authorization: UserUtility.getAuthHeader(),
        },
      });

      if (!userProfile?.id) {
        addToast({
          title: "Sesi tidak valid",
          description: "User tidak valid. Silakan login kembali untuk melanjutkan pendaftaran.",
          color: "danger",
        });
        return;
      }

      await AxiosClient.userCreateApplication({
        headers: {
          authorization: UserUtility.getAuthHeader(),
        },
        body: {
          id_user: userProfile.id,
          id_user_applicant: formData.id_user_applicant,
          application_type: formData.application_type as any,
          nisn: formData.nisn || undefined,
          nik: formData.nik,
          parent_fullname: formData.parent_fullname,
          parent_phone: formData.parent_phone,
          parent_email: formData.parent_email,
          pendidikan_terakhir: formData.pendidikan_terakhir as any,
          grade_terakhir: formData.grade_terakhir,
          asal_sekolah: formData.asal_sekolah,
          student_status: formData.student_status as any,
          alasan_pindah: formData.alasan_pindah || undefined,
          kk_url: formData.kk_url,
          akta_lahir_url: formData.akta_lahir_url,
          ktp_ortu_url: formData.ktp_ortu_url,
          photo_url: formData.photo_url,
          selfie_url: formData.selfie_url,
          ijazah_terakhir_url: formData.ijazah_terakhir_url || undefined,
          raport_url: formData.raport_url || undefined,
          surat_pindah_url: formData.surat_pindah_url || undefined,
        },
      });

      addToast({
        title: "Pendaftaran berhasil dikirim!",
        color: "success",
      });

      // Redirect to user details page
      window.location.href = "/user-details";
    } catch (err: any) {
      addToast({
        title: "Gagal mengirim pendaftaran",
        description: err?.response?.data?.toString() ?? err?.message ?? "Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.",
        color: "danger",
      });
    } finally {
      setLoadingSubmit(false);
    }
  }

  const documentFields = [
    { label: "Kartu Keluarga", required: true, key: "kk_url" },
    { label: "Akte Lahir Siswa", required: true, key: "akta_lahir_url" },
    { label: "KTP Orang Tua", required: true, key: "ktp_ortu_url" },
    { label: "Pasfoto Terkini (3x4)", required: true, key: "photo_url" },
    { label: "Foto Selfie", required: true, key: "selfie_url" },
    { label: "Ijazah Terakhir", required: false, key: "ijazah_terakhir_url" },
    { label: "Rapor Terakhir", required: false, key: "raport_url" },
  ];

  return (
    <Layout parentClassName="bg-background-light min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* FORM CONTAINER */}
        <Card className="shadow-2xl border-none p-4 md:p-8 rounded-[40px]">
          <CardBody>
            <StepIndicator />

            <form className="space-y-8"
              onSubmit={e => {
                // console.log("submitted", data)
                e.preventDefault();
                submitApplication();
              }}>
              {/* STEP 1: DATA SISWA */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="md:col-span-2 flex flex-col gap-2 p-5 border border-zinc-200 rounded-2xl bg-zinc-50/50">
                    <div className="font-bold text-secondary">Pilih Siswa<span className="text-danger">*</span></div>
                    <Button
                      type="button"
                      onPress={onOpen}
                      variant="bordered"
                      className="justify-start font-semibold border-2"
                      startContent={selectedApplicant ? <User size={18} /> : <UserPlus size={18} />}
                    >
                      {selectedApplicant ? selectedApplicant.fullname : "Pilih atau Tambah Siswa"}
                    </Button>
                    {selectedApplicant && (
                      <div className="mt-2 p-3 bg-white rounded-xl border border-zinc-200 text-sm">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-zinc-500">Email:</span>{" "}
                            <span className="font-medium">{selectedApplicant.email}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">No. Telp:</span>{" "}
                            <span className="font-medium">{selectedApplicant.phone_number}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Jenis Kelamin:</span>{" "}
                            <span className="font-medium">{selectedApplicant.gender === "M" ? "Laki-laki" : "Perempuan"}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500">Tempat Lahir:</span>{" "}
                            <span className="font-medium">{selectedApplicant.birth_place || "-"}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <Select
                    label="Pilih Paket Pendidikan"
                    variant="bordered"
                    className="md:col-span-2 font-bold"
                    labelPlacement="outside"
                    placeholder="Pilih jenjang pendidikan"
                    isRequired
                    selectedKeys={formData.application_type ? [formData.application_type] : []}
                    onSelectionChange={(keys) => handleInputChange("application_type", Array.from(keys)[0])}
                  >
                    <SelectItem key="SD">Paket A (Setara SD)</SelectItem>
                    <SelectItem key="SMP">Paket B (Setara SMP)</SelectItem>
                    <SelectItem key="SMA">Paket C (Setara SMA)</SelectItem>
                  </Select>

                  {/* <Input
                    label="Nama Lengkap Siswa"
                    placeholder="Sesuai Akte Lahir"
                    variant="bordered"
                    labelPlacement="outside"
                  /> */}

                  <Input
                    label="NIK"
                    placeholder="Nomor Induk Kependudukan"
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    value={formData.nik}
                    onValueChange={(value) => handleInputChange("nik", value)}
                  />

                  <Input
                    label="NISN"
                    placeholder="Nomor Induk Siswa Nasional"
                    variant="bordered"
                    labelPlacement="outside"
                    value={formData.nisn}
                    onValueChange={(value) => handleInputChange("nisn", value)}
                  />

                  <Select
                    label="Status Pendaftar"
                    variant="bordered"
                    className=""
                    labelPlacement="outside"
                    placeholder="Pilih status pendaftar"
                    isRequired
                    selectedKeys={formData.student_status ? [formData.student_status] : []}
                    onSelectionChange={(keys) => handleInputChange("student_status", Array.from(keys)[0])}
                  >
                    <SelectItem key="BARU">Baru</SelectItem>
                    <SelectItem key="MUTASIPINDAHAN">Mutasi/Pindahan</SelectItem>
                  </Select>

                  <Input
                    label="Asal Sekolah"
                    placeholder="Nama sekolah sebelumnya"
                    variant="bordered"
                    labelPlacement="outside"
                    className=""
                    isRequired
                    value={formData.asal_sekolah}
                    onValueChange={(value) => handleInputChange("asal_sekolah", value)}
                  />

                  <Select
                    label="Pendidikan Terakhir"
                    variant="bordered"
                    className=""
                    labelPlacement="outside"
                    placeholder="Pilih jenjang pendidikan"
                    isRequired
                    selectedKeys={formData.pendidikan_terakhir ? [formData.pendidikan_terakhir] : []}
                    onSelectionChange={(keys) => handleInputChange("pendidikan_terakhir", Array.from(keys)[0])}
                  >
                    <SelectItem key="TK">TK</SelectItem>
                    <SelectItem key="SD">SD</SelectItem>
                    <SelectItem key="SMP">SMP</SelectItem>
                    <SelectItem key="SMA">SMA</SelectItem>
                    <SelectItem key="S1">S1</SelectItem>
                  </Select>
                  <Input
                    label="Grade Terakhir"
                    placeholder="Grade terakhir sebelumnya"
                    variant="bordered"
                    labelPlacement="outside"
                    className=""
                    type="number"
                    min="1"
                    max="12"
                    isRequired
                    value={formData.grade_terakhir}
                    onValueChange={(value) => {
                      // Only allow integers
                      const intValue = value.replace(/\D/g, '');
                      handleInputChange("grade_terakhir", intValue);
                    }}
                  />

                  {formData.student_status === "MUTASIPINDAHAN" && (
                    <Textarea
                      label="Alasan Pindah"
                      placeholder="Alasan mutasi/pindah sekolah"
                      variant="bordered"
                      labelPlacement="outside"
                      className="md:col-span-2"
                      value={formData.alasan_pindah || ""}
                      onValueChange={(value) => handleInputChange("alasan_pindah", value)}
                    />
                  )}
                </div>
              )}

              {/* STEP 2: DATA ORANG TUA */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
                  <Input
                    label="Nama Lengkap Orang Tua / Wali"
                    placeholder="Masukkan nama lengkap"
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={<User size={18} />}
                    isRequired
                    value={formData.parent_fullname}
                    onValueChange={(value) => handleInputChange("parent_fullname", value)}
                  />
                  <Input
                    label="No. Telp / WhatsApp Orang Tua"
                    placeholder="Contoh: 0812..."
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    value={formData.parent_phone}
                    onValueChange={(value) => handleInputChange("parent_phone", value)}
                  />
                  <Input
                    label="Email Aktif"
                    type="email"
                    placeholder="nama@email.com"
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    value={formData.parent_email}
                    onValueChange={(value) => handleInputChange("parent_email", value)}
                  />
                </div>
              )}

              {/* STEP 3: UPLOAD DOKUMEN */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex gap-3 mb-6 italic">
                    <Info size={20} className="text-primary shrink-0" />
                    <p className="text-xs text-secondary/70">
                      Pastikan dokumen dalam format PDF atau Gambar (JPG/PNG)
                      dengan ukuran maksimal 10MB per file.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {documentFields.map((doc, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-secondary">
                          {doc.label}
                          {doc.required && <span className="text-danger">*</span>}
                          {!doc.required && (
                            <span className="text-zinc-400 font-normal">
                              {" "}(Opsional)
                            </span>
                          )}
                        </label>
                        <div className={`border-2 border-dashed rounded-2xl p-4 transition-all ${formData[doc.key as keyof typeof formData]
                          ? "border-success bg-success/5"
                          : "border-zinc-200 hover:border-primary bg-zinc-50/50"
                          } ${uploadingFiles[doc.key] ? "opacity-50" : ""}`}>
                          <input
                            type="file"
                            className="hidden"
                            id={`file-${i}`}
                            accept=".pdf,.jpg,.jpeg,.png"
                            disabled={uploadingFiles[doc.key] || !!formData[doc.key as keyof typeof formData]}
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleFileChange(doc.key, file);
                            }}
                          />
                          <div className="flex items-center gap-3">
                            <div className={`p-2 bg-white rounded-lg shadow-sm transition-colors shrink-0 ${formData[doc.key as keyof typeof formData]
                              ? "text-success"
                              : "group-hover:text-primary"
                              }`}>
                              {uploadingFiles[doc.key] ? (
                                <div className="animate-spin">⏳</div>
                              ) : formData[doc.key as keyof typeof formData] ? (
                                <CheckCircle2 size={20} />
                              ) : (
                                <Upload size={20} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              {formData[doc.key as keyof typeof formData] ? (
                                <>
                                  <a
                                    href={`${formData[doc.key as keyof typeof formData]}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-medium text-primary hover:underline block truncate"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    {(formData[doc.key as keyof typeof formData] as string).split('/').pop() || 'File terupload'}
                                  </a>
                                  <span className="text-xs text-success">✓ Klik untuk melihat</span>
                                </>
                              ) : uploadingFiles[doc.key] ? (
                                <span className="text-xs font-medium text-zinc-500 block">Mengupload...</span>
                              ) : (
                                <label
                                  htmlFor={`file-${i}`}
                                  className="text-xs font-medium text-zinc-500 block cursor-pointer hover:text-primary"
                                >
                                  Pilih file...
                                </label>
                              )}
                            </div>
                            {formData[doc.key as keyof typeof formData] && !uploadingFiles[doc.key] && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleInputChange(doc.key, "");
                                }}
                                className="p-1 hover:bg-danger/10 rounded-lg transition-colors shrink-0"
                                title="Hapus file"
                              >
                                <X size={16} className="text-danger" />
                              </button>
                            )}
                          </div>
                        </div>
                        {/* <div className="border-2 border-dashed border-zinc-200 hover:border-primary rounded-2xl p-4 transition-all group cursor-pointer bg-zinc-50/50">
                          <input
                            type="file"
                            className="hidden"
                            id={`file-${i}`}
                          />
                          <label
                            htmlFor={`file-${i}`}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-primary transition-colors">
                              <Upload size={20} />
                            </div>
                            <span className="text-xs font-medium text-zinc-500">
                              Pilih file...
                            </span>
                          </label>
                        </div> */}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex justify-between items-center pt-10 border-t border-zinc-100">
                <Button
                  type="button"
                  onPress={prevStep}
                  variant="light"
                  isDisabled={step === 1}
                  startContent={<ArrowLeft size={20} />}
                  className="font-semibold"
                >
                  Kembali
                </Button>
                {step < 3 ? (
                  <Button
                    type="button"
                    onPress={nextStep}
                    className="bg-primary text-white font-black px-10 py-7 rounded-2xl shadow-lg shadow-primary/20"
                    endContent={<ArrowRight size={20} />}
                  >
                    Lanjutkan
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    isLoading={loading_submit}
                    className="bg-secondary text-white font-black px-10 py-7 rounded-2xl shadow-xl shadow-secondary/30"
                    endContent={<CheckCircle2 size={20} />}
                  >
                    Kirim Pendaftaran
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
        classNames={{
          base: "rounded-3xl",
          header: "border-b border-zinc-200",
          body: "py-6",
          footer: "border-t border-zinc-200",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-xl font-black text-secondary">Pilih Siswa</h3>
            <p className="text-xs text-zinc-500 font-normal">Pilih dari siswa tersimpan atau tambah siswa baru</p>
          </ModalHeader>
          <ModalBody>
            <RadioGroup
              value={jenisSiswa}
              onValueChange={(value) => setJenisSiswa(value as any)}
              classNames={{ wrapper: "gap-4" }}
              orientation="horizontal"
            >
              <Radio value="siswa-tersimpan" className="font-semibold">
                Siswa Tersimpan
              </Radio>
              <Radio value="siswa-baru" className="font-semibold">
                Siswa Baru
              </Radio>
            </RadioGroup>
            {jenisSiswa === "siswa-tersimpan" && (
              <div className="rounded-2xl bg-blue-50/15 p-3 border b  b order-zinc-100 max-h-[400px] overflow-y-auto">
                <div className="space-y-3">
                  {savedApplicants.map((applicant) => (
                    <div
                      key={applicant.id}
                      onClick={() => handleSelectApplicant(applicant)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${selectedApplicant?.id === applicant.id
                        ? "border-primary bg-primary/5"
                        : "border-zinc-200 bg-white hover:border-primary/50"
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <User size={20} className="text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-secondary">{applicant.fullname}</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-zinc-600">
                              <div>📧 {applicant.email}</div>
                              <div>📱 {applicant.phone_number}</div>
                              <div>👤 {applicant.gender === "M" ? "Laki-laki" : "Perempuan"}</div>
                              <div>📅 {moment(applicant.birth_date).format('DD MMMM YYYY')}</div>
                            </div>
                          </div>
                        </div>
                        {selectedApplicant?.id === applicant.id && (
                          <CheckCircle2 size={20} className="text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {jenisSiswa === "siswa-baru" && (
              <div className="rounded-2xl bg-blue-50/15 p-4 border border-zinc-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap"
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    value={newApplicant.fullname}
                    onValueChange={(value) => setNewApplicant({ ...newApplicant, fullname: value })}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    value={newApplicant.email}
                    onValueChange={(value) => setNewApplicant({ ...newApplicant, email: value })}
                  />
                  <Input
                    label="No. Telepon"
                    placeholder="081234567890"
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    value={newApplicant.phone_number}
                    onValueChange={(value) => setNewApplicant({ ...newApplicant, phone_number: value })}
                  />
                  <RadioGroup
                    label="Jenis Kelamin"
                    orientation="horizontal"
                    color="primary"
                    isRequired
                    value={newApplicant.gender}
                    onValueChange={(value) => setNewApplicant({ ...newApplicant, gender: value as Gender })}
                  >
                    <Radio value="M">Laki-laki</Radio>
                    <Radio value="F">Perempuan</Radio>
                  </RadioGroup>
                  <Input
                    label="Tempat Lahir"
                    placeholder="Kota kelahiran"
                    variant="bordered"
                    labelPlacement="outside"
                    value={newApplicant.birth_place}
                    onValueChange={(value) => setNewApplicant({ ...newApplicant, birth_place: value })}
                  />
                  <Input
                    label="Tanggal Lahir"
                    type="date"
                    variant="bordered"
                    labelPlacement="outside"
                    isRequired
                    value={newApplicant.birth_date instanceof Date && !isNaN(newApplicant.birth_date.getTime())
                      ? moment(newApplicant.birth_date).format('YYYY-MM-DD')
                      : ''}
                    onValueChange={(value) => {
                      const date = new Date(value);
                      if (!isNaN(date.getTime())) {
                        setNewApplicant({ ...newApplicant, birth_date: date });
                      }
                    }}
                  />
                  <Select
                    label="Agama"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Pilih agama"
                    selectedKeys={newApplicant.religion ? [newApplicant.religion] : []}
                    onSelectionChange={(keys) => setNewApplicant({ ...newApplicant, religion: Array.from(keys)[0] as string })}
                  >
                    <SelectItem key="Islam">Islam</SelectItem>
                    <SelectItem key="Kristen">Kristen</SelectItem>
                    <SelectItem key="Katolik">Katolik</SelectItem>
                    <SelectItem key="Hindu">Hindu</SelectItem>
                    <SelectItem key="Budha">Budha</SelectItem>
                    <SelectItem key="Khonghucu">Khonghucu</SelectItem>
                  </Select>
                  <Textarea
                    label="Alamat"
                    placeholder="Alamat lengkap"
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                    value={newApplicant.address}
                    onValueChange={(value) => setNewApplicant({ ...newApplicant, address: value })}
                  />
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="light" onPress={onClose}>
              Batal
            </Button>
            {jenisSiswa === "siswa-baru" ? (
              <Button
                color="primary"
                onPress={handleCreateNewApplicant}
                startContent={<Plus size={18} />}
                className="font-bold"
              >
                Tambah Siswa
              </Button>
            ) : (
              <Button
                color="primary"
                onPress={onClose}
                isDisabled={!selectedApplicant}
                className="font-bold"
              >
                Pilih Siswa
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout >
  );
}
