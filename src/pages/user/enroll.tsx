import { useState } from "react";
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
} from "@heroui/react";
import {
  User,
  Users,
  FileUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Calendar,
  MapPin,
  Info,
  UserPlus,
  Plus,
} from "lucide-react";
import { Layout } from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { UserUtility } from "../../utility";
import { UserApplicant } from "../../api/model/table/UserApplicant";
import { Gender } from "../../api/model/enum/Gender";

export function EnrollPage() {
  UserUtility.redirectIfNotLogin();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    id_user_applicant: undefined as number | undefined,
    application_type: "",
    nik: "",
    pendidikan_terakhir: "",
    grade_terakhir: "",
    asal_sekolah: "",
    student_status: "BARU",
    parent_fullname: "",
    parent_phone: "",
    parent_email: "",
    kk_url: null as File | null,
    akta_lahir_url: null as File | null,
    ktp_ortu_url: null as File | null,
    photo_url: null as File | null,
    selfie_url: null as File | null,
    ijazah_terakhir_url: null as File | null,
    raport_url: null as File | null,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [jenisSiswa, setJenisSiswa] = useState<"siswa-tersimpan" | "siswa-baru">("siswa-baru");
  const [selectedApplicant, setSelectedApplicant] = useState<UserApplicant | null>(null);
  const [savedApplicants, setSavedApplicants] = useState<UserApplicant[]>([
    // Mock data - replace with API call
    {
      id: 1,
      id_user: 1,
      fullname: "Budi Santoso",
      email: "budi@email.com",
      phone_number: "081234567890",
      address: "Jl. Merdeka No. 123",
      gender: Gender.M,
      birth_date: new Date("2010-05-15"),
      birth_place: "Surabaya",
      religion: "Islam",
    },
    {
      id: 2,
      id_user: 2,
      fullname: "Siti Nurhaliza",
      email: "siti@email.com",
      phone_number: "081298765432",
      address: "Jl. Pahlawan No. 45",
      gender: Gender.F,
      birth_date: new Date("2011-08-20"),
      birth_place: "Jakarta",
      religion: "Islam",
    },
  ]);
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

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleSelectApplicant = (applicant: UserApplicant) => {
    setSelectedApplicant(applicant);
    setFormData((prev) => ({
      ...prev,
      id_user_applicant: applicant.id,
    }));
    onClose();
  };

  const handleCreateNewApplicant = () => {
    // TODO: API call to create new applicant
    const newId = savedApplicants.length + 1;
    const createdApplicant = { ...newApplicant, id: newId };
    setSavedApplicants([...savedApplicants, createdApplicant]);
    setSelectedApplicant(createdApplicant);
    setFormData((prev) => ({
      ...prev,
      id_user_applicant: newId,
    }));
    onClose();
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

  return (
    <Layout parentClassName="bg-background-light min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* FORM CONTAINER */}
        <Card className="shadow-2xl border-none p-4 md:p-8 rounded-[40px]">
          <CardBody>
            <StepIndicator />

            <form className="space-y-8">
              {/* STEP 1: DATA SISWA */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
                  <div className="md:col-span-2 flex flex-col gap-2 p-5 border border-zinc-200 rounded-2xl bg-zinc-50/50">
                    <div className="font-bold text-secondary">Pilih Siswa</div>
                    <Button
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
                  >
                    <SelectItem key="a">Paket A (Setara SD)</SelectItem>
                    <SelectItem key="b">Paket B (Setara SMP)</SelectItem>
                    <SelectItem key="c">Paket C (Setara SMA)</SelectItem>
                  </Select>

                  {/* <Input
                    label="Nama Lengkap Siswa"
                    placeholder="Sesuai Akte Lahir"
                    variant="bordered"
                    labelPlacement="outside"
                  /> */}

                  <Input
                    label="NISN"
                    placeholder="Nomor Induk Siswa Nasional"
                    variant="bordered"
                    labelPlacement="outside"
                  />

                  <Input
                    label="Tempat Lahir"
                    placeholder="Kota Kelahiran"
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <Input
                    label="Tanggal Lahir"
                    type="date"
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={<Calendar size={18} />}
                  />

                  <RadioGroup
                    label="Jenis Kelamin"
                    orientation="horizontal"
                    color="primary"
                  >
                    <Radio value="L">Laki-laki</Radio>
                    <Radio value="P">Perempuan</Radio>
                  </RadioGroup>

                  <Select
                    label="Agama"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Pilih Agama"
                  >
                    <SelectItem key="islam">Islam</SelectItem>
                    <SelectItem key="kristen">Kristen</SelectItem>
                    <SelectItem key="katolik">Katolik</SelectItem>
                    <SelectItem key="hindu">Hindu</SelectItem>
                    <SelectItem key="budha">Budha</SelectItem>
                    <SelectItem key="khonghucu">Khonghucu</SelectItem>
                  </Select>

                  <Input
                    label="Asal Sekolah"
                    placeholder="Nama sekolah sebelumnya"
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                  />
                  <Textarea
                    label="Alamat Lengkap"
                    placeholder="Nama jalan, Blok, No Rumah, RT/RW, Kelurahan, Kecamatan"
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                  />
                </div>
              )}

              {/* STEP 2: DATA ORANG TUA */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
                  <Input
                    label="Nama Lengkap Ayah"
                    placeholder="Masukkan nama ayah"
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={<User size={18} />}
                  />
                  <Input
                    label="Nama Lengkap Ibu"
                    placeholder="Masukkan nama ibu"
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={<User size={18} />}
                  />
                  <Input
                    label="No. Telp / WhatsApp Orang Tua"
                    placeholder="Contoh: 0812..."
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                  />
                  <Input
                    label="Email Aktif"
                    type="email"
                    placeholder="nama@email.com"
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
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
                      dengan ukuran maksimal 2MB per file.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Kartu Keluarga", required: true },
                      { label: "Akte Lahir Siswa", required: true },
                      { label: "KTP Orang Tua", required: true },
                      { label: "Passfoto Terkini (3x4)", required: true },
                      { label: "Ijazah Terakhir", required: false },
                      { label: "Rapor Terakhir", required: false },
                    ].map((doc, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-secondary">
                          {doc.label}{" "}
                          {!doc.required && (
                            <span className="text-zinc-400 font-normal">
                              (Opsional)
                            </span>
                          )}
                        </label>
                        <div className="border-2 border-dashed border-zinc-200 hover:border-primary rounded-2xl p-4 transition-all group cursor-pointer bg-zinc-50/50">
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
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex justify-between items-center pt-10 border-t border-zinc-100">
                <Button
                  onPress={prevStep}
                  variant="light"
                  isDisabled={step === 1}
                  className="font-bold text-secondary disabled:opacity-0"
                  startContent={<ArrowLeft size={20} />}
                >
                  Kembali
                </Button>

                {step < 3 ? (
                  <Button
                    onPress={nextStep}
                    className="bg-primary text-white font-black px-10 py-7 rounded-2xl shadow-lg shadow-primary/20"
                    endContent={<ArrowRight size={20} />}
                  >
                    Lanjutkan
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    to="/user-details"
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
              <div className="rounded-2xl bg-blue-50/15 p-3 border border-zinc-100 max-h-[400px] overflow-y-auto">
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
                              <div>📅 {new Date(applicant.birth_date).toLocaleDateString("id-ID")}</div>
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
                    <Radio value="L">Laki-laki</Radio>
                    <Radio value="P">Perempuan</Radio>
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
                    value={newApplicant.birth_date.toISOString().split('T')[0]}
                    onValueChange={(value) => setNewApplicant({ ...newApplicant, birth_date: new Date(value) })}
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
    </Layout>
  );
}
