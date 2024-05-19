import { FC, SetStateAction, useEffect, useState } from "react";
import { VscEdit } from "react-icons/vsc";
import { useAppContext } from "../../../AppProvider";
import { COLUMN_COUNT } from "../../../config";

type CellProps = {
  columnName: string;
  rowIndex: number;
  index: number;
};

export const Cell: FC<CellProps> = ({ columnName, rowIndex, index }) => {
  const { data, setCellValue, computeCell } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(
    computeCell(
      data[`${columnName}${rowIndex}`]?.value || "",
      `${columnName}${rowIndex}`
    )
  );

  useEffect(() => {
    setValue(
      computeCell(
        data[`${columnName}${rowIndex}`]?.value || "",
        `${columnName}${rowIndex}`
      )
    );
  }, [columnName, computeCell, data, rowIndex]);

  const handleEdit = () => {
    setValue(data[`${columnName}${rowIndex}`]?.value || "");
    setIsEditing(true);
  };

  const handleBlur = () => {
    const computedValue = computeCell(value, `${columnName}${rowIndex}`);

    if (value !== computedValue) setValue(computedValue);

    setIsEditing(false);
    setCellValue({
      row: rowIndex,
      column: columnName,
      value: value,
    });
  };

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
  };

  return (
    <td
      className={`min-w-40 border-r border-solid border-gray-200 h-10 bg-gray-50 mb-2 ${
        index === 0 ? "rounded-l" : ""
      } ${index === COLUMN_COUNT - 1 ? "rounded-r" : ""}`}
    >
      {isEditing ? (
        <input
          type="text"
          className="h-full w-full"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div className="grid grid-cols-[auto_25px] items-center h-full ">
          <div className="flex justify-center justify-items-center ">
            <span>{value}</span>
          </div>
          <VscEdit onClick={handleEdit} />
        </div>
      )}
    </td>
  );
};
