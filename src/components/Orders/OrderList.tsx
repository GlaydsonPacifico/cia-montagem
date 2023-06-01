import { useEffect, useState } from 'react';
import { WooCommerce } from '../../utils/api';
import OrderItem, { Order } from './OrderItem';
import OrderEdit from './OrderEdit';
import SkeletonRow from './SkeletonRow';
import ModalOrderEdit from './ModalOrderEdit';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchOrders = async (page: number) => {
    try {
      const { data } = await WooCommerce.get('orders', {
        per_page: 20,
        page: page,
      });
      setOrders(data);
      setLoading(false);
    } catch (error) {

      // Tratar Erros
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

  const handleEditOrder = (orderId: number): void => {
    setEditingOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleUpdateOrder = async (editedOrder: Order) => {
    const { id } = editedOrder;

    const updatedData = {
      status: editedOrder.status,
      billing: {
        address_1: editedOrder.billing.address_1,
        city: editedOrder.billing.city,
        neighborhood: editedOrder.billing.neighborhood,
        number: editedOrder.billing.number,
        postcode: editedOrder.billing.postcode,
        state: editedOrder.billing.state,
      },
    };

    try {
      const response = await WooCommerce.put(`orders/${id}`, updatedData);

      // Tratar Resposta
      console.log('Order updated:', response.data);

      updateOrderList(editedOrder);
    } catch (error) {

      // Tratar Erros
      console.error('Error updating order:', error);
    }
    setEditingOrderId(null);
  };

  const handleCancelEdit = (): void => {
    setEditingOrderId(null);
    setIsModalOpen(false);
  };

  const updateOrderList = (editedOrder: Order) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order.id === editedOrder.id) {
          return editedOrder;
        }
        return order;
      });
      return updatedOrders;
    });
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
              <OrderItem
                key={order.id}
                order={order}
                onEditOrder={handleEditOrder}
              />
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
      {editingOrderId !== null && (
        <ModalOrderEdit isOpen={isModalOpen} onClose={handleCancelEdit}>
          <OrderEdit
            order={orders.find(order => order.id === editingOrderId)}
            onUpdateOrder={handleUpdateOrder}
            onCancelEdit={handleCancelEdit}
          />
        </ModalOrderEdit>
      )}
    </div>
  );
};

export default OrderList;
