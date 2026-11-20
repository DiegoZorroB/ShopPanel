import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../services/productService';
import { useOrders } from '../context/OrdersContext';
import './products.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addOrder } = useOrders();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Error al cargar el detalle del producto.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleAddOrder = () => {
    if (!product) return;
    addOrder(product);
    navigate('/orders');
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="text-muted mt-2">Cargando detalle del producto...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error || 'Producto no encontrado'}</div>
        <Link to="/products" className="btn btn-sp-outline">
          ← Volver a productos
        </Link>
      </div>
    );
  }

  return (
    <section className="container py-4 py-md-5">
      <div className="mb-4">
        <Link
          to="/products"
          className="text-decoration-none text-muted fw-medium d-inline-flex align-items-center gap-1"
        >
          ← Volver a productos
        </Link>
      </div>

      <div className="bg-white border rounded-4 p-3 p-md-4 p-lg-5 shadow-sm">
        <div className="row g-4 g-lg-5 align-items-center">
          {/* Imagen izquierda */}
          <div className="col-12 col-md-6">
            <div
              className="rounded-4 overflow-hidden bg-light d-flex align-items-center justify-content-center"
              style={{ minHeight: '360px' }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="img-fluid w-100"
                style={{ maxHeight: '420px', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Información derecha */}
          <div className="col-12 col-md-6">
            <span
              className="badge rounded-pill px-3 py-2 mb-3 text-capitalize"
              style={{ backgroundColor: '#eef2ff', color: '#4f46e5' }}
            >
              {product.category}
            </span>

            <h1 className="h2 fw-bold text-dark mb-2">{product.title}</h1>

            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="text-warning">★★★★★</span>
              <span className="fw-semibold text-dark">{product.rating}</span>
              <span className="text-muted small">
                ({product.reviewsCount} valoraciones)
              </span>
            </div>

            <div className="fs-2 fw-bold text-dark mb-3">{product.price} US$</div>

            <p className="text-muted lh-base mb-4">{product.description}</p>

            <div className="d-flex align-items-center gap-2 mb-4 small fw-medium text-dark">
              <span
                className="rounded-circle d-inline-block"
                style={{ width: 9, height: 9, backgroundColor: '#10b981' }}
              ></span>
              <span>Stock: {product.stock} unidades disponibles</span>
            </div>

            <button
              type="button"
              onClick={handleAddOrder}
              className="btn btn-sp-primary w-100 py-3 fw-semibold"
            >
              Agregar a mis pedidos
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}