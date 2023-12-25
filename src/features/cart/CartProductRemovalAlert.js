// CartProductRemovalAlert.js

import React from 'react';
import Modal from 'react-modal';
import { useNotification } from '../Alert/useNotification';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CartProductRemovalAlert = ({ isOpen, onClose, onConfirm }) => {
  const { displayNotification } = useNotification();

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
    await displayNotification({
      message: 'Product deleted successfully',
    });
  };

  return (
      <Modal
        // style={customStyles}
        className='bg-white border rounded-md p-4 shadow-md max-w-md mx-auto duration-300 ease-in-out transform hover:scale-105
        absolute top-1/2 left-1/2 right-auto bottom-auto -translate-x-1/2 -translate-y-1/2'
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Product Removal Alert"
      >
        <h2 className='text-lg font-semibold mb-3'>Are you sure you want to remove this product from the cart?</h2>
        <div className="flex justify-end space-x-4">
        <button className='px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring focus:border-blue-300' onClick={handleConfirm}>Remove</button>
        <button className='px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300' onClick={onClose}>Cancel</button>
        </div>
      </Modal>
    );
};

export default CartProductRemovalAlert;
