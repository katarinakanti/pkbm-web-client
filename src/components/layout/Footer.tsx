import { Link } from "react-router";
import { Mail, MapPin } from "lucide-react";

export interface FooterProps {
  noPaddingHorizontal?: boolean;
}

export function Footer(props: FooterProps) {
  return (
    <div
      className={`
      ${
        props.noPaddingHorizontal ? "" : "px-6 xl:px-[14%]"
      } py-8 pb-10 bg-secondary flex flex-col gap-10 text-white z-1
      md:py-12
    `}
    >
      <div
        className={`
        flex flex-col gap-10
        md:flex-row
      `}
      >
        <div
          className={`
          text-white flex flex-col gap-4
          md:flex-1
        `}
        >
          <img className="w-12 object-contain mb-2" src={"/logoBudiman.png"} />
          <div className="mt-[-18px]">PKBM Budiman Drestanta</div>
          {/* SOCIAL MEDIA */}
          {/* <div className="flex items-center gap-4">

            <div className="flex items-center gap-4">
              {[
                [
                  "https://www.svgrepo.com/show/93637/linkedin-logo.svg",
                  "https://www.linkedin.com/company/rs-hj-bunda-halimah-batam/?originalSubdomain=id",
                ],
                [
                  "https://www.svgrepo.com/show/512399/instagram-167.svg",
                  "https://www.instagram.com/rs.bundahalimah/?hl=en",
                ],
              ].map(([icon, href], i: number) => (
                <Link key={i} to={href}>
                  <img className="w-5 object-contain invert" src={icon} />
                </Link>
              ))}
            </div>
            <div>
              <Link to="https://www.youtube.com/@rshjbundahalimah">
                <img
                  className="h-6 object-contain invert"
                  src="https://www.svgrepo.com/show/510359/youtube.svg"
                />
              </Link>
            </div>
          </div> */}
          <div className="flex flex-col gap-6 pt-10">
            <Link to={"/tentang-kami"} className="text-lg font-medium">
              Tentang Kami
            </Link>
            <Link to={"/program"} className="mt-[-18px]">
              Program
            </Link>

            <Link to={"/admisi"} className="mt-[-18px]">
              Admisi
            </Link>
            <Link to={"/kontak"} className="mt-[-18px]">
              Kontak
            </Link>
          </div>
        </div>

        <div
          className={`
          flex flex-col gap-4
          md:flex-[1.5]
        `}
        >
          <div className="text-xl font-medium whitespace-nowrap">
            Lokasi PKBM Budiman Drestanta
          </div>
          <div className="flex flex-col gap-3 text-zinc-100 text-sm">
            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <div className="flex-1">
                Ruko Botania 2 Blok A23 No.1, Batam City
              </div>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.070812451973!2d104.08441897595202!3d1.1091128623003086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d98987a513263d%3A0xd0f2160c56d04d09!2sPKBM%20Budiman%20Drestanta%20Tiyasa!5e0!3m2!1sen!2sid!4v1767028440915!5m2!1sen!2sid"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: 5 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div
          className={`
          flex flex-col gap-4
        `}
        >
          <div className="text-lg font-medium">Apakah kamu ada pertanyaan?</div>
          <a
            // href="https://api.whatsapp.com/send/?phone=6281277653313&text&type=phone_number&app_absent=0"
            className="flex flex-col gap-3 text-zinc-100 text-sm"
          >
            <div className="rounded-full p-3 px-5 bg-[#25D366] flex items-center gap-2 justify-center self-start">
              <img
                className="invert w-5 object-contain"
                src={"https://www.svgrepo.com/show/500461/whatsapp.svg"}
              />
              <div>Hubungi via Whatsapp</div>
            </div>
          </a>
          <div className="flex items-center gap-3 text-sm">
            <Mail size={20} />
            <div className="flex-1">test@mail.com</div>
          </div>
        </div>
      </div>
      <div
        className={`
        flex flex-col gap-5
        md:flex-1
      `}
      >
        <div className="w-full h-px bg-zinc-300" />
        <div className="">
          201 Roomie Studios &copy; 2025 All Rights Reserved
        </div>
      </div>
    </div>
  );
}
