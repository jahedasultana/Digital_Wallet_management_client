# 🚀 **Feature List**

### **Public Landing**

- Home page with:

  - Navigation bar (≥3 routes, sticky, mega menu optional)
  - Hero banner with tagline + CTA buttons
  - Footer
  - Skeleton loaders for delayed data
  - Smooth transitions

- About page (story, mission, team)
- Features page (with icons/visuals)
- Pricing page (optional)
- Contact page (inquiry form – simulated)
- FAQ page

---

### **Authentication**

- Login (JWT-based)
- Registration (role: User or Agent)
- Role-based redirect after login
- Persisted login state (refresh-safe)
- Logout

---

### **User Dashboard**

- Wallet overview (balance, quick actions, recent txns)
- Deposit (cash-in via agent simulation)
- Withdraw
- Send money (search by phone/email)
- Transaction history with:

  - Pagination
  - Type/date filters

- Profile management (update name, phone, password)

---

### **Agent Dashboard**

- Overview (cash-in/out summary, recent activity)
- Add money to user wallet
- Withdraw money from user wallet
- View all agent-handled transactions
- Commission history (optional)
- Profile management

---

### **Admin Dashboard**

- Overview (totals: users, agents, txns, volume)
- Manage users (view, block/unblock)
- Manage agents (approve/suspend)
- View all txns with **advanced filters**
- Search bars + filters (category, status, amount)
- Pagination on listings
- Adjust system fees/limits (optional)
- Profile management

---

### **General Features**

- Role-based navigation menus
- Global loading indicators
- Global error handling
- Form validations (required, numeric, positive)
- Pagination across lists
- Dynamic charts (cards, bar, pie, tables)
- Toast notifications (success/error)
- Guided tour (driver.js / shepherd.js / react-joyride):

  - ≥5 steps (nav, dashboard cards, charts, table filters, theme toggle)
  - Run once for new users (localStorage)
  - Restart option in settings

---

# 🎨 **UX / UI Improvement List**

- Fully responsive design (mobile → desktop)
- Consistent side margins & spacing
- Clear theme, typography, icons
- Dark/light mode toggle
- Avoid clashing colors (esp. dark mode)
- Use realistic data (not placeholders)
- Smooth transitions & animations
- Skeleton loaders & lazy loading for performance
- Accessibility compliance (contrast, alt text, ARIA)
- Professional polish for demo (realistic visuals/content)
