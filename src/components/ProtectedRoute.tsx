import { Navigate } from "react-router-dom";
import React from "react";

import { isValidToken } from "../utils/token";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/login",
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");

  if (!token || !isValidToken(token)) {
    localStorage.removeItem("token");

    return <Navigate to={redirectTo} replace />;
  }

  return children;
}
