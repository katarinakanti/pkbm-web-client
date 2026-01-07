import { Link, useLoaderData, useNavigate } from "react-router";
import { AlignJustify } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { User } from "../../api/model/table/User";
import { UserUtility } from "../../utility";
import { createPortal } from "react-dom";

export interface HeaderProps {
  noPaddingHorizontal?: boolean;
  showBg?: boolean;
}

export function Header(props: HeaderProps) {
  const [open_sidebar, setOpenSidebar] = useState<boolean>(false);

  const data = useLoaderData();
  // console.log(data)
  const user: User = data?.user;
  const navigate = useNavigate();

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (open_sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open_sidebar]);

  function logout() {
    UserUtility.removeToken();
    window.location.reload();
    // UserUtility.redirectIfNotLogin();
  }

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
      
      {/* DESKTOP MENU - Always visible on desktop */}
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

      {/* DESKTOP USER SECTION */}
      <div className="hidden md:flex items-center gap-3">
        {user && (
          <>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button
                  variant="light"
                  className="text-[15px] font-medium text-primary hover:underline shadow-none bg-transparent"
                >
                  Hi, {user?.fullname}!
                </Button>
              </DropdownTrigger>

              <DropdownMenu aria-label="User menu">
                <DropdownItem
                  key="applications"
                  onPress={() => navigate("/applications")}
                >
                  Applications
                </DropdownItem>

                <DropdownItem
                  key="logout"
                  className="text-danger"
                  onPress={logout}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <div className="h-8 w-px bg-zinc-300" />
            <div onClick={logout} className="cursor-pointer">
              <img className="w-5 object-contain" src={"/logout.svg"} />
            </div>
            <div className="h-8 w-px bg-zinc-300" />
          </>
        )}
        {!user && (
          <Button
            as={Link}
            to={"/login"}
            className="rounded-full bg-primary text-white"
          >
            Login/Register
          </Button>
        )}
      </div>

      {/* MOBILE MENU TOGGLE */}
      <AlignJustify
        onClick={() => setOpenSidebar(true)}
        size={32}
        className="md:hidden cursor-pointer"
      />

      {/* MOBILE SIDEBAR - Using Portal for complete isolation */}
      {open_sidebar && createPortal(
        <div
          onClick={() => setOpenSidebar(false)}
          className="fixed inset-0 z-[9999] bg-black/30 md:hidden"
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed left-0 top-0 bottom-0 w-[80%] bg-white shadow-2xl overflow-y-auto"
            style={{ position: 'fixed' }}
          >
            {/* Mobile Sidebar Header */}
            <div className="p-6 border-b border-zinc-200">
              <img className="object-contain h-9" src={"/logoBudiman.png"} alt="Logo" />
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col gap-2 p-6">
              {[
                { label: "Tentang Kami", path: "/tentang-kami" },
                { label: "Program", path: "/program" },
                { label: "Admisi", path: "/admisi" },
                { label: "Kontak", path: "/kontak" },
              ].map((item) => (
                <Button
                  key={item.path}
                  variant="light"
                  className="font-bold text-secondary hover:text-primary justify-start"
                  onPress={() => {
                    navigate(item.path);
                    setOpenSidebar(false);
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Mobile User Section */}
            <div className="p-6 border-t border-zinc-200">
              {user ? (
                <div className="flex flex-col gap-3 w-full">
                  <div className="text-[15px] font-medium text-primary text-center py-2">
                    Hi, {user?.fullname}!
                  </div>
                  <Button
                    variant="flat"
                    className="w-full"
                    onPress={() => {
                      navigate("/applications");
                      setOpenSidebar(false);
                    }}
                  >
                    Applications
                  </Button>
                  <Button
                    variant="flat"
                    color="danger"
                    className="w-full"
                    onPress={() => {
                      logout();
                      setOpenSidebar(false);
                    }}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  as={Link}
                  to={"/login"}
                  className="rounded-full bg-primary text-white w-full !h-[48px]"
                >
                  Login/Register
                </Button>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* <ThemeSwitcher /> */}
    </div>
  );
}
