import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute() {
  const { session } = useAuth();
  // Aquí se verifica la sesión antes de mostrar las rutas privadas.
  return session ? <Outlet /> : <Navigate to="/" replace />;
}
