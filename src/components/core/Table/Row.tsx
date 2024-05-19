import { FC } from "react";
import { Cell } from "./Cell";
import { COLUMN_COUNT } from "../../../config";

type RowProps = { rowIndex: number };

export const Row: FC<RowProps> = ({ rowIndex }) => {
  const columns = Array.from({ length: COLUMN_COUNT });

  const getColumnName = (i: number) => String.fromCharCode(65 + i);

  return (
    <tr className=" contents">
      {columns.map((_, index: number) => (
        <Cell
          key={`${getColumnName(index)}${index}`}
          rowIndex={rowIndex}
          columnName={getColumnName(index)}
          index={index}
        />
      ))}
    </tr>
  );
};
