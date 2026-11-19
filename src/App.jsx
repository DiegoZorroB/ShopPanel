import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import SiteLayout from './components/SiteLayout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Ruta pública de inicio de sesión */}
          <Route path="/login" element={<LoginPage />} />

          {/* Redirección de la raíz al catálogo (si no hay sesión, ProtectedRoute envía a /login) */}
          <Route path="/" element={<Navigate to="/productos" replace />} />

          {/* Rutas protegidas con Navbar */}
          <Route element={<ProtectedRoute />}>
            <Route element={<SiteLayout />}>
              <Route path="/productos" element={<ProductsPage />} />
              <Route path="/productos/:id" element={<ProductDetailPage />} />
              <Route path="/pedidos" element={<OrdersPage />} />
            </Route>
          </Route>

          {/* Ruta para páginas inexistentes */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}