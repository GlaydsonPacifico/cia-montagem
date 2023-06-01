import React, { useEffect, useState } from 'react';
import { WooCommerce } from '../../utils/api';
import { Order } from './OrderItem';

interface OrderEditProps {
  order: Order | undefined;
  onUpdateOrder: (editedOrder: Order) => void;
  onCancelEdit: () => void;
}

interface State {
  code: string;
  name: string;
}

const OrderEdit: React.FC<OrderEditProps> = ({ order, onUpdateOrder, onCancelEdit }) => {
  const [editedStatus, setEditedStatus] = useState<string>(order?.status || '');
  const [editedAddress1, setEditedAddress1] = useState<string>(order?.billing.address_1 || '');
  const [editedCity, setEditedCity] = useState<string>(order?.billing.city || '');
  const [editedNeighborhood, setEditedNeighborhood] = useState<string>(order?.billing.neighborhood || '');
  const [editedNumber, setEditedNumber] = useState<string>(order?.billing.number || '');
  const [editedPostCode, setEditedPostCode] = useState<string>(order?.billing.postcode || '');
  const [editedState, setEditedState] = useState<string>(order?.billing.state || '');

  const [states, setStates] = useState<State[]>([]);

  const  first_name = order?.billing.first_name || '';
  const last_name = order?.billing.last_name || '' ;

  console.log(order);

  const fetchStates = async () => {
    try {
      const { data } = await WooCommerce.get('data/countries/BR');
      const states = data.states;
      setStates(states);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setEditedStatus(event.target.value);
  };

  const handleAddress1Change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedAddress1(event.target.value);
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedCity(event.target.value);
  };

  const handleNeighborhoodChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedNeighborhood(event.target.value);
  };

  const handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedNumber(event.target.value);
  };

  const handlePostCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditedPostCode(event.target.value);
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setEditedState(event.target.value);
  };


  const handleSaveClick = (): void => {
    if (order) {
      const editedOrder: Order = {
        ...order,
        status: editedStatus,
        billing: {
          first_name,
          last_name,
          address_1: editedAddress1,
          city: editedCity,
          neighborhood: editedNeighborhood,
          number: editedNumber,
          postcode: editedPostCode,
          state: editedState,
        },
      };
      onUpdateOrder(editedOrder);
    }
  };

  const handleCancelClick = (): void => {
    onCancelEdit();
  };

  return (
    <div className='h-auto'>
      <h2 className='text-xl bold border-b-2 text-center p-2 mb-2'><strong>Editar Pedido</strong></h2>
      <h3 className='text-lg mb-4'><strong>Pedido #{order?.number} - </strong>{order?.billing.first_name} {order?.billing.last_name}</h3>
      <div className='bg-yellow-300 drop-shadow-md rounded'>
        <div className='flex drop-shadow-md'>
          <label className='text-sm px-4 py-2' htmlFor='status'><strong>Status:</strong></label>
          <div className="ml-auto px-4 py-2">
            <select className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 mb-4' id='status' value={editedStatus} onChange={handleStatusChange}>
              <option value='pending'>Pagamento Pendente</option>
              <option value='processing'>Processando</option>
              <option value='completed'>Concluído</option>
              <option value='cancelled'>Cancelado</option>
              <option value='entregue'>Entregue</option>
            </select>
          </div>
        </div>

        <div className='drop-shadow-md'>
          <h2 className='text-2xl text-center mb-4'><strong>Endereço de Entrega</strong></h2>
          <div className='flex justify-center'>

            <div>
              <div className='flex justify-between'>
                <label className='text-sm px-4 py-2' htmlFor='rua'><strong>Rua:</strong></label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-4 mb-2' type="text" value={editedAddress1} onChange={handleAddress1Change} />
              </div>
              <div className='flex justify-between'>
                <label className='text-sm px-4 py-2' htmlFor='numero'><strong>Número:</strong></label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-4 mb-2' type="text" value={editedNumber} onChange={handleNumberChange} />
              </div>
              <div className='flex justify-between'>
                <label className='text-sm px-4 py-2' htmlFor='bairro'><strong>Bairro:</strong></label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-4 mb-2' type="text" value={editedNeighborhood} onChange={handleNeighborhoodChange} />
              </div>
            </div>

            <div>
              <div className='flex justify-between'>
                <label className='text-sm px-4 py-2' htmlFor='cep'><strong>CEP:</strong></label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-4 mb-2' type="text" value={editedPostCode} onChange={handlePostCodeChange} />
              </div>
              <div className='flex justify-between'>
                <label className='text-sm px-4 py-2' htmlFor='cidade'><strong>Cidade:</strong></label>
                <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-4 mb-2' type="text" value={editedCity} onChange={handleCityChange} />
              </div>
              <div className='flex justify-between'>
                <label className='text-sm px-4 py-2' htmlFor='pais'><strong>Estado:</strong></label>
                <select
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg p-2.5 mb-4 w-full'
                  id='states'
                  value={editedState}
                  onChange={handleStateChange}
                >
                  {states.map((state) => (
                    <option key={state.code} value={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <div className='flex justify-start'>
            <div className='mb-8 mt-8'>
              <label className='text-sm px-4 py-2' htmlFor='rua'><strong>Cupom:</strong></label>
              <input className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 ml-4 mb-2' type="text" value={''} onChange={() => console.log('CHANGE')} />
            </div>
          </div>

        </div>

        <div className='m-5 flex justify-end items-center'>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-4' onClick={handleSaveClick}>Salvar</button>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-4' onClick={handleCancelClick}>Cancelar</button>
        </div>
      </div>
    </div>

  );
};

export default OrderEdit;
