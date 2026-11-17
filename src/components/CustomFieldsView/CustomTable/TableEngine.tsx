import React, { useEffect, useRef, useState } from 'react';
import TableEntity from './interfaces/TableEntity.interface';
import CellEntity from './interfaces/CellEntity.interface';
import ColumnDeleteList from './components/ColumnDeleteList';
import Table from './components/Table';

const DEFAULT_ROW_LENGTH = 3;

interface Props {
  initialData: string;
  setInput: (input: string) => void;
}

const TableEngine = ({ initialData, setInput }: Props) => {
  const [table, setTable] = useState<TableEntity>([]);
  const [isFirstRowHeader, setIsFirstRowHeader] = useState(false);
  const [isFirstColumnHeader, setIsFirstColumnHeader] = useState(false);
  const isFirstRender = useRef(true);

  const isTableEmpty = table.length === 0;

  useEffect(() => {
    if (initialData === null) {
      return;
    }

    let parsedData;

    try {
      parsedData = JSON.parse(initialData) as {
        table: TableEntity;
        isFirstRowHeader: boolean;
        isFirstColumnHeader: boolean;
      };
    } catch {
      return;
    }

    if (parsedData.table.length === 0) {
      return;
    }

    setTable(parsedData.table);
    setIsFirstRowHeader(parsedData.isFirstRowHeader);
    setIsFirstColumnHeader(parsedData.isFirstColumnHeader);
  }, []);

  useEffect(() => {
    if (isFirstRender.current === true) {
      setTimeout(() => {
        isFirstRender.current = false;
      }, 250);
      return;
    }

    const allData = {
      table,
      isFirstRowHeader,
      isFirstColumnHeader,
    };

    try {
      const serializedData = JSON.stringify(allData);
      setInput(serializedData);
    } catch {
      return;
    }
  }, [isFirstColumnHeader, isFirstRowHeader, table]);

  useEffect(() => {
    setAccentForTheFirstColumn(table, isFirstColumnHeader, isFirstRowHeader);
    setAccentForTheFirstRow(table, isFirstRowHeader, isFirstColumnHeader);

    function setAccent(
      table: TableEntity,
      mutationFn: (table: TableEntity) => TableEntity
    ) {
      if (table.length === 0) {
        return;
      }

      table = [...table];

      table = mutationFn(table);

      setTable(table);
    }

    function setAccentForTheFirstRow(
      table: TableEntity,
      isAccent: boolean,
      isOtherApplied: boolean
    ) {
      const mutationFn = (table: TableEntity) => {
        table = [...table];

        table[0].cells.forEach((cell, index) => {
          const shouldSkipFirstItem = index === 0 && isOtherApplied;

          if (shouldSkipFirstItem) {
            return;
          }

          cell.isAccent = isAccent;
        });

        return table;
      };

      return setAccent(table, mutationFn);
    }

    function setAccentForTheFirstColumn(
      table: TableEntity,
      isAccent: boolean,
      isOtherApplied: boolean
    ) {
      const mutationFn = (table: TableEntity) => {
        table = table.map((row, index) => {
          const shouldSkipFirstItem = index === 0 && isOtherApplied;

          if (shouldSkipFirstItem) {
            return;
          }

          row.cells[0].isAccent = isAccent;

          return row;
        });

        return table;
      };

      return setAccent(table, mutationFn);
    }
  }, [
    isFirstColumnHeader,
    isFirstRowHeader,
    table.length,
    table[0]?.cells?.length,
  ]);

  const handleRowAdd = () => {
    const rowLength = getOriginalRowLengthOf(table);

    let tableCopy = [...table];
    tableCopy = addRowTo(tableCopy, rowLength);

    setTable(tableCopy);

    function getOriginalRowLengthOf(table) {
      return table[0]?.cells?.length || DEFAULT_ROW_LENGTH;
    }

    function addRowTo(table, amount) {
      if (amount <= 0) {
        throw new Error();
      }

      table.push({
        id: crypto.randomUUID(),
        cells: (() => {
          const array: Array<CellEntity> = [];

          for (let i = 0; i < amount; i++) {
            array.push({
              id: crypto.randomUUID(),
              isAccent: false,
              content: '',
            });
          }

          return array;
        })(),
      });

      return table;
    }
  };

  const handleColumnAdd = () => {
    if (isTableEmpty) {
      handleRowAdd();
      return;
    }

    let tableCopy = [...table];
    tableCopy = getTableWithAddedRow(tableCopy);

    setTable(tableCopy);

    function getTableWithAddedRow(table: TableEntity) {
      return table.map((row) => {
        row.cells.push({
          id: crypto.randomUUID(),
          isAccent: false,
          content: '',
        });

        return row;
      });
    }
  };

  const setCells = (rowId: string, newCells: Array<CellEntity>) => {
    const index = table.findIndex(({ id }) => id === rowId);

    if (index === -1) {
      return;
    }

    setTable((table) => {
      table = [...table];
      const row = table[index];

      row.cells = newCells;

      return table;
    });
  };

  const handleRowDelete = (givenId: string) => {
    const index = table.findIndex(({ id }) => id === givenId);

    if (index === -1) {
      return;
    }

    let tableCopy = [...table];
    tableCopy.splice(index, 1);

    setTable(tableCopy);
  };

  return (
    <div className={'space-y-2'}>
      <div className={'flex items-center gap-2 my-1.5'}>
        <p className={'text-[12px]'}>Елементи:</p>
        <div className={'flex gap-2'}>
          <button
            onClick={handleRowAdd}
            className={
              'icon-parent inline-flex items-center font-medium focus:outline-none focus:ring-2 focus:shadow-outline text-center justify-center transition-all duration-150 ease-out  shadow text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-500 border-0 text-[12px] h-10 px-4  rounded-full '
            }
          >
            Додати рядок
          </button>
          <button
            onClick={handleColumnAdd}
            className={
              'icon-parent inline-flex items-center font-medium focus:outline-none focus:ring-2 focus:shadow-outline text-center justify-center transition-all duration-150 ease-out  shadow text-white bg-blue-400 hover:bg-blue-500 focus:ring-blue-500 border-0 text-[12px] h-10 px-4  rounded-full '
            }
          >
            Додати стовпець
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <p className={'text-[12px]'}>Налаштування:</p>
        <div className="flex items-center gap-2">
          <label
            htmlFor={'isFirstColumnHeader'}
            className={'block text-[12px] font-medium text-gray-700'}
          >
            Перший стовпець – заголовочний
          </label>
          <input
            type="checkbox"
            name={'isFirstColumnHeader'}
            className={
              'toggle-checkbox w-6 h-6 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-indigo-500'
            }
            onChange={() => setIsFirstColumnHeader((prevState) => !prevState)}
            checked={isFirstColumnHeader && !isTableEmpty}
            disabled={isTableEmpty}
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor={'isFirstRowHeader'}
            className={'block text-[12px] font-medium text-gray-700'}
          >
            Перший рядок – заголовочний
          </label>
          <input
            type="checkbox"
            name={'isFirstRowHeader'}
            className={
              'toggle-checkbox w-6 h-6 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-indigo-500'
            }
            onChange={() => setIsFirstRowHeader((prevState) => !prevState)}
            checked={isFirstRowHeader && !isTableEmpty}
            disabled={isTableEmpty}
          />
        </div>
      </div>

      <p className={'text-[12px]'}>
        Комірки ({table[0]?.cells?.length || 0}x{table.length || 0}):
      </p>

      <div className={'overflow-scroll'}>
        <table>
          <tbody>
            <ColumnDeleteList table={table} setTable={setTable} />
            <Table
              table={table}
              // @ts-expect-error bad typing in Astro
              setTable={setTable}
              handleRowDelete={handleRowDelete}
              setCells={setCells}
            />
          </tbody>
        </table>
      </div>

      {isTableEmpty && (
        <span
          className={
            'block font-sans text-xs font-normal text-red-500 pt-3 animate-slide-in whitespace-normal m-0  undefined'
          }
        >
          Має бути хоча би одна комірка
        </span>
      )}
    </div>
  );
};
export default TableEngine;
