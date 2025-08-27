# 📅 Day-by-Day Task Plan

## **Day 1 – Project Setup & Public Pages**

**Morning (7:00 AM – 1:30 PM, 6.5 hours)**

- Initialize React + TypeScript project
- Install and configure dependencies:

  - Tailwind CSS
  - shadcn/ui
  - Redux Toolkit + RTK Query
  - React Router DOM

- Setup clean **project folder structure** (`components`, `pages`, `redux/features`, `routes`, etc.)
- Create public-facing pages:

  - **Home Page** → Hero, Navbar, CTA, Footer
  - **About Page** → story, mission, team
  - **Features Page** → icons + feature list

- Ensure **responsive design** (mobile-first)
- Add **skeleton loaders** and **smooth transitions/animations**

✅ **Goal:** Functional public landing pages with responsive design

---

## **Day 2 – Authentication**

**Morning (7:00 AM – 1:30 PM)**

- Create **Login** and **Registration** forms with role selection (User / Agent)
- Setup **authSlice** and **authApi** using RTK Query
- Implement **JWT-based login** with persisted auth (localStorage/sessionStorage)
- Add **role-based redirection** after login (User → `/dashboard/user`, Agent → `/dashboard/agent`, Admin → `/dashboard/admin`)
- Implement **Logout** functionality
- Add **form validation** (React Hook Form + Zod/Yup)
- Show **toast notifications** on success/error

✅ **Goal:** Fully functional authentication system

---

## **Day 3 – Dynamic Dashboard Layout (Single Layout for All Roles)**

**Morning (7:00 AM – 1:30 PM)**

- Build a **single dashboard shell** that works for all roles:

  - **Sidebar** (collapsible, responsive)
  - **Header/Topbar** (profile dropdown, notifications, theme toggle)
  - **Main Content area** (dynamic content rendered by route)

- Setup **role-based dynamic menus** (via config/JSON):

  - **User:** Wallet, Transactions, Profile
  - **Agent:** Wallet, Cash-in/out, Transactions, Profile
  - **Admin:** Users, Agents, Wallets, Transactions, Stats

- Implement **Protected Routes** with role validation:

  - `/dashboard/user/*`
  - `/dashboard/agent/*`
  - `/dashboard/admin/*`

- Add **placeholder pages** for each role’s sections (cards/tables/charts)
- Ensure **skeleton loaders** for data fetching
- Test **responsive design** for mobile, tablet, desktop

✅ **Goal:** One unified dashboard layout that adapts dynamically to role

---

## **Day 4 – API Integration & Core Features**

**Morning (7:00 AM – 1:30 PM)**

- Connect dashboards to backend API via RTK Query slices (`authApi`, `userApi`, `walletApi`, `transactionApi`, `statsApi`)
- Implement **User Dashboard** features:

  - Show wallet balance
  - Deposit / Withdraw / Send money
  - Transaction history (with pagination & filters)

- Implement **Agent Dashboard** features:

  - Cash-in/out for users
  - Agent transaction history

- Implement **Admin Dashboard** features:

  - Manage users & agents (list, delete, update)
  - View all transactions with filters
  - Admin statistics (total wallets, balances, active/blocked accounts)

- Add **Profile Management** for all roles (update name, phone, picture, password)

✅ **Goal:** Dynamic dashboards fully integrated with backend API

---

## **Day 5 – Guided Tour, Theme & Final Polish**

**Morning (7:00 AM – 1:30 PM)**

- Add **Guided Tour** with `react-joyride` (5+ steps per role to highlight features)
- Implement **Light/Dark mode toggle** (persisted theme)
- Fine-tune **responsiveness, spacing, typography, and colors**
- Add **toast notifications** for all key actions (success/error)
- Perform **end-to-end testing** for all role flows (User, Agent, Admin)
- Prepare for **deployment** (Vercel/Netlify)
- Record **demo video walkthrough**

✅ **Goal:** Production-ready frontend with polished UX and guided experience
