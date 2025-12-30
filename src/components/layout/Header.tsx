import { Link, useLoaderData, useNavigate } from "react-router";
import { AlignJustify, Phone, PhoneCall, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

export interface HeaderProps {
  noPaddingHorizontal?: boolean;
  showBg?: boolean;
}

export function Header(props: HeaderProps) {
  const [open_sidebar, setOpenSidebar] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div
      className={`${props.noPaddingHorizontal ? "" : "px-6 xl:px-[14%]"} ${
        props.showBg
          ? "bg-white shadow-[0px_1px_5px_rgba(0,0,0,.04)]"
          : "bg-transparent"
      } transition transition-all py-4 flex items-center justify-between`}
    >
      {/* LOGO */}
      <Link to={"/"} className="group">
        <div className="flex gap-3 items-center">
          <div className="bg-white p-1.5 rounded-xl shadow-sm transition-transform group-hover:scale-105">
            <img
              className="object-contain h-10 md:h-12"
              src="/logoBudiman.png"
              alt="Logo"
            />
          </div>
          <div
            className={`font-bold leading-tight transition-colors duration-300`}
          >
            <div className="text-xs tracking-[0.2em] opacity-80">YAYASAN</div>
            <div className="text-sm md:text-base">BUDIMAN DRESTANTA</div>
          </div>
        </div>
      </Link>
      <div
        onClick={(e) => {
          setOpenSidebar(false);
        }}
        className={`
          fixed ${
            open_sidebar ? "opacity-100" : "opacity-0 pointer-events-none"
          } left-0 transition transition-all top-0 w-screen h-screen bg-[#0005]
          md:relative md:w-auto md:h-auto md:flex-1 md:flex md:opacity-100 md:pointer-events-auto md:bg-transparent
        `}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`
            ${
              open_sidebar ? "translate-x-0" : "translate-x-[-100%]"
            } transition transition-transform w-[80%] flex flex-col gap-4 h-full overflow-y-auto p-6 py-6 bg-white
            ${
              open_sidebar ? "" : "md:translate-x-0"
            } md:w-auto md:flex-row md:flex-1 md:py-0 md:px-0 md:bg-transparent
          `}
        >
          <Link
            to={"/"}
            className={`
              text-2xl font-medium text-primary
              md:hidden
            `}
          >
            <img className="object-contain h-9" src={"/logoBudiman.png"} />
          </Link>
          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-2">
            {[
              { label: "Tentang Kami", path: "/tentang-kami" },
              { label: "Program", path: "/program" },
              { label: "Admisi", path: "/admisi" },
              { label: "Kontak", path: "/kontak" },
            ].map((item) => (
              <Button
                key={item.path}
                variant="light"
                className={`font-bold transition-colors text-secondary hover:text-primary`}
                onPress={() => navigate(item.path)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          {/* HEADER MOBILE */}
          {/* <div
            className={`
            flex flex-col gap-4 py-4 md:hidden
          `}
          >
            {[
              ["Temukan Dokter", "/doctors"],
              ["Layanan", "/services"],
              ["Artikel", "/articles"],
              ["Karir", "/career"],
              ["Kontak", "/contact"],
              ["Karir", "/career"],
            ].map(([label, href], i: number) => (
              <Link className="text-[15px]" key={i} to={href}>
                {label}
              </Link>
            ))}
          </div> */}
          <div
            className={`
            flex flex-col items-center gap-2
            md:flex-row md:gap-3
          `}
          >
            <Button
              as={Link}
              to={"/login"}
              className={`
                hidden
                md:flex md:rounded-full md:bg-primary md:text-white
              `}
            >
              Login/Register
            </Button>

            <div
              className={`
              w-full
              md:hidden
            `}
            >
              <div className="w-full">
                <Button
                  as={Link}
                  to={"/login"}
                  className="rounded-full bg-primary text-white w-full !h-[48px]"
                >
                  Login/Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AlignJustify
        onClick={() => setOpenSidebar(true)}
        size={32}
        className="md:hidden"
      />
      {/* <ThemeSwitcher /> */}
    </div>
  );
}
