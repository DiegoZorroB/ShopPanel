import { useEffect, useState } from 'react';
import { getProductsFromCarts } from '../services/productService';
import ProductCard from '../components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getProductsFromCarts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al cargar el catálogo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput.trim());
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setSearchQuery(value.trim());
  };

  const handleOrderToast = (productTitle) => {
    setToastMessage(`"${productTitle}" se agregó a Mis Pedidos.`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="container py-4 py-md-5">
      {/* Notificación flotante al pedir producto */}
      {toastMessage && (
        <div
          className="alert alert-success shadow-sm position-fixed bottom-0 end-0 m-3 z-3"
          role="alert"
        >
          ✓ {toastMessage}
        </div>
      )}

      {/* Encabezado y Buscador */}
      <div className="row align-items-center justify-content-between g-3 mb-3">
        <div className="col-12 col-lg-6">
          <h1 className="h2 fw-bold mb-1">Catálogo de Productos</h1>
          <p className="text-muted mb-0">
            Explora y pide los mejores productos de nuestra tienda.
          </p>
        </div>

        <div className="col-12 col-lg-5">
          <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
            <div className="position-relative flex-grow-1 search-input-group">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="form-control py-2"
                placeholder="Buscar productos..."
                value={searchInput}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-sp-primary px-4">
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* Contador de productos */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span className="text-muted small">
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1 ? 'producto' : 'productos'}
        </span>
      </div>

      {/* Estado Cargando */}
      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="text-muted mt-2">Cargando catálogo de productos...</p>
        </div>
      )}

      {/* Estado Error */}
      {!loading && error && (
        <div className="alert alert-danger d-flex justify-content-between align-items-center">
          <span>{error}</span>
          <button onClick={loadProducts} className="btn btn-sm btn-outline-danger">
            Reintentar
          </button>
        </div>
      )}

      {/* Estado Sin Resultados */}
      {!loading && !error && filteredProducts.length === 0 && (
        <div className="text-center bg-white border rounded-4 p-5">
          <h2 className="h5 fw-bold">No se encontraron productos</h2>
          <p className="text-muted mb-3">
            No hay coincidencias para "{searchQuery}".
          </p>
          <button
            type="button"
            className="btn btn-sp-outline btn-sm"
            onClick={() => {
              setSearchInput('');
              setSearchQuery('');
            }}
          >
            Limpiar búsqueda
          </button>
        </div>
      )}

      {/* Grid Responsive de Tarjetas */}
      {!loading && !error && filteredProducts.length > 0 && (
        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-12 col-sm-6 col-lg-3">
              <ProductCard
                product={product}
                onOrderSuccess={handleOrderToast}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}