import { Layout } from "../components/layout/Layout";
import { DaftarSekarang } from "../components/DaftarSekarang";
import {
  FileText,
  ClipboardCheck,
  Info,
  Calendar,
  ShieldCheck,
  CreditCard,
  MousePointerClick,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  Button,
  Chip,
} from "@heroui/react";
import { Link } from "react-router";

export function AdmisiPage() {
  const requirements = [
    {
      title: "Fotokopi Ijazah Terakhir",
      desc: "Dilegalisir (2 lembar)",
      icon: <FileText className="text-primary" />,
    },
    {
      title: "Fotokopi SHUN",
      desc: "Dilegalisir (2 lembar)",
      icon: <FileText className="text-primary" />,
    },
    {
      title: "Fotokopi Akta Kelahiran",
      desc: "1 lembar",
      icon: <ClipboardCheck className="text-accent" />,
    },
    {
      title: "Fotokopi Kartu Keluarga",
      desc: "1 lembar",
      icon: <ClipboardCheck className="text-accent" />,
    },
    {
      title: "Pas Foto Terbaru",
      desc: "3x4 & 4x6 (Latar belakang merah)",
      icon: <Info className="text-accent-blue" />,
    },
  ];

  return (
    <Layout parentClassName="bg-background-light">
      <div className="flex flex-col gap-20 pb-20">
        {/* 1. HERO SECTION */}
        <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden shadow-lg">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/class1.png"
            alt="Admisi Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/70 to-transparent" />
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Penerimaan Siswa <span className="text-primary">Baru</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed">
              Langkah awal menuju pendidikan yang lebih fleksibel dan berfokus
              pada potensi dirimu.
            </p>
          </div>
        </div>

        {/* 2. EYE-CATCHING APPLY CTA (Atas) */}
        <div className="container mx-auto px-6 -mt-24 relative z-30">
          <div className="bg-primary rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/30 flex flex-col md:flex-row items-center justify-between gap-8 border-4 border-white">
            <div className="text-white space-y-2">
              <h2 className="text-3xl font-black italic tracking-tight">
                SIAP DAFTAR ONLINE?
              </h2>
              <p className="text-white/80 font-medium">
                Proses pendaftaran hanya memakan waktu 5 menit melalui portal
                kami.
              </p>
            </div>
            <Button
              as={Link}
              to="/register"
              className="bg-secondary text-white font-black px-10 py-8 rounded-2xl text-xl shadow-xl hover:scale-105 transition-transform group"
            >
              Klik Untuk Daftar Online
              <MousePointerClick className="ml-2 group-hover:animate-bounce" />
            </Button>
          </div>
        </div>

        {/* 3. MAIN CONTENT GRID (Sidebar & Requirements) */}
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            {/* KONTEN KIRI: Persyaratan */}
            <div className="md:col-span-2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-extrabold text-secondary flex items-center gap-3">
                  <div className="w-2 h-10 bg-primary rounded-full" />
                  Persyaratan Dokumen
                </h2>
                <p className="text-secondary/60 font-medium">
                  Lengkapi dokumen berikut untuk kelancaran proses verifikasi
                  data Dapodik:
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {requirements.map((item, index) => (
                  <Card
                    key={index}
                    className="shadow-sm border border-secondary/5 hover:border-primary/30 transition-all"
                  >
                    <CardBody className="flex flex-row items-center gap-4 p-5">
                      <div className="p-3 bg-background-light rounded-2xl text-primary shadow-inner">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary text-sm leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-xs text-secondary/50 font-medium mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </div>

              {/* Info Penting Box */}
              <div className="bg-white p-8 rounded-[40px] shadow-xl border-t-8 border-accent flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-accent/10 p-5 rounded-full text-accent">
                  <ShieldCheck size={48} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-secondary uppercase tracking-tight">
                    Ijazah Resmi & Terakreditasi
                  </h4>
                  <p className="text-secondary/70 text-sm leading-relaxed font-medium">
                    Seluruh lulusan PKBM Budiman Drestanta mendapatkan ijazah
                    negara yang sah untuk melanjutkan pendidikan ke jenjang
                    formal (PTN/PTS) maupun dunia kerja.
                  </p>
                </div>
              </div>
            </div>

            {/* SIDEBAR KANAN: Jadwal & Konsultasi */}
            <div className="space-y-6">
              <Card className="bg-secondary text-white border-none shadow-2xl p-2 rounded-[32px]">
                <CardBody className="p-6 space-y-8">
                  <div className="space-y-2 text-center">
                    <Chip
                      className="bg-primary text-white font-bold uppercase text-[10px]"
                      size="sm"
                    >
                      Tahun Ajaran 2025/2026
                    </Chip>
                    <h3 className="text-2xl font-bold">Pendaftaran Dibuka</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4 items-center">
                      <div className="bg-white/10 p-3 rounded-2xl text-primary">
                        <Calendar size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                          Gelombang 1
                        </p>
                        <p className="text-sm font-bold">Januari - Juni 2025</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="bg-white/10 p-3 rounded-2xl text-primary">
                        <CreditCard size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] text-white/50 font-black uppercase tracking-widest">
                          Biaya Paket
                        </p>
                        <p className="text-sm font-bold">
                          Tersedia Cicilan Ringan
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      as="a"
                      href="https://wa.me/6281277653313"
                      className="w-full bg-primary text-white font-black h-16 rounded-2xl shadow-lg shadow-primary/20 text-lg group"
                    >
                      Hubungi Admin
                      <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
                    </Button>
                    <p className="text-[10px] text-center text-white/40 mt-4 font-medium uppercase tracking-tighter">
                      Respon cepat via WhatsApp (Jam Kerja)
                    </p>
                  </div>
                </CardBody>
              </Card>

              <div className="p-6 bg-accent/10 border-2 border-dashed border-accent/30 rounded-3xl flex flex-col gap-3">
                <div className="flex items-center gap-2 text-accent">
                  <Info size={20} />
                  <span className="font-bold text-sm">
                    Informasi Pendaftaran
                  </span>
                </div>
                <p className="text-xs text-secondary/80 font-medium leading-relaxed">
                  Calon siswa bisa datang langsung ke kantor PKBM untuk bantuan
                  pengisian berkas fisik setiap hari Senin-Jumat pukul 09.00 -
                  16.00 WIB.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FAQ SECTION */}
        <div className="container mx-auto px-6 max-w-4xl space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-black text-secondary">
              Pertanyaan Populer
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <Accordion
            variant="splitted"
            selectionMode="multiple"
            className="gap-4"
          >
            {[
              {
                q: "Kapan waktu pendaftaran?",
                a: "Pendaftaran dibuka sepanjang tahun. Namun disarankan mendaftar di awal semester untuk sinkronisasi Dapodik.",
              },
              {
                q: "Bisa pindah dari sekolah formal?",
                a: "Sangat bisa. Kami menerima siswa pindahan kapan saja dengan melampirkan surat pindah resmi.",
              },
              {
                q: "Bagaimana jika ijazah hilang?",
                a: "Wajib melampirkan Surat Keterangan Pengganti Ijazah dari sekolah asal yang disahkan Dinas Pendidikan.",
              },
            ].map((faq, i) => (
              <AccordionItem
                key={i}
                title={
                  <span className="font-bold text-secondary text-lg">
                    {faq.q}
                  </span>
                }
                className="bg-white px-4 shadow-sm border border-secondary/5"
              >
                <div className="pb-4 text-secondary/70 font-medium leading-relaxed italic border-l-4 border-primary pl-4">
                  {faq.a}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* 5. FOOTER CTA */}
        <div className="container mx-auto px-6">
          <DaftarSekarang />
        </div>
      </div>
    </Layout>
  );
}
