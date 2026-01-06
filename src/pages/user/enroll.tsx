import { useState } from "react";
import {
  Input,
  Button,
  Card,
  CardBody,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
  Textarea,
  Progress,
} from "@heroui/react";
import {
  User,
  Users,
  FileUp,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Upload,
  Calendar,
  MapPin,
  Info,
} from "lucide-react";
import { Layout } from "../../components/layout/Layout";
import { Link } from "react-router-dom";
import { UserUtility } from "../../utility";

export function EnrollPage() {
  UserUtility.redirectIfNotLogin();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const StepIndicator = () => (
    <div className="flex flex-col gap-4 mb-10">
      <div className="flex justify-between items-end px-2">
        <div className="space-y-1">
          <p className="text-primary font-bold text-sm uppercase tracking-widest">
            Langkah {step} dari 3
          </p>
          <h2 className="text-2xl font-black text-secondary">
            {step === 1 && "Data Calon Siswa"}
            {step === 2 && "Data Orang Tua / Wali"}
            {step === 3 && "Unggah Dokumen Pendukung"}
          </h2>
        </div>
        <div className="hidden md:block text-secondary/40 font-bold text-4xl italic">
          0{step}
        </div>
      </div>
      <Progress
        aria-label="Enrollment progress"
        value={(step / 3) * 100}
        color="primary"
        className="h-2 shadow-inner"
      />
    </div>
  );

  return (
    <Layout parentClassName="bg-background-light min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {/* FORM CONTAINER */}
        <Card className="shadow-2xl border-none p-4 md:p-8 rounded-[40px]">
          <CardBody>
            <StepIndicator />

            <form className="space-y-8">
              {/* STEP 1: DATA SISWA */}
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
                  <Select
                    label="Pilih Paket Pendidikan"
                    variant="bordered"
                    className="md:col-span-2 font-bold"
                    labelPlacement="outside"
                    placeholder="Pilih jenjang pendidikan"
                  >
                    <SelectItem key="a">Paket A (Setara SD)</SelectItem>
                    <SelectItem key="b">Paket B (Setara SMP)</SelectItem>
                    <SelectItem key="c">Paket C (Setara SMA)</SelectItem>
                  </Select>

                  <Input
                    label="Nama Lengkap Siswa"
                    placeholder="Sesuai Akte Lahir"
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <Input
                    label="NISN"
                    placeholder="Nomor Induk Siswa Nasional"
                    variant="bordered"
                    labelPlacement="outside"
                  />

                  <Input
                    label="Tempat Lahir"
                    placeholder="Kota Kelahiran"
                    variant="bordered"
                    labelPlacement="outside"
                  />
                  <Input
                    label="Tanggal Lahir"
                    type="date"
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={<Calendar size={18} />}
                  />

                  <RadioGroup
                    label="Jenis Kelamin"
                    orientation="horizontal"
                    color="primary"
                  >
                    <Radio value="L">Laki-laki</Radio>
                    <Radio value="P">Perempuan</Radio>
                  </RadioGroup>

                  <Select
                    label="Agama"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Pilih Agama"
                  >
                    <SelectItem key="islam">Islam</SelectItem>
                    <SelectItem key="kristen">Kristen</SelectItem>
                    <SelectItem key="katolik">Katolik</SelectItem>
                    <SelectItem key="hindu">Hindu</SelectItem>
                    <SelectItem key="budha">Budha</SelectItem>
                    <SelectItem key="khonghucu">Khonghucu</SelectItem>
                  </Select>

                  <Input
                    label="Asal Sekolah"
                    placeholder="Nama sekolah sebelumnya"
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                  />
                  <Textarea
                    label="Alamat Lengkap"
                    placeholder="Nama jalan, Blok, No Rumah, RT/RW, Kelurahan, Kecamatan"
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                  />
                </div>
              )}

              {/* STEP 2: DATA ORANG TUA */}
              {step === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
                  <Input
                    label="Nama Lengkap Ayah"
                    placeholder="Masukkan nama ayah"
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={<User size={18} />}
                  />
                  <Input
                    label="Nama Lengkap Ibu"
                    placeholder="Masukkan nama ibu"
                    variant="bordered"
                    labelPlacement="outside"
                    startContent={<User size={18} />}
                  />
                  <Input
                    label="No. Telp / WhatsApp Orang Tua"
                    placeholder="Contoh: 0812..."
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                  />
                  <Input
                    label="Email Aktif"
                    type="email"
                    placeholder="nama@email.com"
                    variant="bordered"
                    labelPlacement="outside"
                    className="md:col-span-2"
                  />
                </div>
              )}

              {/* STEP 3: UPLOAD DOKUMEN */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 flex gap-3 mb-6 italic">
                    <Info size={20} className="text-primary shrink-0" />
                    <p className="text-xs text-secondary/70">
                      Pastikan dokumen dalam format PDF atau Gambar (JPG/PNG)
                      dengan ukuran maksimal 2MB per file.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { label: "Kartu Keluarga", required: true },
                      { label: "Akte Lahir Siswa", required: true },
                      { label: "KTP Orang Tua", required: true },
                      { label: "Passfoto Terkini (3x4)", required: true },
                      { label: "Ijazah Terakhir", required: false },
                      { label: "Rapor Terakhir", required: false },
                    ].map((doc, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-secondary">
                          {doc.label}{" "}
                          {!doc.required && (
                            <span className="text-zinc-400 font-normal">
                              (Opsional)
                            </span>
                          )}
                        </label>
                        <div className="border-2 border-dashed border-zinc-200 hover:border-primary rounded-2xl p-4 transition-all group cursor-pointer bg-zinc-50/50">
                          <input
                            type="file"
                            className="hidden"
                            id={`file-${i}`}
                          />
                          <label
                            htmlFor={`file-${i}`}
                            className="flex items-center gap-3 cursor-pointer"
                          >
                            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:text-primary transition-colors">
                              <Upload size={20} />
                            </div>
                            <span className="text-xs font-medium text-zinc-500">
                              Pilih file...
                            </span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NAVIGATION BUTTONS */}
              <div className="flex justify-between items-center pt-10 border-t border-zinc-100">
                <Button
                  onPress={prevStep}
                  variant="light"
                  isDisabled={step === 1}
                  className="font-bold text-secondary disabled:opacity-0"
                  startContent={<ArrowLeft size={20} />}
                >
                  Kembali
                </Button>

                {step < 3 ? (
                  <Button
                    onPress={nextStep}
                    className="bg-primary text-white font-black px-10 py-7 rounded-2xl shadow-lg shadow-primary/20"
                    endContent={<ArrowRight size={20} />}
                  >
                    Lanjutkan
                  </Button>
                ) : (
                  <Button
                    as={Link}
                    to="/user-details"
                    className="bg-secondary text-white font-black px-10 py-7 rounded-2xl shadow-xl shadow-secondary/30"
                    endContent={<CheckCircle2 size={20} />}
                  >
                    Kirim Pendaftaran
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
