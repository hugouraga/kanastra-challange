import React from 'react';

interface ItemsMessageProps {
  message: string;
  subMessage: string;
}

const ItemsMessage: React.FC<ItemsMessageProps> = ({ message, subMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-4 bg-gray-100 rounded-lg py-40">
      <h1 className="text-xl font-semibold text-gray-700 mb-2">{message}</h1>
      <p className="text-gray-500">{subMessage}</p>
    </div>
  );
};

export default ItemsMessage;