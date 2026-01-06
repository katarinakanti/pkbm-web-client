import {
  User,
  Package,
  CreditCard,
  Upload,
  Copy,
  CheckCircle2,
  AlertCircle,
  QrCode,
  FileText,
  Wallet,
} from "lucide-react";
import { Button, Card, CardBody, Divider } from "@heroui/react";
import { useState } from "react";
import { Layout } from "../../components/layout/Layout";

export function PaymentPage() {
  const [file, setFile] = useState<File | null>(null);

  const paymentData = {
    studentName: "Budi Santoso",
    packageName: "Paket C (Setara SMA)",
    totalAmount: "Rp 2.500.000",
    bank: "BCA",
    accNo: "1234567890",
    accName: "Yayasan Budiman Drestanta",
  };

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
                    className={`mb-2 transition-colors ${
                      file ? "text-primary" : "text-white/40"
                    }`}
                    size={28}
                  />
                  <p className="text-sm font-bold text-white/80 px-4 text-center truncate max-w-[200px]">
                    {file ? file.name : "Pilih File Gambar"}
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>

              <Button
                isDisabled={!file}
                className="w-full bg-primary text-white font-black py-7 rounded-2xl text-lg shadow-xl shadow-black/20"
                startContent={<CheckCircle2 size={20} />}
              >
                KONFIRMASI SEKARANG
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
