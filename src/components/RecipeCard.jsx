import { useFavorites } from '../context/FavoritesContext.jsx';

export default function RecipeCard({ recipe }) {
  const { favorites, toggleFavorite } = useFavorites();
  const saved = favorites.some((item) => item.id === recipe.id);
  return (
    <article className="recipe-card h-100">
      <div className="recipe-image-wrap">
        <img src={recipe.image} className="recipe-image" alt={recipe.name} loading="lazy" />
        <button type="button" className={`favorite-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleFavorite(recipe)} aria-label={saved ? 'Quitar de guardadas' : 'Guardar receta'}>{saved ? '♥' : '♡'}</button>
      </div>
      <div className="recipe-card-body">
        <div className="d-flex align-items-center justify-content-between gap-2 mb-2"><span className="recipe-tag">{recipe.cuisine || 'Receta'}</span><span className="recipe-rating">★ {recipe.rating ?? '—'}</span></div>
        <h3>{recipe.name}</h3>
        <p>{recipe.mealType?.[0] || 'Una idea para tu próxima comida'}</p>
        <div className="recipe-meta"><span>◷ {recipe.prepTimeMinutes ?? '—'} min</span><span>● {recipe.difficulty || 'Para disfrutar'}</span></div>
      </div>
    </article>
  );
}
