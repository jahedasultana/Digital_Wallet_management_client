import { RoleContext, type User, type UserRole } from "@/hooks/use-role";
import { useState, type ReactNode } from "react";

// Mock users for different roles
const mockUsers: Record<UserRole, User> = {
  USER: {
    id: "USER001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "USER",
  },
  AGENT: {
    id: "AGENT001",
    name: "Jane Agent",
    email: "jane.agent@example.com",
    role: "AGENT",
  },
  ADMIN: {
    id: "ADMIN001",
    name: "John Administrator",
    email: "admin@example.com",
    role: "ADMIN",
  },
};

export function RoleProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers.USER);

  const setCurrentRole = (role: UserRole) => {
    setCurrentUser(mockUsers[role]);
  };

  const isRole = (role: UserRole) => currentUser.role === role;

  return (
    <RoleContext.Provider value={{ currentUser, setCurrentRole, isRole }}>
      {children}
    </RoleContext.Provider>
  );
}
