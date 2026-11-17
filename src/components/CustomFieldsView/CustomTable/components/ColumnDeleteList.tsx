import React from 'react';
import TableEntity from '../interfaces/TableEntity.interface.ts';
import DeleteButtonColumn from './DeleteButtonColumn.tsx';
import RowEntity from '../interfaces/RowEntity.interface.ts';

interface Props {
  table: TableEntity;
  setTable: (
    value: ((prevState: RowEntity[]) => RowEntity[]) | RowEntity[]
  ) => void;
}

const ColumnDeleteList = ({ table, setTable }: Props) => {
  const tableLength = table[0]?.cells?.length || 0;

  const handleDeleteWrapper = (columnIndexToRemove: number) => () => {
    if (columnIndexToRemove < 0) {
      throw new Error();
    }

    let tableCopy = [...table];
    tableCopy = deleteColumnAtIndexOf(tableCopy, columnIndexToRemove);
    tableCopy = removeEmptyRowsOf(tableCopy);

    setTable(tableCopy);

    function deleteColumnAtIndexOf(table: TableEntity, columnIndex: number) {
      table.map((row) => {
        row.cells.splice(columnIndex, 1);

        return row;
      });

      return table;
    }

    function removeEmptyRowsOf(table: TableEntity) {
      table = [...table];

      for (let i = 0; i < table.length; ) {
        const row = table[i];

        if (row.cells.length !== 0) {
          i++;
          continue;
        }

        table.splice(i, 1);
      }

      return table;
    }
  };

  return (
    <tr>
      {Array.from(Array(tableLength)).map((_, index) => (
        <td className={'text-center'} key={index}>
          <DeleteButtonColumn onDelete={handleDeleteWrapper(index)} />
        </td>
      ))}
    </tr>
  );
};

export default ColumnDeleteList;
