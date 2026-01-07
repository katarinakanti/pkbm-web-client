import {
  Check,
  GraduationCap,
  NotebookText,
  Star,
} from "lucide-react";
import { Layout } from "../components/layout/Layout";
import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  CardBody,
} from "@heroui/react";
import { Link } from "react-router";
import { DaftarSekarang } from "../components/DaftarSekarang";

export function HomePage() {
  return (
    <Layout parentClassName="flex flex-col bg-background-light">
      <div className="flex flex-col gap-20 pb-20">
        {/* HERO SECTION */}
        <div className="relative h-[550px] w-full flex items-center justify-center overflow-hidden rounded-[60px] shadow-2xl">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/class1.png"
            alt="Hero"
          />
          {/* Overlay using Secondary for credibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/50 to-transparent" />
          <div className="relative z-10 text-center text-white px-6 max-w-4xl space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Belajar Tanpa Batas, <br />
              <span className="text-primary">Raih Masa Depan Cerah!</span>
            </h1>
            <p className="text-lg md:text-2xl font-light opacity-90 max-w-2xl mx-auto leading-relaxed">
              Temukan pengalaman homeschooling yang fleksibel, menyenangkan, dan
              diakui secara nasional.
            </p>
            <Button
              as={Link}
              to="/enroll"
              size="lg"
              className="bg-primary text-white font-bold rounded-full px-10 py-7 text-xl shadow-lg hover:scale-105 transition-transform"
            >
              Mulai Belajar Sekarang
            </Button>
          </div>
        </div>

        {/* STATISTICS GRID */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 -mt-32 relative z-20">
            {[
              {
                value: "100+",
                label: "Alumni Sukses",
                icon: <GraduationCap className="text-primary" size={40} />,
              },
              {
                value: "50+",
                label: "Pengajar Ahli",
                icon: <Check className="text-accent" size={40} />,
              },
              {
                value: "10+",
                label: "Tahun Berdiri",
                icon: <Star className="text-primary" size={40} />,
              },
              {
                value: "Nasional",
                label: "Akreditasi Resmi",
                icon: <NotebookText className="text-accent-blue" size={40} />,
              },
            ].map(({ value, label, icon }, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-xl border border-primary/10 text-center"
              >
                <div className="mb-4 p-3 bg-background-light rounded-2xl">
                  {icon}
                </div>
                <div className="text-3xl font-bold text-secondary">{value}</div>
                <div className="text-sm text-secondary/60 uppercase tracking-widest font-bold mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-secondary leading-tight">
              Mengapa memilih <br />
              <span className="text-primary underline decoration-accent/30">
                Budiman Drestanta?
              </span>
            </h2>
            <div className="grid gap-4">
              {[
                "Ijazah Resmi dan Diakui Secara Nasional",
                "Metode Pembelajaran Adaptif",
                "Pendampingan Guru Berpengalaman",
                "Jadwal Belajar Sangat Fleksibel",
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-secondary/5 group hover:border-primary transition-colors"
                >
                  <div className="bg-accent/10 p-2 rounded-full text-accent group-hover:bg-accent group-hover:text-white transition-all">
                    <Check size={20} />
                  </div>
                  <span className="font-semibold text-secondary/80">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-6 -right-6 w-full h-full bg-primary/20 rounded-[40px] -z-10" />
            <img
              src="/class1.png"
              className="rounded-[40px] shadow-2xl border-8 border-white object-cover"
              alt="Learning Environment"
            />
          </div>
        </div>

        {/* PROGRAM KAMI */}
        <div className="container mx-auto px-6 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-secondary">
              Pilihan Program Terbaik
            </h2>
            <p className="text-secondary/60 text-lg">
              Kurikulum standar nasional yang disesuaikan dengan kebutuhan Anda
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Paket A",
                sub: "(Setara SD)",
                desc: "Bangun pondasi akademik sejak dini dengan metode belajar yang ramah anak dan menyenangkan.",
              },
              {
                title: "Paket B",
                sub: "(Setara SMP)",
                desc: "Pembelajaran terarah untuk mendukung perkembangan akademik dan eksplorasi minat bakat remaja.",
              },
              {
                title: "Paket C",
                sub: "(Setara SMA)",
                desc: "Persiapan optimal menuju perguruan tinggi atau dunia kerja dengan pendampingan intensif.",
              },
            ].map(({ title, sub, desc }, index) => (
              <Card
                key={index}
                className="p-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-none bg-white"
              >
                <CardBody className="items-center text-center space-y-5">
                  <div className="w-24 h-24 rounded-3xl bg-background-light flex items-center justify-center text-primary shadow-inner">
                    <NotebookText size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-secondary">
                      {title}
                    </h3>
                    <p className="text-accent-blue font-bold tracking-wide uppercase text-sm mt-1">
                      {sub}
                    </p>
                  </div>
                  <p className="text-secondary/70 leading-relaxed font-medium">
                    {desc}
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* TESTIMONY */}
        <div className="container mx-auto px-6">
          <div className="bg-secondary rounded-[50px] overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="p-12 md:p-20 md:w-1/2 flex flex-col justify-center gap-8">
              <div className="text-primary font-black tracking-[0.2em] uppercase text-sm">
                Cerita Sukses Alumni
              </div>
              <blockquote className="text-white text-2xl italic font-light leading-relaxed">
                “Aku dulu sempat kesulitan mengikuti ritme sekolah formal karena
                harus membantu usaha keluarga. Di sini, aku bisa atur waktu
                sendiri tanpa tertinggal. Gurunya sabar dan materinya sangat
                mudah dipahami.”
              </blockquote>
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                  R
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Rani</div>
                  <div className="text-primary/80 font-medium">
                    Lulusan Paket C 2024
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative min-h-[400px]">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="/class1.png"
                alt="Testimonial"
              />
              <div className="absolute inset-0 bg-secondary/20" />
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="container mx-auto px-6 max-w-4xl space-y-10">
          <h2 className="text-4xl font-bold text-center text-secondary">
            Sering Ditanyakan
          </h2>
          <Accordion
            variant="splitted"
            selectionMode="multiple"
            className="gap-4"
          >
            {[
              {
                title: "Apa itu homeschooling Paket A, B, dan C?",
                content:
                  "Program pendidikan nonformal yang setara SD, SMP, dan SMA dengan kurikulum nasional dan ijazah resmi yang diakui pemerintah.",
              },
              {
                title: "Apakah ijazahnya bisa untuk daftar kerja?",
                content:
                  "Tentu saja! Ijazah ini memiliki kekuatan hukum yang sama dengan ijazah sekolah formal untuk melamar kerja atau daftar kuliah (PTN/PTS).",
              },
              {
                title: "Bagaimana dengan jadwal belajarnya?",
                content:
                  "Sangat fleksibel. Siswa dapat menyesuaikan waktu belajar dengan hobi, pekerjaan, atau kondisi khusus lainnya.",
              },
            ].map(({ title, content }, index) => (
              <AccordionItem
                key={index}
                aria-label={title}
                title={
                  <span className="font-bold text-secondary">{title}</span>
                }
                className="bg-white border border-secondary/5 px-4 shadow-sm"
              >
                <div className="pb-4 text-secondary/70 font-medium leading-relaxed">
                  {content}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <DaftarSekarang />
      </div>
    </Layout>
  );
}
