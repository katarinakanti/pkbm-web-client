import { useState, useEffect } from "react";
import { Card, CardBody, Chip, Button, Divider, Progress } from "@heroui/react";
import {
  Timer,
  CheckCircle2,
  MapPin,
  Clock,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  ChevronRight,
  Download,
} from "lucide-react";
import { Layout } from "../../components/layout/Layout";

export function UserDetailsPage() {
  // Status: 'pending' | 'accepted' | 'rejected'
  const [status, setStatus] = useState<"pending" | "accepted">("pending");

  // Contoh Data Review
  const userData = {
    nama: "Budi Santoso",
    paket: "Paket C (Setara SMA)",
    nisn: "0012345678",
    jadwalTatapMuka: "Senin & Rabu, 09:00 - 12:00 WIB",
    lokasi: "Ruang Belajar Utama - Ruko Botania 2",
  };

  // Countdown Logic
  const [timeLeft, setTimeLeft] = useState(172800); // 48 Jam dalam detik
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}j ${m}m ${s}d`;
  };

  return (
    <Layout parentClassName="bg-background-light min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* HEADER STATUS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-black text-secondary">Portal Siswa</h1>
            <p className="text-secondary/60 font-medium">
              ID Pendaftaran: #BD-2025001
            </p>
          </div>
          <Chip
            variant="shadow"
            color={status === "accepted" ? "success" : "warning"}
            className="text-white font-bold px-6 py-4 h-10 text-lg uppercase tracking-wider"
          >
            {status === "accepted" ? "Diterima" : "Sedang Diverifikasi"}
          </Chip>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* KIRI: Pengumuman & Jadwal */}
          <div className="md:col-span-2 space-y-8">
            {status === "pending" ? (
              <Card className="bg-secondary text-white rounded-[40px] p-4 shadow-2xl overflow-hidden relative border-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                <CardBody className="items-center text-center p-10 space-y-6">
                  <div className="p-4 bg-white/10 rounded-full animate-pulse">
                    <Timer size={48} className="text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Pengumuman Seleksi</h2>
                    <p className="text-white/70">
                      Berkas Anda sedang dalam proses peninjauan oleh tim admin
                      PKBM Budiman Drestanta.
                    </p>
                  </div>
                  <div className="text-4xl md:text-5xl font-black tracking-tighter text-primary bg-white/5 px-8 py-4 rounded-3xl border border-white/10">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">
                    Waktu Estimasi Hasil Keluar
                  </p>
                </CardBody>
              </Card>
            ) : (
              <Card className="bg-white rounded-[40px] p-4 shadow-xl border-t-8 border-accent border-none overflow-hidden">
                <CardBody className="p-8 md:p-12 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="bg-accent/10 p-6 rounded-full text-accent">
                      <CheckCircle2 size={64} />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-secondary">
                        Selamat, {userData.nama}!
                      </h2>
                      <p className="text-secondary/60 font-medium text-lg">
                        Anda telah resmi menjadi bagian dari keluarga besar
                        Budiman Drestanta.
                      </p>
                    </div>
                  </div>

                  <Divider />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background-light p-6 rounded-3xl border border-secondary/5 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <Clock size={20} /> Jadwal Tatap Muka
                      </div>
                      <p className="text-xl font-black text-secondary">
                        {userData.jadwalTatapMuka}
                      </p>
                    </div>
                    <div className="bg-background-light p-6 rounded-3xl border border-secondary/5 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <MapPin size={20} /> Lokasi Ruangan
                      </div>
                      <p className="text-xl font-black text-secondary">
                        {userData.lokasi}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-secondary text-white font-black h-16 rounded-2xl text-lg shadow-xl shadow-secondary/20"
                    endContent={<Download size={20} />}
                  >
                    Unduh Bukti Penerimaan
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* REVIEW DATA YANG DIUPLOAD */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary flex items-center gap-3">
                <FileText className="text-primary" /> Review Data Pendaftaran
              </h3>
              <Card className="border-none shadow-sm rounded-[32px]">
                <CardBody className="p-8 grid md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: <User size={18} />,
                      label: "Nama Lengkap",
                      value: userData.nama,
                    },
                    {
                      icon: <Calendar size={18} />,
                      label: "Program Pilihan",
                      value: userData.paket,
                    },
                    {
                      icon: <Mail size={18} />,
                      label: "Email",
                      value: "test@mail.com",
                    },
                    {
                      icon: <Phone size={18} />,
                      label: "No. Telp",
                      value: "0812-7765-3313",
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-xs text-secondary/40 font-black uppercase tracking-widest flex items-center gap-2">
                        {item.icon} {item.label}
                      </p>
                      <p className="text-secondary font-bold text-lg">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>
          </div>

          {/* KANAN: Sidebar Dokumen */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-secondary">
              Dokumen Terunggah
            </h3>
            <div className="grid gap-3">
              {[
                "Kartu Keluarga.pdf",
                "Akte Lahir.jpg",
                "KTP Orang Tua.jpg",
                "Passfoto.png",
              ].map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-white rounded-2xl border border-secondary/5 shadow-sm group hover:border-primary transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText
                      className="text-secondary/20 group-hover:text-primary transition-colors shrink-0"
                      size={20}
                    />
                    <span className="text-sm font-bold text-secondary/70 truncate">
                      {doc}
                    </span>
                  </div>
                  <ChevronRight size={16} className="text-secondary/20" />
                </div>
              ))}
            </div>

            <div className="p-6 bg-primary/5 rounded-[32px] border border-primary/10">
              <h4 className="font-bold text-secondary text-sm mb-2">
                Bantuan?
              </h4>
              <p className="text-xs text-secondary/60 leading-relaxed mb-4">
                Jika terdapat kesalahan data pada review di samping, segera
                hubungi admin melalui layanan pengaduan.
              </p>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                className="font-bold w-full rounded-xl"
              >
                Chat Admin
              </Button>
            </div>

            {/* Tombol Testing - Bisa dihapus nanti */}
            <Button
              size="sm"
              variant="bordered"
              className="w-full border-dashed"
              onPress={() =>
                setStatus(status === "pending" ? "accepted" : "pending")
              }
            >
              Simulasi Ganti Status
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
