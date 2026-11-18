import { useEffect, useState } from 'react';
import RecipeGrid from '../components/RecipeGrid.jsx';
import { getRecipes } from '../services/recipeService.js';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Aquí va la consulta al servicio de recetas.
    async function  loadRecipes() {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  loadRecipes();
}, []);
      
    // Aquí va la consulta al servicio de recetas.
    

  return (
    <section className="content-section container">
      <div className="page-heading"><div><span className="eyebrow">UNA IDEA PARA HOY</span><h1>El recetario</h1><p>Preparaciones para descubrir, probar y compartir.</p></div><span className="heading-stamp">COCINA<br />CON CALMA</span></div>
      {loading && <div className="state-box"><span className="spinner-border spinner-border-sm me-2" /> Buscando recetas…</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && recipes.length === 0 && <div className="state-box"><span className="state-icon">✦</span><h2>El recetario está listo para llenarse</h2><p>En clase conectaremos esta vista con la API y mostraremos las tarjetas.</p></div>}
      {!loading && recipes.length > 0 && <RecipeGrid recipes={recipes} />}
    </section>
  );
}
