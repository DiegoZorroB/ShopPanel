import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './LoginPage.css';

export default function LoginPage() {
  const { session, signIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [busy, setBusy] = useState(false);

  if (session) {
    return <Navigate to="/productos" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor, completa tu correo electrónico y contraseña.');
      return;
    }

    setBusy(true);
    const { error } = await signIn(email.trim(), password);
    setBusy(false);

    if (error) {
      setErrorMessage('Credenciales incorrectas. Verifica tu correo y contraseña.');
      return;
    }

    navigate('/productos', { replace: true });
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Logo adentro de la tarjeta como en el diseño de Figma */}
        <div className="login-brand">
          <div className="login-brand-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
          </div>
          <h1 className="login-brand-title">ShopPanel</h1>
        </div>

        <h2 className="login-title">Bienvenido a ShopPanel</h2>
        <p className="login-subtitle">Inicia sesión para gestionar tus productos y pedidos</p>

        {errorMessage && (
          <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 small" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label className="form-label fw-semibold small text-dark" htmlFor="loginEmail">
              Correo electrónico
            </label>
            <div className="login-input-group">
              <span className="login-input-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </span>
              <input
                id="loginEmail"
                type="email"
                className="form-control login-input"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={busy}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold small text-dark" htmlFor="loginPassword">
              Contraseña
            </label>
            <div className="login-input-group">
              <span className="login-input-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="loginPassword"
                type="password"
                className="form-control login-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={busy}
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 login-btn d-flex align-items-center justify-content-center gap-2"
            disabled={busy}
          >
            {busy ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <span>Iniciar sesión</span>
            )}
          </button>
        </form>
      </div>

      <p className="login-footer-note">
        ShopPanel • Plataforma de Gestión de Pedidos
      </p>
    </div>
  );
}