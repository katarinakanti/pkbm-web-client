import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AxiosClient } from "../../api/AxiosClient";
import { UserUtility, base_url } from "../../utility";
import { Application } from "../../api/model/table/Application";

import { Card, CardBody, Chip, Button, Divider } from "@heroui/react";
import {
  Timer,
  CheckCircle2,
  MapPin,
  Clock,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  ChevronRight,
  Download,
} from "lucide-react";
import { Layout } from "../../components/layout/Layout";
import { Link } from "react-router-dom";

export function UserDetailsPage() {
  const params = useParams();
  const location = useLocation();

  const [application, setApplication] = useState<Application | null>(null);

  // Contoh Data Review (will be replaced by API data)
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
        // Fetch application and applicants in parallel
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
          // lookup applicant fullname by id_user_applicant
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
            jadwalTatapMuka: "-",
            lokasi: "-",
            email: res.parent_email || "-",
            phone: res.parent_phone || "-",
          });
        }
      } catch (err) {
        console.error("Failed to fetch application or applicants", err);
      }
    };

    // Prefer route param, fallback to query ?id=...
    const idFromParam = params.id;
    if (idFromParam) {
      fetchById(idFromParam);
      return;
    }
    const q = new URLSearchParams(location.search);
    const idFromQuery = q.get("id");
    if (idFromQuery) fetchById(idFromQuery);
  }, [params.id, location.search]);

  // (No countdown used — keep simple for now)

  // Derive status into three explicit states: 'submitted', 'verified', 'approved'
  const displayStatus = application
    ? application.status_application === "SUBMITTED"
      ? "submitted"
      : application.status_application === "VERIFIED"
      ? application.payment_status === true
        ? "approved"
        : "verified"
      : "submitted"
    : "submitted";

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
              displayStatus === "approved"
                ? "success"
                : displayStatus === "verified"
                ? "primary"
                : "warning"
            }
            className="text-white font-bold px-6 py-4 h-10 text-lg uppercase tracking-wider"
          >
            {displayStatus === "approved"
              ? "Diterima"
              : displayStatus === "verified"
              ? "Terverifikasi"
              : "Diajukan"}
          </Chip>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* KIRI: Pengumuman & Jadwal */}
          <div className="md:col-span-2 space-y-8">
            {displayStatus === "submitted" ? (
              <Card className="bg-secondary text-white rounded-[40px] p-4 shadow-2xl overflow-hidden relative border-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                <CardBody className="items-center text-center p-10 space-y-6">
                  <div className="p-4 bg-white/10 rounded-full animate-pulse">
                    <Timer size={48} className="text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Pengumuman Seleksi</h2>
                    <p className="text-white/70">
                      Berkas Anda sedang dalam proses peninjauan oleh tim admin
                      PKBM Budiman Drestanta.
                    </p>
                  </div>
                  {/* <div className="text-4xl md:text-5xl font-black tracking-tighter text-primary bg-white/5 px-8 py-4 rounded-3xl border border-white/10">
                    {formatTime(timeLeft)}
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-bold">
                    Waktu Estimasi Hasil Keluar
                  </p> */}
                </CardBody>
              </Card>
            ) : displayStatus === "verified" ? (
              <Card className="bg-white rounded-[40px] p-4 shadow-xl border-t-8 border-primary overflow-hidden">
                <CardBody className="p-8 md:p-12 space-y-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="bg-primary/10 p-6 rounded-full text-primary">
                      <CheckCircle2 size={64} />
                    </div>
                    <div className="space-y-2 text-center md:text-left">
                      <h2 className="text-3xl font-black text-secondary">
                        Terverifikasi!
                      </h2>
                      <p className="text-secondary/60 font-medium text-lg">
                        Pendaftaran Anda telah terverifikasi. Lanjutkan dengan
                        melunaskan biaya pendaftaran untuk menyelesaikan proses
                        pendaftaran.
                      </p>
                    </div>
                  </div>

                  <Button
                    as={Link}
                    to={`/payment?id=${application?.id}`}
                    className="w-full bg-primary text-white font-black h-16 rounded-2xl text-lg shadow-xl shadow-primary/20"
                    endContent={<ChevronRight size={20} />}
                  >
                    Lunaskan Pembayaran
                  </Button>
                </CardBody>
              </Card>
            ) : (
              <Card className="bg-white rounded-[40px] p-4 shadow-xl border-t-8 border-accent border-none overflow-hidden">
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
                        Anda telah resmi menjadi bagian dari keluarga besar
                        Budiman Drestanta.
                      </p>
                    </div>
                  </div>

                  <Divider />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-background-light p-6 rounded-3xl border border-secondary/5 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <Clock size={20} /> Jadwal Tatap Muka
                      </div>
                      <p className="text-xl font-black text-secondary">
                        {userData.jadwalTatapMuka}
                      </p>
                    </div>
                    <div className="bg-background-light p-6 rounded-3xl border border-secondary/5 space-y-4">
                      <div className="flex items-center gap-2 text-primary font-bold">
                        <MapPin size={20} /> Lokasi Ruangan
                      </div>
                      <p className="text-xl font-black text-secondary">
                        {userData.lokasi}
                      </p>
                    </div>
                  </div>

                  <Button
                    as={Link}
                    to={
                      displayStatus === "approved"
                        ? "#"
                        : displayStatus === "verified"
                        ? "/payment"
                        : "/enroll"
                    }
                    className="w-full bg-secondary text-white font-black h-16 rounded-2xl text-lg shadow-xl shadow-secondary/20"
                    endContent={<Download size={20} />}
                  >
                    {displayStatus === "approved"
                      ? "Unduh Kartu Siswa"
                      : displayStatus === "verified"
                      ? "Lunaskan Biaya Pendaftaran"
                      : "Lengkapi Berkas"}
                  </Button>
                </CardBody>
              </Card>
            )}

            {/* REVIEW DATA YANG DIUPLOAD */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary flex items-center gap-3">
                <FileText className="text-primary" /> Review Data Pendaftaran
              </h3>
              <Card className="border-none shadow-sm rounded-[32px]">
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
                      <p className="text-xs text-secondary/40 font-black uppercase tracking-widest flex items-center gap-2">
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

          {/* KANAN: Sidebar Dokumen */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-secondary">
              Dokumen Terunggah
            </h3>
            <div className="grid gap-3">
              {[
                { label: "Kartu Keluarga", url: application?.kk_url },
                { label: "Akte Lahir", url: application?.akta_lahir_url },
                { label: "KTP Orang Tua", url: application?.ktp_ortu_url },
                { label: "Passfoto", url: application?.photo_url },
              ]
                .filter((d) => d.url)
                .map((doc, i) => {
                  const href = doc.url!.startsWith("http")
                    ? doc.url!
                    : `${base_url.replace(/\/$/, "")}${doc.url}`;
                  return (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      download
                      className="flex items-center justify-between p-4 bg-white rounded-2xl border border-secondary/5 shadow-sm group hover:border-primary transition-colors"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText
                          className="text-secondary/20 group-hover:text-primary transition-colors shrink-0"
                          size={20}
                        />
                        <span className="text-sm font-bold text-secondary/70 truncate">
                          {doc.label}
                        </span>
                      </div>
                      <ChevronRight size={16} className="text-secondary/20" />
                    </a>
                  );
                })}
            </div>

            <div className="p-6 bg-primary/5 rounded-[32px] border border-primary/10">
              <h4 className="font-bold text-secondary text-sm mb-2">
                Bantuan?
              </h4>
              <p className="text-xs text-secondary/60 leading-relaxed mb-4">
                Jika terdapat kesalahan data pada review di samping, segera
                hubungi admin melalui layanan pengaduan.
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

            {/* (removed testing button) */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
