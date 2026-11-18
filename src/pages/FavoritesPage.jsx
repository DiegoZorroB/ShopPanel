import RecipeGrid from '../components/RecipeGrid.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  return (
    <section className="content-section container">
      <div className="page-heading"><div><span className="eyebrow">TU COLECCIÓN</span><h1>Mis guardadas</h1><p>Las recetas que quieres tener a mano.</p></div><span className="heading-stamp">TUS<br />FAVORITAS</span></div>
      {favorites.length ? <RecipeGrid recipes={favorites} /> : <div className="state-box"><span className="state-icon">♡</span><h2>Aún no has guardado recetas</h2><p>Cuando encuentres una que te guste, márcala con el corazón.</p></div>}
    </section>
  );
}
