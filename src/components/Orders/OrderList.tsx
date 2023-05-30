import React, { useEffect, useState } from 'react';
import { WooCommerce } from '../../utils/api';
import { formatCurrency } from '../../utils/formatCurrency';
import SkeletonRow from './SkeletonRow';

interface Order {
  id: number;
  number: string;
  status: string;
  date_created: string;
  shipping_total: string;
  total: number;
  billing: {
    first_name: string;
    last_name: string;
  };
  shipping_lines: {
    meta_data: {
      display_value: string;
    }[];
    method_title: string;
  }[];
}

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

  const getShippingLineDisplayValue = (shippingLines: Order['shipping_lines']): string => {
    if (shippingLines.length > 0 && shippingLines[0].meta_data.length > 1) {
      const displayValue = shippingLines[0].meta_data[1].display_value;
      return displayValue ? ' - ' + displayValue : '';
    }
    return '';
  };

  const getFormattedStatus = (status: string): string => {
    switch (status) {
    case 'separao':
      return 'Em separação';
    case 'pending':
      return 'Pagamento Pendente';
    case 'processing':
      return 'Processando';
    case 'failed':
      return 'Malsucedido';
    case 'cancelled':
      return 'Cancelado';
    case 'entregue':
      return 'Entregue';
    default:
      return status;
    }
  };

  const getStatusBackground = (status: string): React.CSSProperties => {
    const backgroundStyle: React.CSSProperties = {
      backgroundColor: '',
    };

    if (status === 'separao') {
      backgroundStyle.backgroundColor = 'yellow';
    } else if (status === 'pending') {
      backgroundStyle.backgroundColor = 'gray';
    } else if (status === 'enviado') {
      backgroundStyle.backgroundColor = '#006BA1';
    } else if (status === 'processing') {
      backgroundStyle.backgroundColor = '#C6E1C6';
    } else if (status === 'failed') {
      backgroundStyle.backgroundColor = '#EBA3A3';
    } else if (status === 'cancelled') {
      backgroundStyle.backgroundColor = '#E5E5E5';
    } else if (status === 'entregue') {
      backgroundStyle.backgroundColor = '#E9426E';
    }

    return backgroundStyle;
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
              <tr key={order.id} className='border'>
                <td className='px-4 py-2'>
                  {order.number} - <strong>{order.billing.first_name} {order.billing.last_name}</strong>
                </td>
                <td className='px-4 py-2'>{formatCurrency(order.total)}</td>
                <td className='px-4 py-2 uppercase' style={getStatusBackground(order.status)}>
                  {getFormattedStatus(order.status)}
                </td>
                <td className='px-4 py-2'>
                  {`${order.shipping_lines[0].method_title} `}
                  <strong>{getShippingLineDisplayValue(order.shipping_lines)}</strong>
                </td>
                <td className='px-4 py-2'>
                  {order.shipping_total !== '0.00' ? formatCurrency(parseFloat(order.shipping_total)) : ''}
                </td>
                <td className='flex'>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2'
                  >
    Editar
                  </button>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2'
                  >
    Imprimir
                  </button>
                </td>
              </tr>
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
