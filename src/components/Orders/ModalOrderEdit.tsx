import { ReactNode, useEffect, useState } from 'react';

interface ModalOrderEditProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalOrderEdit: React.FC<ModalOrderEditProps> = ({ children, isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    onClose();
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center'>
      <div className='w-[600px] flex flex-col'>
        <button className='text-white text-xl place-self-end' onClick={handleCloseModal}>X</button>
        <div className='bg-white p-2 rounded'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalOrderEdit;
