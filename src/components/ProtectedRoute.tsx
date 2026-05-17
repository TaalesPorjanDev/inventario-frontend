import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    async function validate() {
      try {
        await api.get("/auth/me", {
          withCredentials: true,
        });

        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    }

    validate();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
