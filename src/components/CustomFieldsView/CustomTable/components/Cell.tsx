import React, { ChangeEvent } from 'react';
import CellEntity from '../interfaces/CellEntity.interface.ts';

interface CellProps extends CellEntity {
  id: string;
  isAccent: boolean;
  content: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Cell = ({ id, content, onChange, isAccent }: CellProps) => {
  return (
    <textarea
      name={id}
      id={id}
      value={content}
      onChange={onChange}
      autoComplete={'off'}
      rows={4}
      className={
        'w-[320px] shadow-inner text-base m-1.5 px-3 py-2 text-gray-600 resize-none focus:shadow-outline focus:border-blue-500 block border border-gray-200 focus:text-gray-900 rounded-md bg-white'
      }
      style={{
        backgroundColor: isAccent ? 'lightgray' : 'revert',
      }}
    ></textarea>
  );
};

export default Cell;
