import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import HomePage from "./pages/home/HomePage";
import BuyMinersPage from "./pages/BuyMiners/BuyMinersPage";
import HostMiningPage from "./pages/hostMining/HostMiningPage";
import MinerRepairPage from "./pages/MinerRepair/MinerRepairPage";
import ErrorPage from "./pages/error/ErrorPage";
import AdminLayout from "./pages/admin/AdminLayout";
import DashboardPage from "./pages/admin/Dashboard/DashboardPage";
import AdminProductPage from "./pages/admin/Products/AdminProductPage";
import AddNewProduct from "./pages/admin/Products/AddNewProduct";
import SingleProductPage from "./pages/admin/Products/SingleProductPage";
import AuthLayout from "./pages/auth/AuthLayout";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import EditProduct from "./pages/admin/Products/EditProduct";
import ResetPassword from "./pages/auth/ResetPassword";
import AdminBlogPage from "./pages/admin/blog/AdminBlogPage";
import BlogPage from "./pages/blogs/BlogPage";
import SingleBlogPage from "./pages/blogs/SingleBlogPage";
import AddNewBlog from "./pages/admin/blog/AddNewBlog";
import AdminSingleBlogPage from "./pages/admin/blog/AdminSingleBlogPage";
import EditAdminBlog from "./pages/admin/blog/EditAdminBlog";
import AbuDhabiHosting from "./pages/abuDhabiHosting/AbuDhabiHosting";
import EthiopiaHosting from "./pages/EthiopiaHosting/EthiopiaHosting";
import AboutUsPage from "./pages/about/AboutUsPage";
import DataPage from "./pages/admin/datas/DataPage";
import AddNewDataPage from "./pages/admin/datas/AddNewDataPage";
import EditDataPage from "./pages/admin/datas/EditDataPage";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "buy",
          element: <BuyMinersPage />,
        },
        {
          path: "host",
          element: <HostMiningPage />,
        },
        {
          path: "host/abudhabi",
          element: <AbuDhabiHosting />,
        },
        {
          path: "host/ethiopia",
          element: <EthiopiaHosting />,
        },
        {
          path: "repair",
          element: <MinerRepairPage />,
        },
        {
          path: "blogs",
          element: <BlogPage />,
        },
        {
          path: "blogs/:id",
          element: <SingleBlogPage />,
        },
        {
          path: "about",
          element: <AboutUsPage />,
        },
      ],
    },
    {
      path: "/terms_and_conditions",
      element: <TermsAndConditions />,
    },
    {
      path: "/privacy_policy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <DashboardPage />,
        },
        {
          path: "dashboard",
          element: <DashboardPage />,
        },
        {
          path: "products",
          element: <AdminProductPage />,
        },
        {
          path: "products/new",
          element: <AddNewProduct />,
        },
        {
          path: "products/:id",
          element: <SingleProductPage />,
        },
        {
          path: "products/:id/edit",
          element: <EditProduct />,
        },
        {
          path: "blogs",
          element: <AdminBlogPage />,
        },
        {
          path: "blogs/new",
          element: <AddNewBlog />,
        },
        {
          path: "blogs/:id",
          element: <AdminSingleBlogPage />,
        },
        {
          path: "blogs/:id/edit",
          element: <EditAdminBlog />,
        },
        {
          path: "data",
          element: <DataPage />,
        },
        {
          path: "data/new",
          element: <AddNewDataPage />,
        },
        {
          path: "data/:id/edit",
          element: <EditDataPage />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "login", element: <LoginPage /> },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
