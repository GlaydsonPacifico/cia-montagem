import { useState } from 'react';
import { SideBar } from './components/SideBar';
import OrderList from './components/Orders/OrderList';

export const Layout: React.FC = () => {
  const [showOrders, setShowOrders] = useState(false);

  const handleShowOrder = () => {
    setShowOrders(true);
  };

  return (
    <>
      <SideBar handleOrdersClick={handleShowOrder} />
      {showOrders ? <OrderList /> : ''}
    </>
  );
};
