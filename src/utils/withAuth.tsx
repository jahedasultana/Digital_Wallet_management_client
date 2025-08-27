import { useGetUserInfoQuery } from "@/redux/features/user/userApi";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useGetUserInfoQuery(undefined);
    console.log("User Info:", { data, isLoading });

    if (!isLoading && !data?.data?.email) {
      return <Navigate to='/login' />;
    }

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to='/unauthorized' />;
    }

    return <Component />;
  };
};
