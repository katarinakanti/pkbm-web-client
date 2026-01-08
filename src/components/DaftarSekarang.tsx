import { Button } from "@heroui/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router";

export function DaftarSekarang() {
  return (
    <div className="container mx-auto px-4 md:px-6 text-center">
      <div className="bg-primary rounded-[30px] md:rounded-[40px] p-8 md:p-16 text-white space-y-6 md:space-y-8 shadow-2xl shadow-primary/30 relative overflow-hidden">
        {/* Decorative circle - Adjusted size for mobile */}
        <div className="absolute -top-10 -right-10 md:-top-20 md:-right-20 w-32 h-32 md:w-64 md:h-64 bg-white/10 rounded-full" />

        <h2 className="text-3xl md:text-5xl font-extrabold relative z-10 leading-tight">
          Siap Mulai <br className="md:hidden" /> Masa Depanmu?
        </h2>

        <p className="text-white/90 max-w-2xl mx-auto text-lg md:text-xl font-light relative z-10 leading-relaxed px-2">
          Bergabunglah dengan ratusan siswa lainnya dan raih pendidikan
          berkualitas yang menghargai potensi unik Anda.
        </p>

        {/* Buttons: Full width on mobile, auto width on desktop */}
        <div className="flex flex-col md:flex-row justify-center items-stretch md:items-center gap-4 relative z-10">
          <Button
            as={Link}
            to="/enroll"
            className="bg-secondary text-white font-bold rounded-2xl md:rounded-full px-8 md:px-12 py-7 md:py-8 text-lg md:text-xl hover:bg-secondary/90 shadow-xl shadow-secondary/20"
          >
            Daftar Sekarang <ArrowRight className="ml-2" size={20} />
          </Button>

          <Button
            as={Link}
            to="https://wa.me/628117778132"
            variant="bordered"
            className="border-white/50 text-white font-bold text-lg md:text-xl px-8 md:px-10 py-7 md:py-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all"
            startContent={<MessageCircle size={20} className="md:hidden" />}
          >
            Tanya Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
