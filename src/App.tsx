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
import { AxiosClient } from "./api/AxiosClient";
import { base_url, LoaderData, UserUtility } from "./utility";
import { KontakPage } from "./pages/kontak";
import { PaymentPage } from "./pages/user/payment";

AxiosClient.BaseURL.instance.set(base_url);

export default function App() {
  const joinAll = (a: { [key: string]: any }, c: { [key: string]: any }) => ({
    ...a,
    ...c,
  });
  // const { theme, setTheme } = useTheme("light");

  async function loaderUserProfile(): Promise<LoaderData> {
    const token = UserUtility.getToken();
    if (!token) {
      return { user: null };
    }
    const [user] = (await Promise.all([
      await AxiosClient.getProfile({
        headers: { authorization: UserUtility.getAuthHeader() },
      }),
    ])) as any;

    return { user };
  }

  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <RootLayoutScrollToTop />,
          children: [
            {
              path: "/",
              element: <HomePage />,
              loader: loaderUserProfile,
            },
            {
              path: "/tentang-kami",
              element: <TentangKami />,
              loader: loaderUserProfile,
            },
            {
              path: "/login",
              element: <LoginPage />,
              loader: loaderUserProfile,
            },
            {
              path: "/register",
              element: <RegisterPage />,
              loader: loaderUserProfile,
            },
            {
              path: "/program",
              element: <ProgramPage />,
              loader: loaderUserProfile,
            },
            {
              path: "/admisi",
              element: <AdmisiPage />,
              loader: loaderUserProfile,
            },
            {
              path: "/kontak",
              element: <KontakPage />,
              loader: loaderUserProfile,
            },
            {
              path: "/enroll",
              element: <EnrollPage />,
              loader: loaderUserProfile,
            },
            {
              path: "/user-details",
              element: <UserDetailsPage />,
              loader: loaderUserProfile,
            },
            {
              path: "/payment",
              element: <PaymentPage />,
              loader: loaderUserProfile,
            },
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
