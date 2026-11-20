import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';

export default function ProductCard({ product, onOrderSuccess }) {
  const { addOrder } = useOrders();

  const handleOrderClick = () => {
    addOrder(product);
    if (onOrderSuccess) {
      onOrderSuccess(product.title);
    }
  };

  return (
    <div className="card product-card h-100 p-3">
      <div className="product-card-img-wrapper mb-3">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-card-img"
          loading="lazy"
        />
      </div>

      <div className="d-flex flex-column flex-grow-1">
        <h2 className="h6 fw-bold text-dark mb-1 text-truncate" title={product.title}>
          {product.title}
        </h2>

        <p className="text-muted small mb-3 product-description-clamp">
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="fs-5 fw-bold text-dark mb-3">{product.price} US$</div>

          <div className="d-flex gap-2">
            <Link
              to={`/productos/${product.id}`}
              className="btn btn-sp-outline btn-sm flex-fill py-2"
            >
              Ver detalle
            </Link>
            <button
              type="button"
              onClick={handleOrderClick}
              className="btn btn-sp-primary btn-sm flex-fill py-2"
            >
              Pedir producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}