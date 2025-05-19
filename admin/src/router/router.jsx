import LoginPage from "../views/LoginPage";
import Dashboard from "../views/Dashboard";
import { createBrowserRouter, redirect } from "react-router-dom";
import Categories from "../views/Categories";
import Layout from "../components/Layout";
import RegisterAdmin from "../views/RegisterAdmin";
import CreateProduct from "../components/AddProductPopup";
import ImagesPopup from "../components/ImagesPopup";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader : () => {
      if(!localStorage.access_token) {
        return redirect("/login")
      }
      return null
    },
    children : [
        {
            path: "/",
            element: <Dashboard />,
        },
        {
          path : '/categories',
          element : <Categories/>
        },
        {
            path : '/register',
            element : <RegisterAdmin/>
        },
      ]
  },
  {
    loader : () => {
      if(localStorage.access_token) {
        return redirect("/")
      }
      return null
    },
    children : [
      {
        path : '/login',
        element : <LoginPage/>
      },
    ]
  },
]);

export default router