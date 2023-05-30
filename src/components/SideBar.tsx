import React, { useState } from 'react';

interface SideBarProps {
  handleOrdersClick: () => void;
}

export const SideBar: React.FC<SideBarProps> = ({ handleOrdersClick  }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleShowOrders = () => {
    setOpen(false);
    handleOrdersClick();
  };

  return (
    <div className="bg-white py-3 fixed top-0 left-0 right-0 shadow-md">
      <button className='ml-4' onClick={() => setOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
        </svg>
      </button>

      <div className={`${!open && 'hidden'} bg-gray-300 bg-opacity-30 min-h-screen w-full fixed top-0 left-0 right-0 backdrop-blur-sm`} onClick={() => setOpen(false)} ></div>


      <div className={`bg-amber-300 w-52 min-h-screen fixed top-0 left-0 transition-colors duration-300 ${open ? '' : 'hidden'}`}>


        <div className={`${!open && 'hidden'} pt-3`}>
          <button className="ml-4 text-white mb-2" onClick={() => setOpen(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex h-full justify-center items-center">
            <img className="w-6/12" src="./LogoCia.png" alt="Logo-Cia" />
          </div>

          <div className="text-white text-2xl flex gap-3 items-center py-3" onClick={handleShowOrders}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
            </svg>
            <span className="group relative cursor-pointer">
              Pedidos
              <span className="absolute bottom-0 right-0 w-full h-1 bg-white transform origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </div>

          <div className="text-white text-2xl flex gap-3 items-center py-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            <span className="group relative cursor-pointer">
              Produtos
              <span className="absolute bottom-0 right-0 w-full h-1 bg-white transform origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </div>

          <div className="text-white text-2xl flex gap-3 items-center py-3">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="group relative cursor-pointer">
              Clientes
              <span className="absolute bottom-0 right-0 w-full h-1 bg-white transform origin-right scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
