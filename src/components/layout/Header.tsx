import { Link, useLoaderData, useNavigate } from "react-router";
import {
  AlignJustify,
  X,
  User as UserIcon,
  LogOut,
  FileText,
  User2,
} from "lucide-react";
import { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { User } from "../../api/model/table/User";
import { UserUtility } from "../../utility";

export interface HeaderProps {
  noPaddingHorizontal?: boolean;
  showBg?: boolean;
}

export function Header(props: HeaderProps) {
  const [open_sidebar, setOpenSidebar] = useState<boolean>(false);

  const data = useLoaderData();
  const user: User = (data as any)?.user;
  const navigate = useNavigate();

  function logout() {
    UserUtility.removeToken();
    window.location.reload();
  }

  const menuItems = [
    { label: "Tentang Kami", path: "/tentang-kami" },
    { label: "Program", path: "/program" },
    { label: "Admisi", path: "/admisi" },
    { label: "Kontak", path: "/kontak" },
  ];

  return (
    <div
      className={`${props.noPaddingHorizontal ? "" : "px-6 xl:px-[14%]"} ${
        props.showBg
          ? "bg-white shadow-[0px_1px_5px_rgba(0,0,0,.04)]"
          : "bg-transparent"
      } sticky top-0 z-50 transition-all py-4 flex items-center justify-between`}
    >
      {/* LOGO */}
      <Link to={"/"} className="group z-[51]">
        <div className="flex gap-3 items-center">
          <div className="bg-white p-1.5 rounded-xl shadow-sm transition-transform group-hover:scale-105">
            <img
              className="object-contain h-10 md:h-12"
              src="/logoBudiman.png"
              alt="Logo"
            />
          </div>
          <div className="font-bold leading-tight">
            <div className="text-[10px] tracking-[0.2em] opacity-80 uppercase text-secondary">
              Yayasan
            </div>
            <div className="text-sm md:text-base text-secondary">
              BUDIMAN DRESTANTA
            </div>
          </div>
        </div>
      </Link>

      {/* OVERLAY MOBILE */}
      <div
        onClick={() => setOpenSidebar(false)}
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-[60] md:hidden ${
          open_sidebar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* SIDEBAR / MENU CONTAINER */}
      <div
        className={`
          fixed md:relative top-0 left-0 h-screen md:h-auto w-[280px] md:w-auto 
          bg-white md:bg-transparent z-[61] md:z-auto transition-transform duration-300
          ${
            open_sidebar
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
          flex flex-col md:flex-row md:items-center md:flex-1
        `}
      >
        <div className="p-6 flex justify-between items-center md:hidden border-b border-zinc-100">
          <img
            className="h-8 object-contain"
            src="/logoBudiman.png"
            alt="Logo"
          />
          <Button
            isIconOnly
            variant="light"
            onPress={() => setOpenSidebar(false)}
          >
            <X size={24} />
          </Button>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex flex-col md:flex-row md:flex-1 md:justify-center p-6 md:p-0 gap-2 md:gap-1">
          {menuItems.map((item) => (
            <Button
              key={item.path}
              variant="light"
              className="font-bold text-secondary hover:text-primary justify-start md:justify-center h-12 md:h-10"
              onPress={() => {
                navigate(item.path);
                setOpenSidebar(false);
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>

        {/* AUTH SECTION */}
        <div className="mt-auto md:mt-0 p-6 md:p-0 border-t md:border-none border-zinc-100">
          {user ? (
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Desktop View (Laptop) - KEMBALI KE ASLI */}
              <div className="hidden md:flex items-center gap-3">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button
                      variant="light"
                      className="font-bold text-primary bg-transparent shadow-none"
                      startContent={<User2 size={18} />}
                    >
                      Hi, {user.fullname?.split(" ")[0]}!
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="User Menu">
                    <DropdownItem
                      key="apps"
                      startContent={<FileText size={16} />}
                      onPress={() => navigate("/applications")}
                    >
                      Pendaftaran Saya
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

                <div className="h-8 w-px bg-zinc-300" />

                {/* TOMBOL LOGOUT ASLI (TANPA MERAH) */}
                <div
                  onClick={logout}
                  className="cursor-pointer transition-opacity hover:opacity-60"
                >
                  <img
                    className="w-5 object-contain"
                    src={"/logout.svg"}
                    alt="logout"
                  />
                </div>

                <div className="h-8 w-px bg-zinc-300" />
              </div>

              {/* Mobile Profile Info */}
              <div className="md:hidden flex items-center gap-3 mb-2 px-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <UserIcon size={20} />
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">
                    {user.fullname}
                  </p>
                </div>
              </div>

              {/* Mobile Action Buttons */}
              <div className="flex flex-col gap-2 md:hidden">
                <Button
                  className="bg-zinc-100 text-secondary font-bold justify-start"
                  startContent={<FileText size={18} />}
                  onPress={() => {
                    navigate("/applications");
                    setOpenSidebar(false);
                  }}
                >
                  Pendaftaran Saya
                </Button>
                <Button
                  variant="flat"
                  color="danger"
                  className="font-bold justify-start text-secondary"
                  startContent={<LogOut size={18} />}
                  onPress={logout}
                >
                  Keluar
                </Button>
              </div>
            </div>
          ) : (
            <Button
              as={Link}
              to="/login"
              color="primary"
              className="w-full md:w-auto font-bold rounded-xl md:rounded-full px-8"
              onPress={() => setOpenSidebar(false)}
            >
              Login / Register
            </Button>
          )}
        </div>
      </div>

      <Button
        isIconOnly
        variant="light"
        className="md:hidden"
        onPress={() => setOpenSidebar(true)}
      >
        <AlignJustify size={28} className="text-secondary" />
      </Button>
    </div>
  );
}
