const CARTS_API_URL = 'https://dummyjson.com/carts';
const PRODUCTS_API_URL = 'https://dummyjson.com/products';

/**
 * Obtiene los productos desde la API,
 * los aplana en una sola lista y elimina duplicados por ID.
 */
export async function getProductsFromCarts() {
  const response = await fetch(CARTS_API_URL);
  if (!response.ok) {
    throw new Error('No se pudieron cargar los productos desde la API.');
  }

  const data = await response.json();
  const uniqueMap = new Map();

  data.carts.forEach((cart) => {
    cart.products.forEach((item) => {
      if (!uniqueMap.has(item.id)) {
        uniqueMap.set(item.id, {
          id: item.id,
          title: item.title,
          price: Math.round(item.price),
          thumbnail: item.thumbnail,
          description: `Producto destacado de nuestro catálogo oficial (${item.title}) con garantía y envío rápido.`,
        });
      }
    });
  });

  // map para mostrar descripciones con /products en paralelo
  const productsArray = Array.from(uniqueMap.values());
  const enrichedProducts = await Promise.all(
    productsArray.map(async (prod) => {
      try {
        const res = await fetch(`${PRODUCTS_API_URL}/${prod.id}`);
        if (!res.ok) return prod;
        const detail = await res.json();
        return {
          ...prod,
          description: detail.description || prod.description,
          category: detail.category || 'General',
          rating: detail.rating || 4.8,
          stock: detail.stock ?? 10,
          reviewsCount: detail.reviews?.length ? detail.reviews.length * 120 : 240,
        };
      } catch {
        return prod;
      }
    })
  );

  return enrichedProducts;
}

/**
 * Obtiene el detalle completo de un producto por su ID.
 */
export async function getProductById(id) {
  const response = await fetch(`${PRODUCTS_API_URL}/${id}`);
  if (!response.ok) {
    throw new Error('No se encontró el detalle del producto.');
  }

  const detail = await response.json();
  return {
    id: detail.id,
    title: detail.title,
    price: Math.round(detail.price),
    thumbnail: detail.images?.[0] || detail.thumbnail,
    description: detail.description,
    category: detail.category,
    rating: detail.rating || 4.9,
    stock: detail.stock ?? 12,
    reviewsCount: detail.reviews?.length ? detail.reviews.length * 180 : 541,
  };
}