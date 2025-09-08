import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "driver.js/dist/driver.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/index.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { RoleProvider } from "./contexts/role-context.tsx";
import { NavigationProvider } from "./providers/navigation.provider.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
        <NavigationProvider>
          <RoleProvider>
            <RouterProvider router={router} />
            <Toaster />
          </RoleProvider>
        </NavigationProvider>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
);
