import App from "@/App";
import { DashboardLayout } from "@/LayOuts/Dashboard";
import About from "@/pages/About/About";
import ForgotPassword from "@/pages/Auth/ForgotPassword/ForgotPassword";
import { Login } from "@/pages/Auth/Login/Login";
import { Register } from "@/pages/Auth/Register/Register";
import ResetPassword from "@/pages/Auth/ResetPassword/ResetPassword";
import Contact from "@/pages/Contact/Contact";
import FaqPage from "@/pages/FAQ/FaqPage";
import Features from "@/pages/Features/Features";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound/NotFound";
import UnAuthorised from "@/pages/UnAuthorised/UnAuthorised";
import { createBrowserRouter } from "react-router";
import { ProtectedRoute } from "@/utils/routeProtector";
import { UserStats } from "@/pages/dashboard/user/user-stats";
import { UserWallet } from "@/pages/dashboard/user/user-wallet";
import { UserTransactions } from "@/pages/dashboard/user/user-transactions";
import { AgentStats } from "@/pages/dashboard/agent/agent-stats";
import { UserProfile } from "@/pages/dashboard/user/user-profile";
import { AgentWallet } from "@/pages/dashboard/agent/agent-wallet";
import { AgentCashIn } from "@/pages/dashboard/agent/agent-cash-in";
import { AgentCashOut } from "@/pages/dashboard/agent/agent-cash-out";
import { AgentProfile } from "@/pages/dashboard/agent/agent-profile";
import AgentTransactions from "@/pages/dashboard/agent/agent-transactions";
import { AdminStats } from "@/pages/dashboard/admin/admin-stats";
import { AdminUsers } from "@/pages/dashboard/admin/admin-users";
import { AdminWallets } from "@/pages/dashboard/admin/admin-wallets";
import AdminTransactions from "@/pages/dashboard/admin/admin-transactions";
import { AdminAgents } from "@/pages/dashboard/admin/admin-agents";
import { AdminProfile } from "@/pages/dashboard/admin/admin-profile";


export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      { Component: Home, index: true },
      { Component: About, path: "about" },
      { Component: Features, path: "features" },
      { Component: FaqPage, path: "faq" },
      { Component: Contact, path: "contact" },
      // { Component: withAuth(Login), path: "login" },
      // { Component: withAuth(Register), path: "signup" },
      { Component: Login, path: "login" },
      { Component: Register, path: "signup" },
      { Component: UnAuthorised, path: "unauthorized" },
      { Component: ForgotPassword, path: "forgot-password" },
      { Component: ResetPassword, path: "reset-password" },
      { Component: NotFound, path: "*" },

      // DASHBOARD routes
      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
          // USER routes
          {
            path: "user/stats",
            element: (
              <ProtectedRoute requiredRole='USER'>
                <UserStats />
              </ProtectedRoute>
            ),
          },
          {
            path: "user/wallet",
            element: (
              <ProtectedRoute requiredRole='USER'>
                <UserWallet />
              </ProtectedRoute>
            ),
          },
          {
            path: "user/transactions",
            element: (
              <ProtectedRoute requiredRole='USER'>
                <UserTransactions />
              </ProtectedRoute>
            ),
          },
          {
            path: "user/profile",
            element: (
              <ProtectedRoute requiredRole='USER'>
                <UserProfile />
              </ProtectedRoute>
            ),
          },

          // AGENT routes
          {
            path: "agent/stats",
            element: (
              <ProtectedRoute requiredRole='AGENT'>
                <AgentStats />
              </ProtectedRoute>
            ),
          },
          {
            path: "agent/wallet",
            element: (
              <ProtectedRoute requiredRole='AGENT'>
                <AgentWallet />
              </ProtectedRoute>
            ),
          },
          {
            path: "agent/cash-in",
            element: (
              <ProtectedRoute requiredRole='AGENT'>
                <AgentCashIn />
              </ProtectedRoute>
            ),
          },
          {
            path: "agent/cash-out",
            element: (
              <ProtectedRoute requiredRole='AGENT'>
                <AgentCashOut />
              </ProtectedRoute>
            ),
          },
          {
            path: "agent/transactions",
            element: (
              <ProtectedRoute requiredRole='AGENT'>
                <AgentTransactions />
              </ProtectedRoute>
            ),
          },
          {
            path: "agent/profile",
            element: (
              <ProtectedRoute requiredRole='AGENT'>
                <AgentProfile />
              </ProtectedRoute>
            ),
          },

          // ADMIN routes
          {
            path: "admin/stats",
            element: (
              <ProtectedRoute requiredRole='ADMIN'>
                <AdminStats />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/users",
            element: (
              <ProtectedRoute requiredRole='ADMIN'>
                <AdminUsers />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/agents",
            element: (
              <ProtectedRoute requiredRole='ADMIN'>
                <AdminAgents />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/wallets",
            element: (
              <ProtectedRoute requiredRole='ADMIN'>
                <AdminWallets />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/transactions",
            element: (
              <ProtectedRoute requiredRole='ADMIN'>
                <AdminTransactions />
              </ProtectedRoute>
            ),
          },
          {
            path: "admin/profile",
            element: (
              <ProtectedRoute requiredRole='ADMIN'>
                <AdminProfile />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);
