import { createContext, useContext } from "react";

export type UserRole = "USER" | "AGENT" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RoleContextType {
  currentUser: User;
  setCurrentRole: (role: UserRole) => void;
  isRole: (role: UserRole) => boolean;
}

export const RoleContext = createContext<RoleContextType | undefined>(undefined);
export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}