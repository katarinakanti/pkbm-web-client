import {
  Clock,
  User,
  AlertCircle,
  FileText,
  CreditCard,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Button, Card, CardBody, Chip, Progress } from "@heroui/react";
import { Link } from "react-router";
import { Layout } from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import { AxiosClient } from "../../api/AxiosClient";
import { UserUtility } from "../../utility";
import { Application } from "../../api/model/table/Application";
import { UserApplicant } from "../../api/model/table/UserApplicant";
import { ApplicationStatus } from "../../api/model/enum/ApplicationStatus";
import { ApplicationType } from "../../api/model/enum/ApplicationType";

interface ApplicationDisplay {
  id: string;
  studentName: string;
  program: string;
  date: string;
  status: string;
  progress: number;
  statusLabel: string;
  statusColor: "warning" | "primary" | "success" | "danger";
}

export function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        const authHeader = UserUtility.getAuthHeader();
        if (!authHeader) {
          setError("Anda harus login terlebih dahulu");
          setLoading(false);
          return;
        }

        const response = await AxiosClient.userGetUserApplicationsList({
          headers: {
            authorization: authHeader,
          },
          query: {
            limit: 100,
            offset: 0,
          },
        });

        // Fetch user applicants and build a lookup by id
        const applicants = await AxiosClient.userGetUserApplicantsList({
          headers: { authorization: authHeader },
        });
        const applicantsMap = new Map<number, UserApplicant>();
        applicants.forEach((a) => applicantsMap.set(a.id, a));

        const applicationsData = response.data.map(
          (app: Application): ApplicationDisplay => {
            // Determine status label and color based on payment and verification
            let statusLabel = "Menunggu Proses";
            let statusColor: "warning" | "primary" | "success" | "danger" =
              "warning";
            let progress = 25;

            if (app.status_application === ApplicationStatus.SUBMITTED) {
              statusLabel = "Sudah Upload Berkas";
              statusColor = "primary";
              progress = 25;
            } else if (
              app.status_application === ApplicationStatus.VERIFIED &&
              !app.payment_status
            ) {
              statusLabel = "Terverifikasi & Menunggu Pembayaran";
              statusColor = "primary";
              progress = 50;
            } else if (app.payment_status === true) {
              statusLabel = "Pembayaran Selesai";
              statusColor = "success";
              progress = 100;
            }
            //  else if (app.status_application === ApplicationStatus.APPROVED) {
            //   statusLabel = "Terdaftar";
            //   statusColor = "success";
            //   progress = 100;
            // }
            else if (app.status_application === ApplicationStatus.REJECTED) {
              statusLabel = "Ditolak";
              statusColor = "danger";
              progress = 0;
            }

            // Get program name from application type
            let program = "Paket Umum";
            if (app.application_type === ApplicationType.SD) {
              program = "Paket A (Setara SD)";
            } else if (app.application_type === ApplicationType.SMP) {
              program = "Paket B (Setara SMP)";
            } else if (app.application_type === ApplicationType.SMA) {
              program = "Paket C (Setara SMA)";
            }

            return {
              id: `${app.id}`,
              // Use applicants API to get fullname when available
              studentName:
                applicantsMap.get(app.id_user_applicant)?.fullname ||
                "Nama Siswa",
              program,
              date: new Date(app.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              status:
                app.payment_status === false ? "payment_pending" : "verifying",
              progress,
              statusLabel,
              statusColor,
            };
          }
        );

        setApplications(applicationsData);
      } catch (err: any) {
        console.error("Error fetching applications:", err);
        setError(
          err.message || "Gagal memuat data pendaftaran. Silakan coba lagi."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Layout parentClassName="bg-zinc-50/50">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
        {/* TOP BAR: Title & Action */}
        <div className="flex items-center justify-between border-b border-zinc-200 pb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-secondary tracking-tight">
              Pendaftaran <span className="text-primary">Siswa</span>
            </h1>
            <p className="text-zinc-500 text-sm font-medium">
              Kelola dan pantau progres belajar anak Anda.
            </p>
          </div>
          <Button
            as={Link}
            to="/enroll"
            isIconOnly
            className="bg-primary text-white rounded-2xl shadow-lg shadow-primary/20"
          >
            <Plus size={24} />
          </Button>
        </div>

        {/* ERROR STATE */}
        {error && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-[24px] flex items-start gap-4">
            <AlertCircle className="text-red-500 shrink-0" size={20} />
            <p className="text-xs text-red-700 leading-relaxed font-medium">
              {error}
            </p>
          </div>
        )}

        {/* LOADING STATE */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-zinc-500 font-medium">
              Memuat data pendaftaran...
            </p>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && applications.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-zinc-500 font-medium mb-6">
              Anda belum memiliki pendaftaran siswa.
            </p>
            <Button
              as={Link}
              to="/daftar"
              className="bg-primary text-white font-bold rounded-xl py-6"
              startContent={<Plus size={16} />}
            >
              Buat Pendaftaran Baru
            </Button>
          </div>
        )}

        {/* LIST OF APPLICATIONS */}
        <div className="space-y-6">
          {applications.map((app) => (
            <Card
              key={app.id}
              className="border border-zinc-200 shadow-sm rounded-[32px] overflow-hidden bg-white"
            >
              <CardBody className="p-0">
                {/* Header Kartu: ID & Status */}
                <div className="px-8 py-4 bg-zinc-50/80 border-b border-zinc-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-zinc-400" />
                    <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                      ID: {app.id}
                    </span>
                  </div>
                  <Chip
                    size="sm"
                    variant="flat"
                    color={app.statusColor as any}
                    className="font-black text-[10px] uppercase px-3 border-none"
                  >
                    {app.statusLabel}
                  </Chip>
                </div>

                <div className="p-8 space-y-8">
                  {/* Info Utama */}
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center text-primary shadow-lg">
                        <User size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary leading-tight">
                          {app.studentName}
                        </h3>
                        <p className="text-sm text-zinc-500 font-medium">
                          {app.program}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Progress Ringkas */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        Progres Tahapan
                      </span>
                      <span className="text-xs font-bold text-secondary">
                        {app.progress}%
                      </span>
                    </div>
                    <Progress
                      value={app.progress}
                      color={app.statusColor as any}
                      size="sm"
                      className="rounded-full"
                    />
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {/* Tombol ke Detail (UTAMA) */}
                    <Button
                      as={Link}
                      to={`/user-details/${app.id}`}
                      className="bg-zinc-100 text-secondary font-bold rounded-xl py-6 hover:bg-zinc-200 transition-colors"
                      endContent={<ArrowRight size={16} />}
                    >
                      Lihat Detail
                    </Button>

                    {/* Tombol Aksi Cepat (Kondisional) */}
                    {app.status === "payment_pending" ? (
                      <Button
                        as={Link}
                        to="/pembayaran"
                        className="bg-primary text-white font-bold rounded-xl py-6 shadow-md"
                        startContent={<CreditCard size={16} />}
                      >
                        Bayar Sekarang
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 bg-zinc-50 rounded-xl px-4 py-3 border border-zinc-100">
                        <Clock size={14} className="text-zinc-400" />
                        <span className="text-xs text-zinc-500 font-medium">
                          Verifikasi Berjalan
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* HELP FOOTER */}
        <div className="p-6 bg-white border border-zinc-200 rounded-[24px] flex items-start gap-4">
          <AlertCircle className="text-primary shrink-0" size={20} />
          <p className="text-xs text-zinc-500 leading-relaxed font-medium">
            Ingin membatalkan pendaftaran? Hubungi{" "}
            <Link to="/kontak" className="text-secondary font-black underline">
              Admin
            </Link>{" "}
            dengan melampirkan ID Pendaftaran Anda.
          </p>
        </div>
      </div>
    </Layout>
  );
}
