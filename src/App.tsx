import { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { HomePage } from "./pages/homepage";

export default function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          element: <RootLayoutScrollToTop />,
          children: [{ path: "/", element: <HomePage /> }],
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
