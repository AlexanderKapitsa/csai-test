import React, { ChangeEvent } from 'react';
import CellEntity from '../interfaces/CellEntity.interface.ts';
import RowEntity from '../interfaces/RowEntity.interface.ts';
import Cell from './Cell.tsx';
import DeleteButtonRow from './DeleteButtonRow.tsx';

interface RowProps extends RowEntity {
  setCells: (newCells: Array<CellEntity>) => void;
  onDelete: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const Row = ({ id, cells, setCells, onDelete }: RowProps) => {
  const handleCellChange =
    (cellId: string) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newCellValue: string = event.target.value;

      const cellIndex = cells.findIndex(({ id }) => {
        return id === cellId;
      });

      if (cellIndex === -1) {
        return;
      }

      cells = [...cells];
      const cellToChange = cells[cellIndex];

      cellToChange.content = newCellValue;

      setCells(cells);
    };

  return (
    <>
      {cells.map((cellData) => (
        <td key={cellData.id}>
          <Cell {...cellData} onChange={handleCellChange(cellData.id)} />
        </td>
      ))}
      <td>
        <DeleteButtonRow onDelete={onDelete} />
      </td>
    </>
  );
};

export default Row;
