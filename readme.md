# TrustPay Fullstack Project 

**TrustPay** is a fullstack digital wallet application fully implemented in **TypeScript**, providing **secure, role-based access** for Users, Agents, and Admins. The frontend is built with **React.js + TypeScript**, **Redux Toolkit**, and **RTK Query**, while the backend uses **Node.js/Express + TypeScript**, **MongoDB**, and **JWT** authentication.

This project simulates real-world wallet operations similar to bKash or Nagad, including deposits, withdrawals, money transfers, and transaction history management.

---

## 🔗 Live Link

* **Frontend**: [https://digital-wallet-management-client.vercel.app](https://digital-wallet-management-client.vercel.app) 
* **Backend**: [https://digital-wallet-management-system-delta.vercel.app](https://digital-wallet-management-system-delta.vercel.app)
* **Frontend Repository**: [https://github.com/jahedasultana/Digital_Wallet_management_client](https://github.com/jahedasultana/Digital_Wallet_management_client)

---

## 🚀 Project Overview

* **Role-Based Dashboards**: Different interfaces and capabilities for Users, Agents, and Admins.
* **Wallet Operations**: Deposit, withdraw, send money, and view transaction history.
* **Authentication & Authorization**: JWT-based login and registration with role selection.
* **Data Management**: Efficient state handling using Redux Toolkit and RTK Query.
* **Responsive Design**: Mobile-first UI using Tailwind CSS.
* **Admin Controls**: Manage users, agents, transactions, and system settings.

---

## 🧱 Tech Stack

* **Frontend**: React.js + TypeScript, Redux Toolkit, RTK Query, Tailwind CSS
* **Backend**: Node.js + TypeScript, Express, MongoDB, Mongoose, JWT, bcrypt
* **Development Tools**: Vite, ESLint, Prettier, Postman (API testing)

---

## 📦 Installation & Setup

### Frontend

1. Clone the frontend repository:

   ```bash
   git clone https://github.com/jahedasultana/Digital_Wallet_management_client.git
   cd TrustPay-client
   bun install
   bun run dev
   ```

   Frontend runs on [http://localhost:3000](http://localhost:3000)

### Backend

1. Clone the backend repository:

   ```bash
   git clone https://github.com/jahedasultana/Digital_Wallet_Management_System.git
   cd TrustPay-server
   bun install
   bun run dev
   ```

   Backend runs on [http://localhost:5000](http://localhost:5000) by default.

2. Configure `.env` with your MongoDB URI and JWT secret.

---

## 🧪 Features & Functionalities

### Public Landing Pages

* Home, About, Features, Contact, FAQ
* Responsive design with navigation bar, hero banner, and footer

### Authentication

* Registration and login with JWT
* Role-based redirection (User, Agent, Admin)
* Persisted sessions and logout functionality

### User Dashboard

* Wallet balance overview
* Deposit, withdraw, and send money functionality
* Transaction history with filtering and pagination
* Profile management (update name, phone, password)

### Agent Dashboard

* Overview of cash-in/out operations
* Transaction history handled by agents
* Profile management

### Admin Dashboard

* Overview of total users, agents, transactions, and volume

* Manage users and agents (approve, suspend, block/unblock)

* View and filter all transactions

* Profile management

### General Features

* Role-based navigation
* Loading indicators and global error handling
* Form validations and toast notifications
* Data visualization with cards, charts, and tables
* Fully responsive design


---

## 🧪 Test Credentials

Use the following accounts to test the application:

| Role  | Email                                                  | Password  |
| ----- | ---------------------------------------------------    | --------  |
| User  | [user@gmail.com](mailto:user@gmail.com)                | Abc123@@ |
| Agent | [agent@gmail.com](mailto:agent@gmail.com)              | Abc123@@ |
| Admin | [admin@example.com](mailto:admin@example.com)          | supersecurepassword |

---


## 📧 Contact

* Email: [jahedasultana47@gmail.com](mailto:jahedasultana47@gmail.com)


