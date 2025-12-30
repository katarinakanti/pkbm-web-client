import { Button, Input, Checkbox, Card, CardBody } from "@heroui/react";
import { Link } from "react-router";
import { Mail, Lock } from "lucide-react";
import { Layout } from "../../components/layout/Layout";

export function LoginPage() {
  return (
    <Layout parentClassName="bg-background-light min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center p-6 gap-12">
        {/* LEFT SIDE: Visual Welcome */}
        <div className="hidden md:flex flex-col gap-6 max-w-md">
          <h1 className="text-4xl font-extrabold text-secondary leading-tight">
            Selamat Datang <br />
            <span className="text-primary">Kembali Belajar!</span>
          </h1>
          <p className="text-secondary/60 text-lg font-medium">
            Masuk ke portal siswa untuk melanjutkan perjalanan belajarmu hari
            ini.
          </p>
          <img
            src="/class1.png"
            className="rounded-3xl shadow-2xl border-4 border-white"
            alt="Student"
          />
        </div>

        {/* RIGHT SIDE: Login Form */}
        <Card className="w-full max-w-md p-4 shadow-2xl border-none">
          <CardBody className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-secondary">Masuk</h2>
              <p className="text-sm text-zinc-500 font-medium">
                Gunakan akun PKBM terdaftar Anda
              </p>
            </div>

            <form className="space-y-8">
              <Input
                type="email"
                label="Email"
                placeholder="nama@email.com"
                labelPlacement="outside"
                startContent={<Mail size={18} className="text-zinc-400" />}
                variant="bordered"
                className="font-medium"
              />
              <Input
                type="password"
                label="Kata Sandi"
                placeholder="Masukkan kata sandi"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-zinc-400" />}
                variant="bordered"
                className="font-medium"
              />

              {/* <div className="flex justify-between items-center px-1">
                <Checkbox
                  size="sm"
                  classNames={{ label: "text-zinc-500 font-medium" }}
                >
                  Ingat Saya
                </Checkbox>
                <Link
                  to="/forgot-password"
                  className="text-primary font-bold text-sm hover:underline"
                >
                  Lupa Sandi?
                </Link>
              </div> */}

              <Button className="w-full bg-secondary text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-secondary/20">
                Masuk Sekarang
              </Button>
            </form>

            <div className="text-center pt-4">
              <p className="text-zinc-500 font-medium text-sm">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-primary font-bold hover:underline"
                >
                  Daftar Disini
                </Link>
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
