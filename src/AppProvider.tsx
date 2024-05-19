import React, { useCallback, useContext, useState } from "react";
import { calculateCellValue } from "./utils/calculateCellValue";
import { useSaveData } from "./api/hooks/useSaveData";

export interface Data {
  [key: string]: {
    value: string;
    dependant: Array<string>;
    dependancy: Array<string>;
  };
}

interface AppContextData {
  data: Data;
  setCellValue: ({ row, column, value }: SetCellValue) => void;
  computeCell: (value: string, key: string) => string;
  getCurrentValue: (columnName: string, index: number) => void;
}

interface SetCellValue {
  row: number;
  column: string;
  value: string;
}

export const AppContext = React.createContext<AppContextData | null>(null);

export const AppProvider = ({ children }: { children: any }) => {
  const [data, setData] = useState<Data>({});

  useSaveData(data);

  const setCellValue = useCallback(
    ({ row, column, value }: SetCellValue) => {
      const newData = { ...data };

      newData[`${column}${row}`] = {
        value,
        dependant: newData[`${column}${row}`]?.dependant || [],
        dependancy: newData[`${column}${row}`]?.dependancy || [],
      };
      setData(newData);
    },
    [data, setData]
  );

  const getCurrentValue = (columnName: string, i: number) =>
    data[`${columnName}${i}`];

  const computeCell = useCallback(
    (value: string, key: string) => calculateCellValue(data, value, key),
    [data]
  );

  return (
    <AppContext.Provider
      value={{ data, setCellValue, computeCell, getCurrentValue }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error("context must be used inside a provider");
  }

  return appContext;
};
