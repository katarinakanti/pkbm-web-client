import { DaftarSekarang } from "../components/DaftarSekarang";
import { Layout } from "../components/layout/Layout";
import { Check } from "lucide-react";

export function TentangKami() {
  return (
    <Layout parentClassName="flex flex-col bg-background-light">
      <div className="flex flex-col gap-20 pb-20">
        {/* MINI HERO SECTION - Consistent with Homepage */}
        <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden shadow-lg rounded-xl">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center"
            src="/class1.png"
            alt="Tentang Kami Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/60 to-transparent" />
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Mengenal <span className="text-primary">Budiman Drestanta</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
              Membangun masa depan melalui pendidikan alternatif yang inklusif
              dan memanusiakan manusia.
            </p>
          </div>
        </div>

        {/* INTRODUCTION / HISTORY */}
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3 space-y-6">
              <h2 className="text-3xl font-bold text-secondary">
                Dedikasi Untuk <br />
                <span className="text-primary">Pendidikan Bermakna</span>
              </h2>
              <div className="space-y-4 text-lg text-secondary/80 leading-relaxed font-medium">
                <p>
                  Yayasan Budiman Drestanta Tiyasa adalah pusat kegiatan belajar
                  masyarakat (PKBM) yang berkomitmen untuk menghadirkan
                  pembelajaran yang fleksibel, inklusif, dan bermakna.
                </p>
                <p>
                  Kami percaya bahwa setiap anak memiliki cara dan ritme belajar
                  yang unik. Budiman Drestanta hadir sebagai ruang belajar yang
                  menumbuhkan potensi, membangun karakter, dan mempersiapkan
                  peserta didik menghadapi dunia nyata dengan percaya diri.
                </p>
              </div>
            </div>
            <div className="md:col-span-2">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/20 rounded-[32px] -z-10" />
                <img
                  src="/class1.png"
                  className="rounded-[32px] shadow-xl border-4 border-white h-80 w-full object-cover"
                  alt="Yayasan Kami"
                />
              </div>
            </div>
          </div>
        </div>

        {/* VISI & MISI SECTION */}
        <div className="container mx-auto px-6 max-w-6xl space-y-12">
          {/* VISI CARD */}
          <div className="flex flex-col md:flex-row items-center gap-10 bg-white p-10 rounded-[40px] shadow-xl border border-secondary/5 group hover:border-primary/20 transition-all">
            <div className="w-full md:w-2/5">
              <div className="overflow-hidden rounded-3xl">
                <img
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/class1.png"
                  alt="Visi Illustration"
                />
              </div>
            </div>
            <div className="w-full md:w-3/5 space-y-4">
              <div className="inline-block px-4 py-1 bg-primary/10 rounded-full text-primary font-bold text-sm uppercase tracking-widest">
                Tujuan Utama
              </div>
              <h2 className="text-4xl font-bold text-secondary">Visi Kami</h2>
              <p className="text-xl text-secondary/70 leading-relaxed italic">
                "Menjadi pusat pendidikan alternatif yang inklusif dan inovatif,
                memberdayakan setiap individu untuk belajar sesuai potensinya,
                berpikir kritis, dan berkontribusi positif bagi masyarakat."
              </p>
            </div>
          </div>

          {/* MISI CARD */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-10 bg-white p-10 rounded-[40px] shadow-xl border border-secondary/5 group hover:border-primary/20 transition-all">
            <div className="w-full md:w-2/5">
              <div className="overflow-hidden rounded-3xl">
                <img
                  className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                  src="/class1.png"
                  alt="Misi Illustration"
                />
              </div>
            </div>
            <div className="w-full md:w-3/5 space-y-6">
              <div className="inline-block px-4 py-1 bg-accent/10 rounded-full text-accent font-bold text-sm uppercase tracking-widest">
                Langkah Kami
              </div>
              <h2 className="text-4xl font-bold text-secondary">Misi Kami</h2>
              <ul className="grid gap-4">
                {[
                  "Menyediakan lingkungan belajar yang fleksibel dan personal.",
                  "Mendorong pembelajaran berbasis nilai, tanggung jawab, dan empati.",
                  "Mengintegrasikan teknologi dan metode kreatif dalam belajar.",
                  "Membangun komunitas belajar kolaboratif antar pendidik dan orang tua.",
                  "Membuka akses pendidikan bagi semua latar belakang sosial ekonomi.",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="mt-1 bg-primary rounded-full p-1 text-white shadow-md">
                      <Check size={14} strokeWidth={4} />
                    </div>
                    <span className="text-lg text-secondary/80 font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="container mx-auto px-6">
          <DaftarSekarang />
        </div>
      </div>
    </Layout>
  );
}
