import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero-section">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> INSPIRACIÓN PARA CADA DÍA</span>
            <h1>Algo rico<br />está por <em>empezar.</em></h1>
            <p>Encuentra recetas para tus antojos, guarda tus favoritas y disfruta el placer de cocinar a tu manera.</p>
            <div className="d-flex flex-wrap gap-3 align-items-center mt-4">
              <button className="btn btn-dark btn-lg rounded-pill px-4" data-bs-toggle="modal" data-bs-target="#loginModal">Explorar recetas <span className="ms-2">↗</span></button>
              <span className="hero-caption">Ideas sencillas, momentos especiales</span>
            </div>
            <div className="hero-stats"><div><strong>100+</strong><span>ideas para probar</span></div><div><strong>6</strong><span>recetas para empezar</span></div></div>
          </div>
          <div className="hero-visual" aria-label="Mesa servida con ingredientes frescos">
            <div className="hero-photo"><img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1100&q=85" alt="Ensalada fresca y colorida servida en una mesa" /></div>
            <div className="photo-label"><span className="label-spark">✳</span><div><strong>Hecho para disfrutar</strong><small>Un buen plato reúne historias</small></div></div>
            <div className="floating-note">temporada<br /><b>de sabores</b></div>
          </div>
        </div>
      </section>
      <section className="home-intro container">
        <div><span className="eyebrow">TU PRÓXIMO FAVORITO</span><h2>Recetas que dan ganas<br />de volver a la mesa.</h2></div>
        <div className="intro-right"><p>Explora preparaciones de distintas cocinas, descubre sus ingredientes y crea una colección con las que quieras preparar después.</p><button className="text-link" onClick={() => document.querySelector('[data-bs-target="#loginModal"]')?.click()}>Entrar al recetario <span>→</span></button></div>
      </section>
      <section className="feature-strip"><div className="container feature-grid"><div><span>01</span><h3>Explora</h3><p>Encuentra recetas nuevas para todos los días.</p></div><div><span>02</span><h3>Descubre</h3><p>Consulta ingredientes, tiempos y preparación.</p></div><div><span>03</span><h3>Guarda</h3><p>Arma tu propia colección de favoritas.</p></div></div></section>
    </>
  );
}
