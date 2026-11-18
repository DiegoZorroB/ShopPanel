import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  async function handleSignOut() {
    await signOut();
    navigate('/');
  }
  return (
    <header className="topbar">
      <nav className="container navbar navbar-expand-md py-3">
        <Link className="brand-mark" to="/"><span className="brand-icon">✳</span> la mesa</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Abrir navegación"><span className="navbar-toggler-icon" /></button>
        <div className="collapse navbar-collapse justify-content-end" id="mainNav">
          <div className="navbar-nav align-items-md-center gap-md-2">
            <NavLink className="nav-link" to="/recetas">Recetas</NavLink>
            <NavLink className="nav-link" to="/favoritos">Mis guardadas</NavLink>
            {user ? <button className="btn btn-dark btn-sm rounded-pill px-3 ms-md-2" onClick={handleSignOut}>Cerrar sesión</button> : <button className="btn btn-dark btn-sm rounded-pill px-3 ms-md-2" data-bs-toggle="modal" data-bs-target="#loginModal">Ingresar</button>}
          </div>
        </div>
      </nav>
    </header>
  );
}
