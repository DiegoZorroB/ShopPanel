import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrdersContext';
import './products.css';

const ORDER_STATUSES = ['Pendiente', 'Confirmado', 'Enviado', 'Cancelado'];

const STATUS_CLASS_MAP = {
  Pendiente: 'status-pendiente',
  Confirmado: 'status-confirmado',
  Enviado: 'status-enviado',
  Cancelado: 'status-cancelado',
};

export default function OrdersPage() {
  const { orders, updateOrderStatus, activeOrdersCount } = useOrders();

  return (
    <section className="container py-4 py-md-5">
      {/* Encabezado */}
      <div className="mb-4">
        <h1 className="h2 fw-bold mb-1">Mis Pedidos</h1>
        <p className="text-muted mb-0">
          {orders.length}{' '}
          {orders.length === 1 ? 'pedido registrado' : 'pedidos registrados'} ·{' '}
          {activeOrdersCount}{' '}
          {activeOrdersCount === 1 ? 'activo' : 'activos'}
        </p>
      </div>

      {/* Vista vacía */}
      {orders.length === 0 ? (
        <div className="bg-white border rounded-4 p-5 text-center">
          <h2 className="h5 fw-bold mb-2">Aún no tienes pedidos</h2>
          <p className="text-muted mb-4">
            Explora el catálogo y haz tu primer pedido con un clic.
          </p>
          <Link to="/products" className="btn btn-sp-primary px-4 py-2">
            Ir al catálogo
          </Link>
        </div>
      ) : (
        /* Lista de pedidos */
        <div className="d-flex flex-column gap-3">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white border rounded-4 p-3 p-md-4 shadow-sm"
            >
              <div className="row align-items-center g-3">
                {/* Miniatura + Datos del producto */}
                <div className="col-12 col-md-7 d-flex align-items-center gap-3">
                  <img
                    src={order.thumbnail}
                    alt={order.title}
                    className="rounded-3 border flex-shrink-0"
                    style={{ width: 72, height: 72, objectFit: 'cover' }}
                  />
                  <div>
                    <div className="text-muted small mb-1">
                      Producto ID #{order.productId} · Pedido #{order.orderId}
                    </div>
                    <h2 className="h6 fw-bold text-dark mb-1">{order.title}</h2>
                    <div className="fw-bold text-dark">{order.price} US$</div>
                  </div>
                </div>

                {/* Badge de estado + Selector desplegable */}
                <div className="col-12 col-md-5 d-flex align-items-center justify-content-md-end gap-3">
                  <span
                    className={`status-pill ${
                      STATUS_CLASS_MAP[order.status] || 'status-pendiente'
                    }`}
                  >
                    <span className="status-dot"></span>
                    {order.status}
                  </span>

                  <select
                    aria-label={`Cambiar estado del pedido ${order.orderId}`}
                    className="form-select w-auto"
                    style={{ minWidth: '145px', borderRadius: '0.5rem' }}
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.orderId, e.target.value)
                    }
                  >
                    {ORDER_STATUSES.map((statusOption) => (
                      <option key={statusOption} value={statusOption}>
                        {statusOption}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}