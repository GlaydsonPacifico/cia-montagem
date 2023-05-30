import { useEffect, useState } from 'react';
import { WooCommerce } from '../../utils/api';
import OrderItem, { Order } from './OrderItem';
import SkeletonRow from './SkeletonRow';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrders = async (page: number) => {
    try {
      const { data } = await WooCommerce.get('orders', {
        per_page: 20,
        page: page,
      });
      setOrders(data);
      setLoading(false);
      console.log('Orders: ', data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const nextPage = (): void => {
    const nextPageNumber = currentPage + 1;
    setCurrentPage(nextPageNumber);
    fetchOrders(nextPageNumber);
  };

  const previousPage = (): void => {
    if (currentPage > 1) {
      const previousPageNumber = currentPage - 1;
      setCurrentPage(previousPageNumber);
      fetchOrders(previousPageNumber);
    }
  };

  return (
    <div className='container mx-auto text-xs text-left'>
      <div className='mt-16 flex justify-center'>
        Informações Aqui
      </div>

      {loading ? (
        <table className='min-w-full mt-16'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Pedido</th>
              <th className='px-4 py-2'>Total</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Método Envio</th>
              <th className='px-4 py-2'>Total da Entrega</th>
              <th className='px-4 py-2'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(6)].map((_, index) => (
              <SkeletonRow key={index} />
            ))}
          </tbody>
        </table>
      ) : (
        <table className='min-w-full mt-16'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Pedido</th>
              <th className='px-4 py-2'>Total</th>
              <th className='px-4 py-2'>Status</th>
              <th className='px-4 py-2'>Método Envio</th>
              <th className='px-4 py-2'>Total da Entrega</th>
              <th className='px-4 py-2'>Ações</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      )}

      <div className='flex justify-center mt-4 mb-4'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Voltar
        </button>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={nextPage}
        >
          Avançar
        </button>
      </div>
    </div>
  );
};

export default OrderList;
