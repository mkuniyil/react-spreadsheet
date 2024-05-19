import { FC, Ref } from "react";
import { COLUMN_COUNT } from "../../../config";

type Columns = {
  text: string;
  ref: Ref<HTMLTableCellElement>;
};

type TableHeaderProps = {
  activeIndex: number | null;
  mouseDown: (activeIndex: number) => void;
  columns: Array<Columns>;
  tableHeight: string;
};

export const TableHeader: FC<TableHeaderProps> = ({
  activeIndex,
  mouseDown,
  columns,
  tableHeight,
}) => {
  return (
    <thead className="contents">
      <tr className="contents">
        {columns.map(({ text, ref }: Columns, i: number) => (
          <th
            ref={ref}
            key={text}
            className={`relative bg-slate-200 p-2 mb-4 ${
              i === 0 ? "rounded-l" : ""
            } ${i === COLUMN_COUNT - 1 ? "rounded-r" : ""}`}
          >
            <span>{text}</span>
            <div
              style={{ height: tableHeight }}
              onMouseDown={() => mouseDown(i)}
              className={`hover:border-gray-300 block absolute cursor-col-resize w-2 right-0 top-0 z-1 border-r-2 border-solid border-transparent ${
                activeIndex === i ? "border-gray-400" : ""
              }`}
            />
          </th>
        ))}
      </tr>
    </thead>
  );
};
