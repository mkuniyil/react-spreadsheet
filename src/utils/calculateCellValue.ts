import { evaluate } from "mathjs";
import { Data } from "../AppProvider";

export const calculateCellValue = (data: Data, value: string, key: string) => {
  if (!value) return "";
  if (value.charAt(0) !== "=") {
    // computing dependant cell values
    data[key]?.dependant?.forEach((item) =>
      calculateCellValue(data, data[item]?.value, "")
    );
    return value || "";
  }

  const expression = value
    .slice(1)
    .replace(/\s/g, "")
    .replace(/([A-Z])0+(\d)/g, "$1$2"); // replacing multiple zeros

  const cellReferenceRegex = /\b([A-Z]+[0-9]+)\b/g;

  const replaceCellReferences = (formula: string, data: Data) =>
    formula.replace(cellReferenceRegex, (match) => {
      if (data[match])
        data[match].dependant = [
          ...new Set(data[match]?.dependant?.concat([key])),
        ];

      return data[match]?.value || "0";
    });

  try {
    return evaluate(replaceCellReferences(expression, data));
  } catch (error) {
    return "ERROR!";
  }
};
