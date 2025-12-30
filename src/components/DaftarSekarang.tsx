import { Button } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export function DaftarSekarang() {
  return (
    <div className="container mx-auto px-6 text-center">
      <div className="bg-primary rounded-[40px] p-16 text-white space-y-8 shadow-2xl shadow-primary/30 relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />

        <h2 className="text-4xl md:text-5xl font-extrabold relative z-10">
          Siap Mulai Masa Depanmu?
        </h2>
        <p className="text-white/90 max-w-2xl mx-auto text-xl font-light relative z-10 leading-relaxed">
          Bergabunglah dengan ratusan siswa lainnya dan raih pendidikan
          berkualitas yang menghargai waktu dan potensi unik Anda.
        </p>
        <div className="flex flex-col justify-center gap-4">
          <Button
            as={Link}
            to="/login"
            className=" self-center bg-secondary text-white font-bold rounded-full px-12 py-8 text-xl hover:bg-secondary/90 shadow-xl shadow-secondary/20"
          >
            Daftar Sekarang <ArrowRight className="ml-2" />
          </Button>
          <Button
            as={Link}
            to="/kontak"
            variant="bordered"
            className="self-center border-white/50 text-white font-bold text-xl px-10 py-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            Tanya Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
