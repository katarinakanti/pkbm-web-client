import {
  Button,
  Input,
  Card,
  CardBody,
  Select,
  SelectItem,
} from "@heroui/react";
import { Link } from "react-router";
import { User, Mail, Lock, GraduationCap, ArrowRight } from "lucide-react";
import { Layout } from "../../components/layout/Layout";

export function RegisterPage() {
  return (
    <Layout parentClassName="bg-background-light min-h-screen">
      <div className="flex flex-col md:flex-row-reverse items-center justify-center p-6 gap-12">
        {/* RIGHT SIDE: Info */}
        <div className="hidden md:flex flex-col gap-6 max-w-md">
          <h1 className="text-4xl font-extrabold text-secondary leading-tight">
            Mulai Langkah <br />
            <span className="text-primary">Suksesmu Di Sini.</span>
          </h1>
          <div className="space-y-4">
            {[
              "Pendaftaran Mudah & Cepat",
              "Kurikulum Standar Nasional",
              "Pilih Jadwal Fleksibelmu",
            ].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border-l-4 border-accent"
              >
                <GraduationCap className="text-accent" size={20} />
                <span className="text-secondary/80 font-bold">{text}</span>
              </div>
            ))}
          </div>
          <div className="p-8 bg-secondary rounded-[40px] text-white space-y-2 mt-4">
            <p className="italic font-light">
              "Keputusan terbaik untuk masa depan anak saya."
            </p>
            <p className="font-bold text-primary">— Orang Tua Siswa</p>
          </div>
        </div>

        {/* LEFT SIDE: Register Form */}
        <Card className="w-full max-w-lg p-4 shadow-2xl border-none">
          <CardBody className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-secondary">
                Daftar Akun Baru
              </h2>
              <p className="text-sm text-zinc-500 font-medium">
                Lengkapi data untuk memulai pendaftaran
              </p>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                label="Nama Lengkap"
                placeholder="Contoh: Maudy Ayunda"
                labelPlacement="outside"
                startContent={<User size={18} className="text-zinc-400" />}
                variant="bordered"
                className="md:col-span-2 font-medium"
              />
              <Input
                type="email"
                label="Email"
                placeholder="nama@email.com"
                labelPlacement="outside"
                startContent={<Mail size={18} className="text-zinc-400" />}
                variant="bordered"
                className="md:col-span-2 font-medium"
              />
              <Select
                label="Pilihan Program"
                placeholder="Pilih Paket"
                labelPlacement="outside"
                variant="bordered"
                className="font-medium"
              >
                <SelectItem key="a">Paket A (SD)</SelectItem>
                <SelectItem key="b">Paket B (SMP)</SelectItem>
                <SelectItem key="c">Paket C (SMA)</SelectItem>
              </Select>
              <Input
                type="tel"
                label="No. WhatsApp"
                placeholder="0812..."
                labelPlacement="outside"
                variant="bordered"
                className="font-medium"
              />
              <Input
                type="password"
                label="Kata Sandi"
                placeholder="Min. 8 Karakter"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-zinc-400" />}
                variant="bordered"
                className="font-medium"
              />
              <Input
                type="password"
                label="Konfirmasi Sandi"
                placeholder="Ulangi sandi"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-zinc-400" />}
                variant="bordered"
                className="font-medium"
              />

              <div className="md:col-span-2 pt-4">
                <Button
                  as={Link}
                  to="/enroll"
                  className="w-full bg-primary text-white font-bold py-7 text-lg rounded-xl shadow-lg shadow-primary/20"
                >
                  Daftar Sekarang <ArrowRight size={20} />
                </Button>
              </div>
            </form>

            <p className="text-center text-zinc-500 font-medium text-sm">
              Sudah punya akun?{" "}
              <Link
                to="/login"
                className="text-secondary font-bold hover:underline"
              >
                Login Masuk
              </Link>
            </p>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
