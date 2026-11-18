const API_URL = 'https://dummyjson.com/recipes?limit=18';

export async function getRecipes() {
  // Aquí va la URL de la API y la petición GET con fetch.

  

  //
  if (!API_URL) throw new Error('Agrega la URL de recetas en recipeService.js.');
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('No fue posible consultar las recetas.');
  const data = await response.json();
  return data.recipes;
}
