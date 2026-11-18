import { createContext, useContext, useEffect, useState } from 'react';
 
const FavoritesContext = createContext(null);
 
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('recetas-favoritas');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
 
  useEffect(() => {
    localStorage.setItem('recetas-favoritas', JSON.stringify(favorites));
  }, [favorites]);
 
  function toggleFavorite(recipe) {
    setFavorites((current) =>
      current.some((item) => item.id === recipe.id)
        ? current.filter((item) => item.id !== recipe.id)
        : [...current, recipe],
    );
  }
 
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
 
export function useFavorites() {
  return useContext(FavoritesContext);
}