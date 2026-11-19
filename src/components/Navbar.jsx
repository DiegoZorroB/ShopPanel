import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navbar.css";

export default function Navbar({ ordersCount = 0 }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const displayName = user?.email ? user.email.split("@")[0] : "Usuario";

  async function handleSignOut() {
    await signOut();
    navigate("/login", { replace: true });
  }

  return (
    <header className="shop-navbar">
      <nav className="container navbar navbar-expand-md py-2">
        {/* Izquierda: Marca ShopPanel con carrito de compras */}
        <Link className="shop-brand" to="/productos">
          <span className="shop-brand-badge" aria-hidden="true">
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </span>
          <span>ShopPanel</span>
        </Link>

        {/* Controles rápidos visibles solo en Móvil (< 768px) */}
        <div className="d-flex d-md-none align-items-center gap-2 ms-auto me-2">
          <Link
            to="/pedidos"
            className="text-decoration-none position-relative text-secondary p-1"
            aria-label="Ver pedidos"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {ordersCount > 0 && (
              <span className="orders-count-badge position-absolute top-0 start-100 translate-middle">
                {ordersCount}
              </span>
            )}
          </Link>

          <span className="user-pill small" title={user?.email}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="text-truncate" style={{ maxWidth: "85px" }}>
              {displayName}
            </span>
          </span>
        </div>

        {/* Botón hamburguesa móvil */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#shopMainNav"
          aria-controls="shopMainNav"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Contenido colapsable: enlaces centrados con mx-md-auto */}
        <div
          className="collapse navbar-collapse shop-navbar-collapse"
          id="shopMainNav"
        >
          <div className="navbar-nav mx-md-auto gap-1 gap-md-2">
            <NavLink
              to="/productos"
              className={({ isActive }) =>
                `shop-nav-link ${isActive ? "active" : ""}`
              }
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              </svg>
              <span>Productos</span>
            </NavLink>

            <NavLink
              to="/pedidos"
              className={({ isActive }) =>
                `shop-nav-link ${isActive ? "active" : ""}`
              }
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Mis pedidos</span>
              {ordersCount > 0 && (
                <span className="orders-count-badge">{ordersCount}</span>
              )}
            </NavLink>
          </div>

          {/* Usuario y botón salir en Desktop (>= 768px) */}
          <div className="d-none d-md-flex align-items-center gap-3">
            <span className="user-pill" title={user?.email}>
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-secondary"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>{displayName}</span>
            </span>

            <button
              type="button"
              className="btn-logout-desktop"
              onClick={handleSignOut}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Cerrar sesión</span>
            </button>
          </div>

          {/* Botón salir ancho completo solo en Móvil (< 768px) */}
          <div className="d-md-none">
            <button
              type="button"
              className="btn-logout-mobile"
              onClick={handleSignOut}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
