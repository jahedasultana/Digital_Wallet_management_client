import { lazy } from "react";
import App from "@/App";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import { createBrowserRouter, Navigate } from "react-router";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { withAuth } from "@/utils/withAuth";
import type { TRole } from "@/types/auth";
import { role } from "@/constants/role";
import { generateRoutes } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import Features from "@/components/modules/Home/Features";
import Pricing from "@/components/modules/Home/Pricing";
import Contact from "@/components/modules/Home/Contact";
import Faq from "@/components/modules/Home/Faq";
import UserServicePage from "@/pages/UserServicePage";
import AgentServicePage from "@/pages/AgentServicePage";
import Unauthorized from "@/pages/Unauthorized";
import NotFound from "@/pages/NotFound";
const DashboardLayout = lazy(() => import("@/components/layout/DashboardLayout"));



export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: HomePage,
        path: "/",
      },
      {
        Component: AboutPage,
        path: "about",
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Pricing,
        path: "pricing",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: Faq,
        path: "faq",
      },
      {
        Component: UserServicePage,
        path: "services/user-service",
      },
      {
        Component: AgentServicePage,
        path: "services/agent-service",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.admin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.agent as TRole),
    path: "/agent",
    children: [
      { index: true, element: <Navigate to="/agent/wallet" /> },
      ...generateRoutes(agentSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/wallet" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: LoginPage,
    path: "login",
  },
  {
    Component: RegisterPage,
    path: "/register/:role",
  },
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
  {
    Component: NotFound,
    path: "*"
  }
]);
