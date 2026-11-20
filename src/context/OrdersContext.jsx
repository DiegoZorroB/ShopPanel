import { createContext, useContext, useState, useEffect } from 'react';

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('shop_panel_orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('shop_panel_orders', JSON.stringify(orders));
  }, [orders]);

  // Agrega un producto con estado inicial "Pendiente" y número de pedido consecutivo
  const addOrder = (product) => {
    setOrders((prevOrders) => {
      const nextOrderNumber = 1001 + prevOrders.length;
      const newOrder = {
        orderId: nextOrderNumber,
        productId: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        status: 'Pendiente',
        createdAt: new Date().toISOString(),
      };
      // Se inserta al principio para que los más recientes salgan arriba
      return [newOrder, ...prevOrders];
    });
  };

  // Actualizar el estado desde el menú desplegable
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Pedidos activos excepto los cancelados
  const activeOrdersCount = orders.filter(
    (order) => order.status !== 'Cancelado'
  ).length;

  return (
    <OrdersContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        activeOrdersCount,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrdersContext);
}