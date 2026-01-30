import { Button, Input, Card, CardBody, addToast } from "@heroui/react";
import { Link } from "react-router";
import {
  User,
  Mail,
  Lock,
  GraduationCap,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Layout } from "../../components/layout/Layout";
import { useState } from "react";
import { AxiosClient } from "../../api/AxiosClient";

export function RegisterPage() {
  const [show_password, setShowPassword] = useState<boolean>(false);
  const [loading_submit, setLoadingSubmit] = useState<boolean>(false);
  const [re_password, setRePassword] = useState<string>("");
  const [data, setData] = useState({
    fullname: "",
    email: "",
    phone_number: "",
    password: "",
  });

  async function register() {
    console.log("MY API URL IS:", import.meta.env.VITE_API_URL);
    if (data.password !== re_password) {
      addToast({
        title: "Konfirmasi kata sandi tidak cocok.",
      });
      return;
    }
    try {
      setLoadingSubmit(true);
      // console.log("here")
      await AxiosClient.registerNewUser({
        body: {
          fullname: data.fullname,
          email: data.email,
          phone_number: data.phone_number,
          password: data.password,
        },
      });
      // console.log("res", res)
      // UserUtility.setToken(res.token);
      // UserUtility.redirectIfHasLogin("/");
      // UserUtility.redirectIfNotLogin("/login");
      localStorage.setItem(
        "registrationSuccess",
        "Registrasi berhasil! Silakan login.",
      );
      window.location.href = "/login";
    } catch (err: any) {
      addToast({
        title:
          err?.response?.data?.toString() ?? err?.message ?? "Unknown Error",
      });
    } finally {
      setLoadingSubmit(false);
    }
  }

  return (
    <Layout className="bg-background-light min-h-screen">
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

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={(e) => {
                // console.log("submitted", data)
                e.preventDefault();
                register();
              }}
            >
              <Input
                type="text"
                value={data.fullname}
                onChange={(e) =>
                  setData((d) => ({ ...d, fullname: e.target.value }))
                }
                label="Nama Lengkap"
                placeholder="Contoh: Maudy Ayunda"
                labelPlacement="outside"
                startContent={<User size={18} className="text-zinc-400" />}
                variant="bordered"
                className="md:col-span-2 font-medium"
                required
              />
              <Input
                type="email"
                value={data.email}
                onChange={(e) =>
                  setData((d) => ({ ...d, email: e.target.value }))
                }
                label="Email"
                placeholder="nama@email.com"
                labelPlacement="outside"
                startContent={<Mail size={18} className="text-zinc-400" />}
                variant="bordered"
                className="md:col-span-2 font-medium"
                required
              />
              <Input
                type="tel"
                value={data.phone_number}
                onChange={(e) =>
                  setData((d) => ({ ...d, phone_number: e.target.value }))
                }
                label="No. WhatsApp"
                placeholder="0812..."
                labelPlacement="outside"
                variant="bordered"
                className="md:col-span-2 font-medium"
                required
              />
              <Input
                className="md:col-span-2 font-medium"
                label="Kata Sandi"
                value={data.password}
                onChange={(e) =>
                  setData((d) => ({ ...d, password: e.target.value }))
                }
                placeholder="Min. 8 Karakter"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-zinc-400" />}
                variant="bordered"
                endContent={
                  show_password ? (
                    <Eye size={20} onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeOff size={20} onClick={() => setShowPassword(true)} />
                  )
                }
                type={show_password ? "" : "password"}
                required
                autoComplete="new-password"
              />
              <Input
                className="md:col-span-2 font-medium"
                value={re_password}
                onChange={(e) => setRePassword(e.target.value)}
                label="Konfirmasi Kata Sandi"
                labelPlacement="outside"
                startContent={<Lock size={18} className="text-zinc-400" />}
                variant="bordered"
                endContent={
                  show_password ? (
                    <Eye size={20} onClick={() => setShowPassword(false)} />
                  ) : (
                    <EyeOff size={20} onClick={() => setShowPassword(true)} />
                  )
                }
                type={show_password ? "" : "password"}
                required
                autoComplete="new-password"
              />

              <div className="md:col-span-2 pt-4">
                <Button
                  type="submit"
                  isLoading={loading_submit}
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
