import React from 'react';
import CellEntity from '../interfaces/CellEntity.interface.ts';
import TableEntity from '../interfaces/TableEntity.interface.ts';
import Row from './Row.tsx';


interface Props {
  table: TableEntity;
  handleRowDelete: (id: string) => void;
  setCells: (rowId: string, newCells: CellEntity[]) => voi;
}

const Table = ({ table, handleRowDelete, setCells }: Props) => {
  return <>
    {table.map((rowData) => {
      return (
        <tr key={rowData.id}>
          <Row
            {...rowData}
            onDelete={() => handleRowDelete(rowData.id)}
            setCells={(newCells: Array<CellEntity>) =>
              setCells(rowData.id, newCells)
            }
          />
        </tr>
      );
    })}</>;
};

export default Table;
