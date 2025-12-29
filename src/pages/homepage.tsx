import { Check, GraduationCap, NotebookText } from "lucide-react";
import { Layout } from "../components/layout/Layout";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { Link } from "react-router";

export function HomePage() {
  return (
    <Layout parentClassName={`flex flex-col`}>
      <div className="flex flex-col gap-8">
        <img className="w-full" src="/class1.png" />
        {/* slogan */}
        <div className="flex flex-col gap-2 ">
          <div className="font-bold text-center text-2xl">
            Belajar Tanpa Batas, Raih Masa Depan Cerah!
          </div>
          <div className="text-center text-sm">
            Temukan pengalaman homeschooling yang fleksibel, menyenangkan, dan
            diakui secara nasional.
          </div>
        </div>
        {/* GRID statistics alumni card */}
        <div className="grid grid-cols-4 gap-2 m-2">
          {[
            { value: "100+", label: "Alumni" },
            { value: "50+", label: "Pengajar" },
            { value: "10+", label: "Tahun Pengalaman" },
            { value: "Nasional", label: "Diakui" },
          ].map(({ value, label }, index) => (
            <div
              key={index}
              className="flex flex-col self-center items-center p-2"
            >
              <GraduationCap size={60} />
              <div className="text-3xl">{value}</div>
              <div className="text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* mengapa memilih kami */}
        <div className="grid grid-cols-2 gap-1 mx-8 items-center">
          <div className="flex flex-col gap-1 self-center">
            <div className="font-bold text-xl self-center">
              Mengapa memilih kami?
            </div>
            <div className="flex flex-col gap-2 self-center">
              {[
                "Ijazah Resmi dan Diakui Secara Nasional",
                "Metode Pembelajaran Adaptif ",
                "Pendampingan Guru Berpengalaman",
                "Jadwal Fleksibel",
              ].map((text, index) => (
                <div key={index} className="font-light flex items-start gap-2">
                  <Check className="mt-1 shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <img src="/class1.png" />
        </div>
        {/* program kami */}
        <div className="flex flex-col gap-2">
          <div className="font-bold text-2xl py-3">Program Kami</div>
          <div className="grid grid-cols-3 gap-4">
            {[
              {
                title: "Paket A",
                subtitle: "(Setara SD)",
                description:
                  "Bangun pondasi akademik sejak dini dengan metode belajar yang ramah anak, fleksibel, dan berijazah resmi.",
              },
              {
                title: "Paket B",
                subtitle: "(Setara SMP)",
                description:
                  "Pembelajaran terarah untuk mendukung perkembangan akademik dan karakter remaja.",
              },
              {
                title: "Paket C",
                subtitle: "(Setara SMA)",
                description:
                  "Persiapan optimal menuju perguruan tinggi atau dunia kerja dengan ijazah resmi.",
              },
            ].map(({ title, subtitle, description }, index) => (
              <div
                key={index}
                className="flex flex-col border rounded-xl self-center items-center py-4 gap-4"
              >
                <div className="w-30 h-30 rounded-full bg-gray-300 flex items-center justify-center shadow-sm">
                  <NotebookText className="text-gray-700" size={60} />
                </div>

                <div className="text-xl text-center">
                  {title} <br />
                  <span className="text-base">{subtitle}</span>
                </div>

                <div className="text-xs font-light text-center px-4">
                  {description}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Testimoni */}
        <div className="flex flex-col gap-2">
          <div className="font-bold text-2xl py-3l">Testimoni</div>
          <div className="bg-blue-200 p-4 grid grid-cols-2 gap-2 p-10 items-center rounded-xl">
            <div className="flex flex-col gap-10">
              <div>
                “Aku dulu sempat kesulitan mengikuti ritme sekolah formal karena
                harus bantu usaha keluarga. Setelah pindah ke Budiman Drestanta,
                aku bisa atur waktu belajar sendiri tanpa ketinggalan pelajaran.
                Gurunya sabar dan materinya mudah dipahami. Sekarang aku sudah
                lulus dan siap lanjut kuliah!”
              </div>
              <div className="font-bold text-sm">
                — Rani, Lulusan Paket C 2024
              </div>
            </div>
            <img className="w-full " src="/class1.png" />
          </div>
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-2">
          <div className="font-bold text-2xl py-3">FAQs</div>

          <Accordion variant="splitted">
            {[
              {
                title: "Apa itu homeschooling Paket A, B, dan C?",
                content:
                  "Program pendidikan nonformal yang setara SD, SMP, dan SMA dengan ijazah resmi dan diakui secara nasional.",
              },
              {
                title: "Apakah ijazahnya resmi dan bisa digunakan?",
                content:
                  "Ya, ijazah yang diterbitkan setara dengan pendidikan formal dan dapat digunakan untuk melanjutkan pendidikan maupun bekerja.",
              },
              {
                title: "Bagaimana sistem belajar dan jadwalnya?",
                content:
                  "Sistem belajar fleksibel dengan pendampingan guru, menyesuaikan kebutuhan dan ritme belajar siswa.",
              },
            ].map(({ title, content }, index) => (
              <AccordionItem
                key={index}
                aria-label={`Accordion ${index + 1}`}
                title={title}
              >
                {content}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2 ">
          <div className="font-bold text-center text-2xl">
            Siap Mulai Perjalanan Belajar yang Lebih Fleksibel?
          </div>
          <div className="text-center text-sm">
            Atur jadwalmu, pilih gaya belajarmu, dan tetap raih target akademik.
          </div>
          <Button
            as={Link}
            to={"/login"}
            className="flex rounded-full bg-primary text-white self-center text-xl p-6 my-6"
          >
            Daftar Sekarang
          </Button>
        </div>
      </div>
    </Layout>
  );
}
