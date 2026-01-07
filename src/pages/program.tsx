import { Layout } from "../components/layout/Layout";
import { DaftarSekarang } from "../components/DaftarSekarang";
import {
  BookOpen,
  Users,
  Clock,
  Award,
  CheckCircle2,
  Laptop,
} from "lucide-react";
import { Card, CardBody, Button, Chip } from "@heroui/react";

export function ProgramPage() {
  const programs = [
    {
      title: "Paket A",
      level: "Setara SD",
      icon: <BookOpen className="text-primary" size={40} />,
      color: "border-t-primary",
      description:
        "Pendidikan dasar yang fokus pada literasi, numerasi, dan pembentukan karakter anak usia dini.",
      features: [
        "Pelajaran Tematik",
        "Eksplorasi Minat",
        "Ijazah Negara",
        "Guru Pendamping",
      ],
    },
    {
      title: "Paket B",
      level: "Setara SMP",
      icon: <Users className="text-accent-blue" size={40} />,
      color: "border-t-accent-blue",
      description:
        "Masa transisi remaja yang menekankan pada kemandirian belajar dan pemahaman konsep akademik.",
      features: [
        "Kurikulum Nasional",
        "Bimbingan Konseling",
        "Pengembangan Bakat",
        "Ujian Kesetaraan",
      ],
    },
    {
      title: "Paket C",
      level: "Setara SMA",
      icon: <Award className="text-accent" size={40} />,
      color: "border-t-accent",
      description:
        "Persiapan matang untuk melanjutkan ke Perguruan Tinggi (PTN/PTS) atau persiapan dunia kerja.",
      features: [
        "Persiapan Kuliah",
        "Penjurusan Minat",
        "Portofolio Lulusan",
        "Ijazah Setara SMA",
      ],
    },
  ];

  return (
    <Layout parentClassName="bg-background-light">
      <div className="flex flex-col gap-20 pb-20">
        {/* HERO SECTION */}
        <div className="relative h-[450px] w-full flex items-center justify-center overflow-hidden shadow-lg">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/class1.png"
            alt="Program Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/70 to-transparent" />
          <div className="relative z-10 text-center text-white px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Program <span className="text-primary text-glow">Kesetaraan</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl font-light opacity-90 max-w-2xl mx-auto">
              Pilihan jalur pendidikan resmi dengan ijazah negara, didesain
              untuk kenyamanan dan potensi unik setiap siswa.
            </p>
          </div>
        </div>

        {/* PROGRAM CARDS */}
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 -mt-24 relative z-20">
            {programs.map((prog, index) => (
              <Card
                key={index}
                className={`border-t-8 ${prog.color} shadow-2xl hover:-translate-y-3 transition-all duration-300`}
              >
                <CardBody className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div className="p-4 bg-background-light rounded-2xl shadow-inner">
                      {prog.icon}
                    </div>
                    <Chip variant="flat" color="primary" className="font-bold">
                      {prog.level}
                    </Chip>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold text-secondary">
                      {prog.title}
                    </h3>
                    <p className="text-secondary/60 mt-2 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <ul className="space-y-3 pt-4">
                    {prog.features.map((feat, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-secondary/80 font-medium"
                      >
                        <CheckCircle2 size={18} className="text-accent" />
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full bg-secondary text-white font-bold h-12 rounded-xl mt-4"
                    as="a"
                    href="/admisi"
                  >
                    Detail Program
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* METODE BELAJAR SECTION */}
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="bg-white rounded-[40px] p-10 md:p-16 shadow-xl flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary">
                Metode Belajar <span className="text-primary">Adaptif</span>
              </h2>
              <p className="text-secondary/70 text-lg leading-relaxed">
                Kami menggabungkan teknologi digital dengan bimbingan tatap muka
                yang personal. Siswa tidak hanya belajar teori, tapi juga
                keterampilan hidup yang relevan.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-background-light rounded-2xl">
                  <Laptop size={24} className="text-primary" />
                  <span className="font-bold text-secondary text-sm">
                    E-Learning
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-background-light rounded-2xl">
                  <Clock size={24} className="text-primary" />
                  <span className="font-bold text-secondary text-sm">
                    Waktu Fleksibel
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="/class1.png"
                className="rounded-3xl shadow-lg border-4 border-white object-cover h-64 w-full"
                alt="Learning Method"
              />
            </div>
          </div>
        </div>

        {/* ALUR PENDAFTARAN */}
        <div className="container mx-auto px-6 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              Alur Pendaftaran
            </h2>
            <p className="text-secondary/60 mt-2">
              Langkah mudah menjadi bagian dari PKBM Budiman Drestanta
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            {[
              {
                n: "01",
                t: "Konsultasi",
                d: "Hubungi admin via WhatsApp untuk tanya jawab.",
              },
              {
                n: "02",
                t: "Formulir",
                d: "Isi formulir pendaftaran secara online atau offline.",
              },
              {
                n: "03",
                t: "Berkas",
                d: "Lengkapi dokumen (Ijazah terakhir, KK, Akta Lahir).",
              },
              {
                n: "04",
                t: "Aktivasi",
                d: "Mulai akses portal belajar dan bimbingan.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative p-8 bg-white rounded-3xl shadow-sm border border-secondary/5 group hover:bg-secondary transition-all duration-300"
              >
                <div className="text-5xl font-black text-primary group-hover:text-white/20 transition-colors opacity-20 absolute top-4 right-4 italic">
                  {step.n}
                </div>
                <h4 className="text-xl font-bold text-secondary group-hover:text-white mb-2">
                  {step.t}
                </h4>
                <p className="text-secondary/60 group-hover:text-white/80 text-sm leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="container mx-auto px-6">
          <DaftarSekarang />
        </div>
      </div>
    </Layout>
  );
}
