
import './App.css'
import Login from './component/authentication/Login';

import Home from './component/Home';
import Navbar from './component/Navbar';
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import Register from './component/authentication/Register';

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
  ]);
  return (
    <RouterProvider router={appRouter}>
    
     
    </RouterProvider>
  );
}

export default App
