import { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { HomePage } from "./pages/homepage";
import { TentangKami } from "./pages/tentang-kami";
import { LoginPage } from "./pages/user/login";
import { RegisterPage } from "./pages/user/register";
import { ProgramPage } from "./pages/program";
import { AdmisiPage } from "./pages/admisi";
import { EnrollPage } from "./pages/user/enroll";
import { UserDetailsPage } from "./pages/user/user-details";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <RootLayoutScrollToTop />,
          children: [
            { path: "/", element: <HomePage /> },
            { path: "/tentang-kami", element: <TentangKami /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/program", element: <ProgramPage /> },
            { path: "/admisi", element: <AdmisiPage /> },
            { path: "/enroll", element: <EnrollPage /> },
            { path: "/user-details", element: <UserDetailsPage /> },
          ],
        },
      ])}
    />
  );
}

function RootLayoutScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return <Outlet />;
}
