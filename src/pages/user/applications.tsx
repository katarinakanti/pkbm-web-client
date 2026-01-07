import {
  Clock,
  User,
  AlertCircle,
  FileText,
  CreditCard,
  ArrowRight,
  Plus,
  XCircle,
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
  status: "rejected" | "payment_pending" | "verifying" | "completed";
  progress: number;
  statusLabel: string;
  statusColor: "warning" | "primary" | "success" | "danger";
  adminNotes?: string;
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
          headers: { authorization: authHeader },
          query: { limit: 100, offset: 0 },
        });

        const applicants = await AxiosClient.userGetUserApplicantsList({
          headers: { authorization: authHeader },
        });
        const applicantsMap = new Map<number, UserApplicant>();
        applicants.forEach((a) => applicantsMap.set(a.id, a));

        const applicationsData = response.data.map(
          (app: Application): ApplicationDisplay => {
            let statusLabel = "Menunggu Verifikasi";
            let statusColor: "warning" | "primary" | "success" | "danger" =
              "warning";
            let progress = 15;
            let currentStatus: ApplicationDisplay["status"] = "verifying";

            // LOGIKA STATUS (Urutan sangat menentukan)
            if (app.status_application === ApplicationStatus.REJECTED) {
              statusLabel = "Ditolak / Perlu Revisi";
              statusColor = "danger";
              progress = 0;
              currentStatus = "rejected";
            } else if (app.payment_status === true) {
              statusLabel = "Pembayaran Selesai";
              statusColor = "success";
              progress = 100;
              currentStatus = "completed";
            } else if (app.status_application === ApplicationStatus.VERIFIED) {
              statusLabel = "Terverifikasi (Menunggu Bayar)";
              statusColor = "primary";
              progress = 60;
              currentStatus = "payment_pending";
            } else if (app.status_application === ApplicationStatus.SUBMITTED) {
              statusLabel = "Berkas Diterima";
              statusColor = "primary";
              progress = 30;
              currentStatus = "verifying";
            }

            let program = "Paket Umum";
            if (app.application_type === ApplicationType.SD)
              program = "Paket A (Setara SD)";
            else if (app.application_type === ApplicationType.SMP)
              program = "Paket B (Setara SMP)";
            else if (app.application_type === ApplicationType.SMA)
              program = "Paket C (Setara SMA)";

            return {
              id: `${app.id}`,
              studentName:
                applicantsMap.get(app.id_user_applicant)?.fullname ||
                "Nama Siswa",
              program,
              date: new Date(app.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
              status: currentStatus,
              progress,
              statusLabel,
              statusColor,
              adminNotes: app.notes,
            };
          }
        );

        setApplications(applicationsData);
      } catch (err: any) {
        setError(err.message || "Gagal memuat data pendaftaran.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <Layout parentClassName="bg-zinc-50/50">
      <div className="max-w-3xl mx-auto px-6 py-16 space-y-8">
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

        {error && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-[24px] flex items-start gap-4">
            <AlertCircle className="text-red-500 shrink-0" size={20} />
            <p className="text-xs text-red-700 font-medium">{error}</p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12 text-zinc-500 font-medium">
            Memuat data pendaftaran...
          </div>
        )}

        {!loading && applications.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-zinc-500 font-medium mb-6">
              Anda belum memiliki pendaftaran siswa.
            </p>
            <Button
              as={Link}
              to="/enroll"
              className="bg-primary text-white font-bold rounded-xl py-6"
              startContent={<Plus size={16} />}
            >
              Buat Pendaftaran Baru
            </Button>
          </div>
        )}

        <div className="space-y-6">
          {applications.map((app) => (
            <Card
              key={app.id}
              className="border border-zinc-200 shadow-sm rounded-[32px] overflow-hidden bg-white"
            >
              <CardBody className="p-0">
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
                    color={app.statusColor}
                    className="font-black text-[10px] uppercase px-3"
                  >
                    {app.statusLabel}
                  </Chip>
                </div>

                <div className="p-8 space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div
                        className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg ${
                          app.status === "rejected"
                            ? "bg-red-500 text-white"
                            : "bg-secondary text-primary"
                        }`}
                      >
                        <User size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-secondary leading-tight">
                          {app.studentName}
                        </h3>
                        <p className="text-sm text-zinc-500 font-medium">
                          {app.program} • {app.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {app.status === "rejected" && app.adminNotes && (
                    <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                      <p className="text-[10px] text-red-400 font-black uppercase mb-1 tracking-widest">
                        Catatan Admin:
                      </p>
                      <p className="text-xs text-red-700 font-bold italic">
                        "{app.adminNotes}"
                      </p>
                    </div>
                  )}

                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                        Progres Tahapan
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          app.status === "rejected"
                            ? "text-red-500"
                            : "text-secondary"
                        }`}
                      >
                        {app.progress}%
                      </span>
                    </div>
                    <Progress
                      value={app.progress}
                      color={app.statusColor}
                      size="sm"
                      className="rounded-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <Button
                      as={Link}
                      to={`/user-details/${app.id}`}
                      className="bg-zinc-100 text-secondary font-bold rounded-xl py-6 hover:bg-zinc-200"
                      endContent={<ArrowRight size={16} />}
                    >
                      Lihat Detail
                    </Button>

                    {app.status === "payment_pending" ? (
                      <Button
                        as={Link}
                        to="/pembayaran"
                        className="bg-primary text-white font-bold rounded-xl py-6 shadow-md shadow-primary/20"
                        startContent={<CreditCard size={16} />}
                      >
                        Bayar Sekarang
                      </Button>
                    ) : app.status === "rejected" ? (
                      <Button
                        as={Link}
                        to={`/edit-application/${app.id}`}
                        className="bg-red-500 text-white font-bold rounded-xl py-6 shadow-md shadow-red-200"
                        startContent={<XCircle size={16} />}
                      >
                        Revisi Berkas
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 bg-zinc-50 rounded-xl px-4 py-3 border border-zinc-100">
                        <Clock size={14} className="text-zinc-400" />
                        <span className="text-xs text-zinc-500 font-medium">
                          {app.status === "completed"
                            ? "Pendaftaran Selesai"
                            : "Sedang Diverifikasi"}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

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
