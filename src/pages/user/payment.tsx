import {
  User,
  Package,
  CreditCard,
  Upload,
  Copy,
  CheckCircle2,
  AlertCircle,
  FileText,
  Wallet,
} from "lucide-react";
import { addToast, Button, Card, CardBody } from "@heroui/react";
import { useState, useEffect } from "react";
import { Layout } from "../../components/layout/Layout";
import { UserUtility } from "../../utility";
import { useLocation } from "react-router-dom";
import { AxiosClient } from "../../api/AxiosClient";

export function PaymentPage() {
  const location = useLocation();
  const [file, setFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [applicationId, setApplicationId] = useState<number | null>(null);

  const [paymentData, setPaymentData] = useState({
    studentName: "-",
    packageName: "-",
    totalAmount: "Rp 2.500.000",
    bank: "BCA",
    accNo: "1234567890",
    accName: "Yayasan Budiman Drestanta",
  });

  useEffect(() => {
    const fetchApplicationData = async () => {
      const q = new URLSearchParams(location.search);
      const idFromQuery = q.get("id");
      
      if (!idFromQuery) {
        addToast({
          title: "ID aplikasi tidak ditemukan",
          description: "Silakan kembali ke halaman detail siswa",
          color: "danger",
        });
        setLoading(false);
        return;
      }

      const id = Number(idFromQuery);
      setApplicationId(id);
      const authHeader = UserUtility.getAuthHeader();
      
      if (!authHeader) {
        addToast({
          title: "Sesi tidak valid",
          description: "Silakan login kembali",
          color: "danger",
        });
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [application, applicants] = await Promise.all([
          AxiosClient.userGetUserApplicationById({
            headers: { authorization: authHeader },
            path: { id },
          }),
          AxiosClient.userGetUserApplicantsList({
            headers: { authorization: authHeader },
          }),
        ]);

        if (application) {
          // Find applicant name
          const applicant = applicants.find((a) => a.id === application.id_user_applicant);
          const studentName = applicant?.fullname || application.otm_id_user_applicant?.fullname || "-";
          
          // Map application type to package name
          const packageName = 
            application.application_type === "SD"
              ? "Paket A (Setara SD)"
              : application.application_type === "SMP"
              ? "Paket B (Setara SMP)"
              : application.application_type === "SMA"
              ? "Paket C (Setara SMA)"
              : "-";

          setPaymentData((prev) => ({
            ...prev,
            studentName,
            packageName,
          }));
        }
      } catch (err: any) {
        addToast({
          title: "Gagal memuat data aplikasi",
          description: err?.response?.data?.toString() ?? err?.message ?? "Terjadi kesalahan",
          color: "danger",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, [location.search]);

  // Upload file to server and return URL
  async function uploadFile(file: File): Promise<string | null> {
    try {
      setUploading(true);
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
      setUploading(false);
    }
  }

  async function handleSubmit() {
    if (!uploadedUrl) {
      addToast({
        title: "Harap upload bukti pembayaran terlebih dahulu",
        color: "danger",
      });
      return;
    }

    if (!applicationId) {
      addToast({
        title: "ID aplikasi tidak valid",
        color: "danger",
      });
      return;
    }

    try {
      setSubmitting(true);
      await AxiosClient.userMakePayment({
        headers: { authorization: UserUtility.getAuthHeader() },
        path: { id: applicationId },
        body: { payment_proof_url: uploadedUrl }
      });
      
      addToast({
        title: "Bukti pembayaran berhasil dikirim!",
        description: "Pembayaran Anda akan diverifikasi dalam 1x24 jam",
        color: "success",
      });
      
      // Redirect or handle success
      window.location.href = `/user-details/${applicationId}`;
    } catch (err: any) {
      addToast({
        title: "Gagal mengirim bukti pembayaran",
        description: err?.message ?? "Terjadi kesalahan",
        color: "danger",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Layout parentClassName="bg-background-light/50">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        {/* HEADER */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold text-secondary">
            Selesaikan <span className="text-primary">Pembayaran</span>
          </h1>
          <p className="text-secondary/60 font-medium">
            Langkah terakhir untuk bergabung dengan PKBM Budiman Drestanta
          </p>
        </div>

        {loading ? (
          <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
            <CardBody className="p-20 text-center">
              <p className="text-secondary/60 animate-pulse">Memuat data...</p>
            </CardBody>
          </Card>
        ) : (
          <>
        {/* STEP 1: RINGKASAN DATA - Modern Card Style */}
        <Card className="border-none shadow-xl rounded-[40px] overflow-hidden">
          <div className="bg-secondary px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-white/90">
              <FileText size={20} className="text-primary" />
              <span className="text-sm font-bold tracking-widest uppercase">
                01. Data Siswa
              </span>
            </div>
            <div className="h-2 w-24 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-primary" />
            </div>
          </div>
          <CardBody className="p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                    <User size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em]">
                      Nama Siswa
                    </p>
                    <p className="text-xl font-bold text-secondary">
                      {paymentData.studentName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                    <Package size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-secondary/30 uppercase tracking-[0.2em]">
                      Program
                    </p>
                    <p className="text-xl font-bold text-secondary">
                      {paymentData.packageName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-background-light rounded-[32px] p-8 border border-secondary/5 text-center md:text-right">
                <p className="text-secondary/40 text-xs font-bold uppercase tracking-widest mb-1">
                  Total Tagihan
                </p>
                <p className="text-3xl font-black text-secondary">
                  {paymentData.totalAmount}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* STEP 2: PEMBAYARAN - Focused Layout */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-4">
            <Wallet className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-secondary">
              02. Metode Pembayaran
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-none shadow-lg rounded-[32px] bg-white group hover:ring-2 ring-primary transition-all">
              <CardBody className="p-8 space-y-4 text-center">
                <div className="mx-auto bg-white p-3 border-2 border-dashed border-zinc-100 rounded-2xl w-fit">
                  <img
                    src="/qris-placeholder.png"
                    alt="QRIS"
                    className="w-32 h-32"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-secondary">Scan QRIS</h4>
                  <p className="text-xs text-secondary/50 font-medium">
                    GoPay, OVO, Dana, LinkAja
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card className="border-none shadow-lg rounded-[32px] bg-white group hover:ring-2 ring-primary transition-all">
              <CardBody className="p-8 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-bold text-secondary flex items-center gap-2">
                    <CreditCard size={18} className="text-primary" />
                    Transfer {paymentData.bank}
                  </h4>
                  <p className="text-xs text-secondary/50 font-medium">
                    Manual Transfer (Dicek berkala)
                  </p>
                </div>

                <div className="bg-background-light p-4 rounded-2xl mt-4 space-y-2">
                  <p className="text-lg font-mono font-black text-secondary text-center tracking-tighter">
                    {paymentData.accNo}
                  </p>
                  <Button
                    fullWidth
                    size="sm"
                    variant="flat"
                    className="font-bold bg-white text-secondary shadow-sm"
                    startContent={<Copy size={14} />}
                  >
                    Salin No. Rekening
                  </Button>
                </div>
                <p className="text-[10px] text-center mt-3 font-bold text-secondary/30 uppercase tracking-widest">
                  A/N {paymentData.accName}
                </p>
              </CardBody>
            </Card>
          </div>
        </div>

        {/* STEP 3: UPLOAD - Strong Visual Finish */}
        <Card className="border-none shadow-2xl rounded-[40px] bg-secondary text-white overflow-hidden">
          <CardBody className="p-0 flex flex-col md:flex-row">
            <div className="p-10 md:w-1/2 space-y-6 flex flex-col justify-center">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">Upload Bukti</h3>
                <p className="text-white/60 text-sm leading-relaxed font-medium">
                  Pastikan nominal dan tanggal transfer terlihat jelas pada foto
                  bukti pembayaran Anda.
                </p>
              </div>
              <div className="flex gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <AlertCircle size={20} className="text-primary shrink-0" />
                <p className="text-[11px] text-white/50 leading-relaxed italic">
                  Konfirmasi manual diproses 1x24 jam. Akun siswa akan aktif
                  otomatis setelah verifikasi.
                </p>
              </div>
            </div>

            <div className="p-10 md:w-1/2 bg-white/5 flex flex-col justify-center gap-4 border-l border-white/5">
              <label className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-[30px] hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex flex-col items-center">
                  <Upload
                    className={`mb-2 transition-colors ${uploading ? "animate-pulse text-primary" : file ? "text-primary" : "text-white/40"
                      }`}
                    size={28}
                  />
                  <p className="text-sm font-bold text-white/80 px-4 text-center truncate max-w-[200px]">
                    {uploading ? "Mengupload..." : file ? file.name : "Pilih File Gambar"}
                  </p>
                  {uploadedUrl && (
                    <p className="text-xs text-primary mt-1">✓ File berhasil diupload</p>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={uploading}
                  onChange={async (e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    if (!selectedFile) return;
                    
                    // Validate file size (max 10MB)
                    if (selectedFile.size > 10 * 1024 * 1024) {
                      addToast({
                        title: "Ukuran file terlalu besar",
                        description: `Ukuran maksimal 10MB. File Anda: ${(selectedFile.size / (1024 * 1024)).toFixed(2)}MB`,
                        color: "danger",
                      });
                      return;
                    }
                    
                    setFile(selectedFile);
                    const url = await uploadFile(selectedFile);
                    if (url) {
                      setUploadedUrl(url);
                    }
                  }}
                />
              </label>

              <Button
                isDisabled={!uploadedUrl || submitting}
                isLoading={submitting}
                onPress={handleSubmit}
                className="w-full bg-primary text-white font-black py-7 rounded-2xl text-lg shadow-xl shadow-black/20"
                startContent={<CheckCircle2 size={20} />}
              >
                KONFIRMASI SEKARANG
              </Button>
            </div>
          </CardBody>
        </Card>
          </>
        )}
      </div>
    </Layout>
  );
}
