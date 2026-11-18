import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
 
export default function LoginModal() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const closeRef = useRef(null);
 
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setBusy(true);
    const { error } = await signIn(email, password);
 
    setBusy(false);
    if (error) {
      setMessage('No se puede iniciar sesión');
      return;
    }
 
    setEmail('');
    setPassword('');
    closeRef.current?.click();
  }
 
  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content login-modal">
          <div className="modal-header border-0 pb-0">
            <div>
              <span className="eyebrow">QUÉ BUENO TENERTE AQUÍ</span>
              <h2 className="modal-title mt-2" id="loginTitle">Entra a tu mesa</h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            />
          </div>
          <div className="modal-body pt-3">
            <p className="text-secondary">Inicia sesión para explorar y guardar tus recetas favoritas.</p>
            <form onSubmit={handleSubmit}>
              <label className="form-label" htmlFor="email">Correo electrónico</label>
              <input
                className="form-control form-control-lg mb-3"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@correo.com"
                required
              />
              <label className="form-label" htmlFor="password">Contraseña</label>
              <input
                className="form-control form-control-lg"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
              {message && (
                <div className="alert alert-warning mt-3 mb-0" role="alert">{message}</div>
              )}
              <button
                className="btn btn-dark btn-lg w-100 rounded-pill mt-4"
                type="submit"
                disabled={busy}
              >
                {busy ? 'Ingresando…' : 'Iniciar sesión'} <span aria-hidden="true">→</span>
              </button>
            </form>
            <div className="modal-note mt-3"><span>✦</span> Acceso de práctica con Supabase</div>
          </div>
        </div>
      </div>
    </div>
  );
}