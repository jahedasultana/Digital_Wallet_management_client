import { useGetUserInfoQuery } from "@/redux/features/user/userApi";
import type { TRole } from "@/types";
import type { ReactNode } from "react";
import { Navigate } from "react-router";

// ProtectedRoute component
export const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole?: TRole;
}) => {
  const { data, isLoading } = useGetUserInfoQuery(undefined);

  if (isLoading) return null; // or a loading spinner

  if (!data?.data?.email) return <Navigate to='/login' />;

  if (requiredRole && requiredRole !== data?.data?.role)
    return <Navigate to='/unauthorized' />;

  return <>{children}</>;
};