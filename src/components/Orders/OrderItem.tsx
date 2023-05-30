import React from 'react';
import { formatCurrency } from '../../utils/formatCurrency';

export interface Order {
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

interface OrderItemProps {
  order: Order;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const getShippingLineDisplayValue = (): string => {
    if (order.shipping_lines.length > 0 && order.shipping_lines[0].meta_data.length > 1) {
      const displayValue = order.shipping_lines[0].meta_data[1].display_value;
      return displayValue ? ' - ' + displayValue : '';
    }
    return '';
  };

  const getFormattedStatus = (): string => {
    switch (order.status) {
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
      return order.status;
    }
  };

  const getStatusBackground = (): React.CSSProperties => {
    const backgroundStyle: React.CSSProperties = {
      backgroundColor: '',
    };

    switch (order.status) {
    case 'separao':
      backgroundStyle.backgroundColor = 'yellow';
      break;
    case 'pending':
      backgroundStyle.backgroundColor = 'gray';
      break;
    case 'enviado':
      backgroundStyle.backgroundColor = '#006BA1';
      break;
    case 'processing':
      backgroundStyle.backgroundColor = '#C6E1C6';
      break;
    case 'failed':
      backgroundStyle.backgroundColor = '#EBA3A3';
      break;
    case 'cancelled':
      backgroundStyle.backgroundColor = '#E5E5E5';
      break;
    case 'entregue':
      backgroundStyle.backgroundColor = '#E9426E';
      break;
    default:
      break;
    }

    return backgroundStyle;
  };

  return (
    <tr className='border'>
      <td className='px-4 py-2'>
        {order.number} - <strong>{order.billing.first_name} {order.billing.last_name}</strong>
      </td>
      <td className='px-4 py-2'>{formatCurrency(order.total)}</td>
      <td className='px-4 py-2 uppercase' style={getStatusBackground()}>
        {getFormattedStatus()}
      </td>
      <td className='px-4 py-2'>
        {`${order.shipping_lines[0].method_title} `}
        <strong>{getShippingLineDisplayValue()}</strong>
      </td>
      <td className='px-4 py-2'>
        {order.shipping_total !== '0.00' ? formatCurrency(parseFloat(order.shipping_total)) : ''}
      </td>
      <td className='flex'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2'>
          Editar
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2'>
          Imprimir
        </button>
      </td>
    </tr>
  );
};

export default OrderItem;
