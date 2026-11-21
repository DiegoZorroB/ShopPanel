import { Link } from 'react-router-dom';
export default function NotFoundPage() {
  return <section id='no_encontrado' className="content-section container text-center"><span className="eyebrow">404 · PÁGINA NO ENCONTRADA</span><h1 className="display-4 mt-3">Pagina no encontrada.</h1><Link to="/" className="btn btn-dark rounded-pill mt-3 px-4">Volver al inicio</Link></section>;
}
