import CellEntity from "./CellEntity.interface.ts";

interface RowEntity {
    id: string;
    cells: Array<CellEntity>;
}

export default RowEntity;
