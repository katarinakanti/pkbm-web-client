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
import { ApplicationsPage } from "./pages/user/applications";
// import { UpdateApplicationPage } from "./pages/user/update-application";

AxiosClient.BaseURL.instance.set(base_url);

export default function App() {
  // const { theme, setTheme } = useTheme("light");

  async function loaderUserProfile(): Promise<LoaderData> {
    const token = UserUtility.getToken();
    if (!token) {
      return { user: null };
    }
    
    try {
      const [user] = (await Promise.all([
        await AxiosClient.getProfile({
          headers: { authorization: UserUtility.getAuthHeader() },
        }),
      ])) as any;

      return { user };
    } catch (err: any) {
      // If JWT is malformed or invalid, clear the token and return null
      if (err?.response?.status === 401 || err?.response?.status === 500) {
        console.error('Invalid token, clearing auth:', err?.response?.data);
        UserUtility.removeToken();
      }
      return { user: null };
    }
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
              path: "/applications",
              element: <ApplicationsPage />,
              loader: loaderUserProfile,
            },
            {
              path: "/user-details/:id",
              element: <UserDetailsPage />,
              loader: loaderUserProfile,
            },
            // {
            //   path: "/update-application/:id",
            //   element: <UpdateApplicationPage />,
            //   loader: loaderUserProfile,
            // },
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
