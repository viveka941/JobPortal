import "./App.css";
import Login from "./component/authentication/Login";

import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./component/authentication/Register";
import TermsofService from "./component/components/TermsofService";
import PrivacyPolicy from "./component/components/PrivacyPolicy";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    { path: "/termsofService", element: <TermsofService /> },
    { path: "PrivacyPolicy", element: <PrivacyPolicy /> },
  ]);
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
