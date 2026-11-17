import React from 'react';
import { MdCancel } from 'react-icons/md';

interface Props {
  confirmMessage: string;
  onDelete: () => void;
}

const DeleteButton = ({ confirmMessage, onDelete }: Props) => {
  const handleClick = () => {
    if (!confirm(confirmMessage)) {
      return;
    }
    onDelete();
  };

  return (
    <div
      className={
        'icon-parent inline-flex items-center border border-transparent text-sm font-medium focus:outline-none focus:ring-2 focus:shadow-outline text-center justify-center transition-all duration-150 ease-out rounded-full  shadow text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-500 h-7 w-7'
      }
      onClick={handleClick}
    >
      <MdCancel />
    </div>
  );
};

export default DeleteButton;
