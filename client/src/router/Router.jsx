import { createBrowserRouter } from "react-router-dom";
import Home from "../views/Home";
import DetailPage from "../views/DetailPage";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detail/:id",
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
