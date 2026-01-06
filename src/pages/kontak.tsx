import {
  Mail,
  MapPin,
  Clock,
  Send,
  Facebook,
  ExternalLink,
} from "lucide-react";
import { Layout } from "../components/layout/Layout";
import { Button, Card, CardBody, Input, Textarea } from "@heroui/react";
import { Link } from "react-router";
import { DaftarSekarang } from "../components/DaftarSekarang";

export function KontakPage() {
  const contactData = {
    whatsapp: "628117778132",
    whatsappDisplay: "0811 777 8132",
    email: "info.yayasanbdt@gmail.com",
    address: "Ruko Botania 2 Blok A23 No.1, Batam City",
    facebook: "https://web.facebook.com/profile.php?id=100082845901246",
    mapsUrl:
      "https://www.google.com/maps/place/PKBM+Budiman+Drestanta+Tiyasa/@1.1091129,104.084419,17z/data=!3m1!4b1!4m6!3m5!1s0x31d98987a513263d:0xd0f2160c56d04d09!8m2!3d1.1091075!4d104.0869939!16s%2Fg%2F11sw48m9rc?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
  };

  return (
    <Layout parentClassName="flex flex-col bg-background-light">
      <div className="flex flex-col gap-12 pb-20">
        {/* HERO SECTION - Tighter & More Focused */}
        <div className="relative h-[350px] w-full flex items-center justify-center overflow-hidden rounded-b-[60px] shadow-2xl">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/class1.png"
            alt="PKBM Budiman"
          />
          <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm" />
          <div className="relative z-10 text-center text-white px-6 space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold">
              Butuh <span className="text-primary">Bantuan?</span>
            </h1>
            <p className="text-lg opacity-80">
              Tim kami siap melayani pendaftaran dan konsultasi pendidikan Anda.
            </p>
          </div>
        </div>

        {/* PRIMARY CALL TO ACTION: WHATSAPP FOCUS */}
        <div className="container mx-auto px-6 -mt-24 relative z-30">
          <Card className="bg-white border-none shadow-2xl rounded-[40px] p-2">
            <CardBody className="flex flex-col md:flex-row items-center justify-between p-8 gap-8">
              <div className="flex items-center gap-6">
                <div className="bg-[#25D366] p-5 rounded-3xl shadow-lg shadow-green-500/30">
                  <img
                    className="w-12 h-12 brightness-0 invert"
                    src="https://www.svgrepo.com/show/500461/whatsapp.svg"
                    alt="WA"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-secondary">
                    Konsultasi via WhatsApp
                  </h2>
                  <p className="text-secondary/60 font-medium">
                    Respon cepat setiap jam kerja (08:00 - 16:00)
                  </p>
                </div>
              </div>
              <Button
                as={Link}
                to={`https://wa.me/${contactData.whatsapp}`}
                size="lg"
                className="bg-[#25D366] text-white font-bold rounded-full px-12 py-8 text-xl shadow-xl hover:scale-105 transition-transform w-full md:w-auto"
              >
                Chat Sekarang
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* INTERACTIVE MAP SECTION - Full Width Focus */}
        <div className="container mx-auto px-6 grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-3xl font-extrabold text-secondary flex items-center gap-3">
                <MapPin className="text-primary" size={32} />
                Lokasi Kampus
              </h3>
              <Button
                as={Link}
                to={contactData.mapsUrl}
                variant="light"
                className="text-primary font-bold"
                endContent={<ExternalLink size={16} />}
              >
                Buka di Google Maps
              </Button>
            </div>
            <div className="h-[450px] w-full rounded-[50px] overflow-hidden shadow-2xl border-8 border-white">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.070812451973!2d104.08441897595202!3d1.1091128623003086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98987a513263d%3A0xd0f2160c56d04d09!2sPKBM%20Budiman%20Drestanta%20Tiyasa!5e0!3m2!1sen!2sid!4v1767028440915!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Google Maps Location"
              />
            </div>
            <Card className="bg-secondary p-4 rounded-[30px] border-none text-white">
              <CardBody className="flex flex-row items-center gap-4">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <MapPin size={24} className="text-primary" />
                </div>
                <p className="font-medium">{contactData.address}</p>
              </CardBody>
            </Card>
          </div>

          {/* SECONDARY CONTACT DETAILS */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-secondary px-2">
                Informasi Lainnya
              </h3>

              <div className="grid gap-4">
                <Card className="border-none bg-white shadow-lg rounded-3xl hover:border-primary border-2 border-transparent transition-all">
                  <CardBody className="flex flex-row items-center gap-5 p-6">
                    <div className="bg-primary/10 p-4 rounded-2xl text-primary font-bold">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-secondary/40 uppercase tracking-widest">
                        Email Resmi
                      </p>
                      <p className="font-bold text-secondary">
                        {contactData.email}
                      </p>
                    </div>
                  </CardBody>
                </Card>

                <Card className="border-none bg-white shadow-lg rounded-3xl">
                  <CardBody className="flex flex-row items-center gap-5 p-6">
                    <div className="bg-accent/10 p-4 rounded-2xl text-accent">
                      <Clock size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-secondary/40 uppercase tracking-widest">
                        Jam Kerja
                      </p>
                      <p className="font-bold text-secondary">
                        Senin - Jumat | 08:00 - 16:00
                      </p>
                    </div>
                  </CardBody>
                </Card>

                <Card className="border-none bg-white shadow-lg rounded-3xl">
                  <CardBody className="flex flex-row items-center gap-5 p-6">
                    <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-500">
                      <Facebook size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-secondary/40 uppercase tracking-widest">
                        Facebook
                      </p>
                      <Link
                        to={contactData.facebook}
                        className="font-bold text-secondary hover:text-primary transition-colors"
                      >
                        PKBM Budiman Drestanta
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <DaftarSekarang />
      </div>
    </Layout>
  );
}
