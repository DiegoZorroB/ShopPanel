import RecipeCard from './RecipeCard.jsx';

export default function RecipeGrid({ recipes }) {
  return <div className="row g-4">{recipes.map((recipe) => <div className="col-sm-6 col-xl-4" key={recipe.id}><RecipeCard recipe={recipe} /></div>)}</div>;
}
