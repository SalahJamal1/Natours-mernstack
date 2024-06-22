import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./ui/Loader";
import Account from "./pages/Account";
import ProtectPage from "./pages/ProtectPage";
import { Getcurrent } from "./hooks/Getcurrent";
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Forgetpassword = lazy(() => import("./pages/Forgetpassword"));
const Overview = lazy(() => import("./pages/Overview"));
const Pagenotfound = lazy(() => import("./pages/Pagenotfound"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Tour = lazy(() => import("./pages/Tour"));

function App() {
  // Getcurrent();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Overview />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "tour/:id",
      element: <Tour />,
    },
    {
      path: "account",
      element: (
        // <ProtectPage>
        <Account />
        // </ProtectPage>
      ),
    },
    {
      path: "forgetpassword",
      element: <Forgetpassword />,
    },
    {
      path: "restpassword/:id",
      element: <ResetPassword />,
    },
    {
      path: "*",
      element: <Pagenotfound />,
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
