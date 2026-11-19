import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { session, loading } = useAuth();

  // Evita redirigir al login mientras Supabase verifica si ya hay sesión activa
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="spinner-border"
          style={{ color: "#4f46e5" }}
          role="status"
        >
          <span className="visually-hidden">Verificando sesión...</span>
        </div>
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/login" replace />;
}
