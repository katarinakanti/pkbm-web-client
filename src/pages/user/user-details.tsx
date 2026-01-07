import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AxiosClient } from "../../api/AxiosClient";
import { UserUtility, base_url } from "../../utility";
import { Application } from "../../api/model/table/Application";

import { Card, CardBody, Chip, Button, Divider } from "@heroui/react";
import {
  Timer,
  CheckCircle2,
  XCircle,
  MapPin,
  Clock,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  ChevronRight,
  Download,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { Layout } from "../../components/layout/Layout";
import { Link } from "react-router-dom";

export function UserDetailsPage() {
  const params = useParams();
  const location = useLocation();

  const [application, setApplication] = useState<Application | null>(null);
  const [userData, setUserData] = useState({
    nama: "-",
    paket: "-",
    nisn: "-",
    jadwalTatapMuka: "-",
    lokasi: "-",
    email: "-",
    phone: "-",
  });

  useEffect(() => {
    const fetchById = async (idStr?: string | null) => {
      if (!idStr) return;
      const id = Number(idStr);
      if (!id) return;

      const authHeader = UserUtility.getAuthHeader();
      if (!authHeader) return;

      try {
        const [res, applicants] = await Promise.all([
          AxiosClient.userGetUserApplicationById({
            headers: { authorization: authHeader },
            path: { id },
          }),
          AxiosClient.userGetUserApplicantsList({
            headers: { authorization: authHeader },
          }),
        ]);

        if (res) {
          setApplication(res);
          const found = applicants.find((a) => a.id === res.id_user_applicant);
          const fullname =
            found?.fullname || res.otm_id_user_applicant?.fullname || "-";

          setUserData({
            nama: fullname,
            paket:
              res.application_type === "SD"
                ? "Paket A (Setara SD)"
                : res.application_type === "SMP"
                ? "Paket B (Setara SMP)"
                : res.application_type === "SMA"
                ? "Paket C (Setara SMA)"
                : "-",
            nisn: res.nisn || "-",
            jadwalTatapMuka: "Akan diinfokan", // Contoh field jadwal
            lokasi: "Kampus Utama", // Contoh field lokasi
            email: res.parent_email || "-",
            phone: res.parent_phone || "-",
          });
        }
      } catch (err) {
        console.error("Failed to fetch application", err);
      }
    };

    const idFromParam = params.id;
    if (idFromParam) {
      fetchById(idFromParam);
      return;
    }
    const q = new URLSearchParams(location.search);
    const idFromQuery = q.get("id");
    if (idFromQuery) fetchById(idFromQuery);
  }, [params.id, location.search]);

  // DERIVE STATUS LOGIC (Urutan Sangat Penting)
  const getStatus = () => {
    if (!application) return "submitted";

    // 1. REJECTED: Jika status aplikasi ditolak OR verifikasi pembayaran ditolak
    if (
      application.status_application === "REJECTED" ||
      application.payment_verification_status === false
    ) {
      return "rejected";
    }
    // 2. ACCEPTED: Jika pembayaran sudah diverifikasi admin (TRUE)
    if (application.payment_verification_status === true) {
      return "accepted";
    }
    // 3. WAITING VERIFICATION: User sudah upload bukti (payment_status true) tapi admin belum verifikasi (null)
    if (
      application.payment_status === true &&
      (application.payment_verification_status === null ||
        application.payment_verification_status === undefined)
    ) {
      return "payment_pending_verification";
    }
    // 4. VERIFIED: Berkas oke, tapi user belum bayar/upload bukti
    if (application.status_application === "VERIFIED") {
      return "verified";
    }
    // 5. DEFAULT: Baru upload berkas (waiting announcement)
    return "submitted";
  };

  const displayStatus = getStatus();

  return (
    <Layout parentClassName="bg-background-light min-h-screen">
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* HEADER STATUS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
          <div className="space-y-2 text-center md:text-left">
            <h1 className="text-3xl font-black text-secondary">Portal Siswa</h1>
            <p className="text-secondary/60 font-medium">
              ID Pendaftaran: {application ? `#${application.id}` : "-"}
            </p>
          </div>
          <Chip
            variant="shadow"
            color={
              displayStatus === "accepted"
                ? "success"
                : displayStatus === "rejected"
                ? "danger"
                : displayStatus === "submitted"
                ? "warning"
                : "primary"
            }
            className="text-white font-bold px-6 py-4 h-10 text-lg uppercase tracking-wider"
          >
            {displayStatus === "accepted"
              ? "Diterima"
              : displayStatus === "payment_pending_verification"
              ? "Verifikasi Bayar"
              : displayStatus === "verified"
              ? "Terverifikasi"
              : displayStatus === "rejected"
              ? "Ditolak / Revisi"
              : "Diajukan"}
          </Chip>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* CASE 1: REJECTED */}
            {displayStatus === "rejected" && (
              <Card className="bg-white rounded-[40px] p-4 shadow-xl border-t-8 border-red-500 overflow-hidden">
                <CardBody className="p-8 md:p-12 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="bg-red-50 p-6 rounded-full text-red-500">
                      <XCircle size={64} />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-secondary">
                        Perlu Perbaikan
                      </h2>
                      <p className="text-secondary/60 font-medium text-lg">
                        Ada data atau bukti pembayaran yang tidak sesuai.
                      </p>
                    </div>
                  </div>
                  {application?.notes && (
                    <div className="p-6 bg-red-50 border border-red-100 rounded-3xl">
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-1">
                        Catatan Admin:
                      </p>
                      <p className="text-red-700 font-bold italic text-lg leading-relaxed">
                        "{application.notes}"
                      </p>
                    </div>
                  )}
                  <Button
                    as={Link}
                    to={
                      application
                        ? `/update-application/${application.id}`
                        : "/update-application"
                    }
                    className="w-full bg-red-500 text-white font-black h-16 rounded-2xl text-lg shadow-xl shadow-red-200"
                    endContent={<ChevronRight size={20} />}
                  >
                    Perbaiki Sekarang
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* CASE 2: SUBMITTED (Waiting Announcement) */}
            {displayStatus === "submitted" && (
              <Card className="bg-secondary text-white rounded-[40px] p-4 shadow-2xl overflow-hidden relative border-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                <CardBody className="items-center text-center p-10 space-y-6">
                  <div className="p-4 bg-white/10 rounded-full animate-pulse">
                    <Timer size={48} className="text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Menunggu Pengumuman</h2>
                    <p className="text-white/70">
                      Berkas pendaftaran Anda sedang dalam tahap seleksi
                      administrasi oleh tim PKBM.
                    </p>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* CASE 3: VERIFIED (Needs Payment) */}
            {displayStatus === "verified" && (
              <Card className="bg-white rounded-[40px] p-4 shadow-xl border-t-8 border-primary overflow-hidden">
                <CardBody className="p-8 md:p-12 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="bg-primary/10 p-6 rounded-full text-primary">
                      <CreditCard size={64} />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-secondary">
                        Berkas Terverifikasi!
                      </h2>
                      <p className="text-secondary/60 font-medium text-lg">
                        Langkah terakhir: Silakan lakukan pembayaran biaya
                        pendaftaran untuk menjadi siswa resmi.
                      </p>
                    </div>
                  </div>
                  <Button
                    as={Link}
                    to={`/payment?id=${application?.id}`}
                    className="w-full bg-primary text-white font-black h-16 rounded-2xl text-lg shadow-xl shadow-primary/20"
                    endContent={<ChevronRight size={20} />}
                  >
                    Bayar Sekarang
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* CASE 4: PAYMENT PENDING VERIFICATION */}
            {displayStatus === "payment_pending_verification" && (
              <Card className="bg-white rounded-[40px] p-4 shadow-xl border-t-8 border-warning overflow-hidden">
                <CardBody className="p-8 md:p-12 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="bg-warning/10 p-6 rounded-full text-warning">
                      <Timer size={64} />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-secondary">
                        Verifikasi Pembayaran
                      </h2>
                      <p className="text-secondary/60 font-medium text-lg">
                        Bukti pembayaran telah kami terima. Admin akan
                        memverifikasi dalam waktu maksimal 1x24 jam.
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-zinc-50 rounded-2xl flex items-center gap-3">
                    <AlertCircle size={20} className="text-zinc-400" />
                    <p className="text-sm text-zinc-500 font-medium">
                      Mohon cek halaman ini secara berkala untuk info
                      selanjutnya.
                    </p>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* CASE 5: ACCEPTED / FINAL */}
            {displayStatus === "accepted" && (
              <Card className="bg-white rounded-[40px] p-4 shadow-xl border-t-8 border-accent overflow-hidden">
                <CardBody className="p-8 md:p-12 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="bg-accent/10 p-6 rounded-full text-accent">
                      <CheckCircle2 size={64} />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-secondary">
                        Selamat, {userData.nama}!
                      </h2>
                      <p className="text-secondary/60 font-medium text-lg">
                        Anda telah resmi menjadi bagian dari keluarga besar PKBM
                        Budiman Drestanta.
                      </p>
                    </div>
                  </div>
                  <Divider />
                  {/* <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background-light p-6 rounded-3xl border border-secondary/5 space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <Clock size={18} /> Jadwal Belajar
                      </div>
                      <p className="text-xl font-black text-secondary">
                        {userData.jadwalTatapMuka}
                      </p>
                    </div>
                    <div className="bg-background-light p-6 rounded-3xl border border-secondary/5 space-y-2">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <MapPin size={18} /> Lokasi
                      </div>
                      <p className="text-xl font-black text-secondary">
                        {userData.lokasi}
                      </p>
                    </div>
                  </div> */}
                  <Button
                    className="w-full bg-secondary text-white font-black h-16 rounded-2xl text-lg shadow-xl shadow-secondary/20"
                    endContent={<Download size={20} />}
                  >
                    Unduh Kartu Siswa
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* REVIEW DATA SECTION */}
            <div className="space-y-6 pt-4">
              <h3 className="text-2xl font-bold text-secondary flex items-center gap-3">
                <FileText className="text-primary" /> Data Pendaftaran
              </h3>
              <Card className="border-none shadow-sm rounded-[32px] bg-white">
                <CardBody className="p-8 grid md:grid-cols-2 gap-8">
                  {[
                    {
                      icon: <User size={18} />,
                      label: "Nama Lengkap",
                      value: userData.nama,
                    },
                    {
                      icon: <Calendar size={18} />,
                      label: "Program Pilihan",
                      value: userData.paket,
                    },
                    {
                      icon: <Mail size={18} />,
                      label: "Email",
                      value: userData.email,
                    },
                    {
                      icon: <Phone size={18} />,
                      label: "No. Telp",
                      value: userData.phone,
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-[10px] text-secondary/40 font-black uppercase tracking-widest flex items-center gap-2">
                        {item.icon} {item.label}
                      </p>
                      <p className="text-secondary font-bold text-lg">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </CardBody>
              </Card>
            </div>
          </div>

          {/* SIDEBAR DOKUMEN */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-secondary">Dokumen</h3>
            <div className="grid gap-3">
              {[
                { label: "Kartu Keluarga", url: application?.kk_url },
                { label: "Akte Lahir", url: application?.akta_lahir_url },
                { label: "KTP Orang Tua", url: application?.ktp_ortu_url },
                { label: "Passfoto", url: application?.photo_url },
                { label: "Selfie", url: application?.selfie_url },
                {
                  label: "Ijazah Terakhir",
                  url: application?.ijazah_terakhir_url,
                },
                { label: "Raport", url: application?.raport_url },
                { label: "Surat Pindah", url: application?.surat_pindah_url },
              ]
                .filter((d) => d.url)
                .map((doc, i) => (
                  <a
                    key={i}
                    href={
                      doc.url!.startsWith("http")
                        ? doc.url!
                        : `${base_url}${doc.url}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-2xl border border-secondary/5 shadow-sm group hover:border-primary transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText
                        className="text-secondary/20 group-hover:text-primary shrink-0"
                        size={20}
                      />
                      <span className="text-sm font-bold text-secondary/70 truncate">
                        {doc.label}
                      </span>
                    </div>
                    <ChevronRight size={16} className="text-secondary/20" />
                  </a>
                ))}
            </div>
            <div className="p-6 bg-primary/5 rounded-[32px] border border-primary/10">
              <h4 className="font-bold text-secondary text-sm mb-2">
                Bantuan?
              </h4>
              <p className="text-xs text-secondary/60 leading-relaxed mb-4">
                Hubungi admin PKBM jika ada kesalahan data.
              </p>
              <Button
                as={Link}
                to="https://wa.me/628117778132"
                size="sm"
                variant="flat"
                color="primary"
                className="font-bold w-full rounded-xl"
              >
                Chat Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
