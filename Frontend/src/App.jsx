import "./App.css";
import Login from "./component/authentication/Login";

import Home from "./component/Home";
import Navbar from "./component/Navbar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./component/authentication/Register";
import TermsofService from "./component/components/TermsofService";
import PrivacyPolicy from "./component/components/PrivacyPolicy";
import Jobs from "./component/components/Jobs";
import Browse from "./component/components/Browse";
import UserProfileShow from "./component/authentication/UserProfileShow";

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
    {
      path:"/jobs",
      element:<Jobs/>
    },{
      path:"/browse",
      element:<Browse/>
    },{
      path:"/profile",
      element:<UserProfileShow/>
    }
  ]);
  return <RouterProvider router={appRouter}></RouterProvider>;
}

export default App;
