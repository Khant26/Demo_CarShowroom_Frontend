import { createBrowserRouter } from "react-router"
import App from "../pages/App"
import Layout from "../Layout"
import BrandDetails from "../components/BrandDetails"
import CarDetails from "../components/CarDetails"

let router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        path: "/",
        Component: App,
      },
      {
        path: "/brands",
        Component: BrandDetails,
      },
      {
        path: "/cars/:id",
        Component: CarDetails,
      },
    ],
  }
])

export default router