import React from 'react';
import DeleteButton from './DeleteButton.tsx';

interface Props {
  onDelete: () => void;
}

const MESSAGE = 'Ви впевнені, що хочете видалити рядок?';

const DeleteButtonRow = ({ onDelete }: Props) => {
  return <DeleteButton confirmMessage={MESSAGE} onDelete={onDelete} />;
};

export default DeleteButtonRow;
