import { Navigate, Outlet } from "react-router-dom";

import { useEffect } from "react";

import { validateAuth } from "../hooks/validateAuth";

import { useAuthStore } from "../store/authStore";

export function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuthStore();

  useEffect(() => {
    validateAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
