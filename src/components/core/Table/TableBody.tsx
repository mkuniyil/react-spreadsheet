import { Row } from "./Row";

export const TableBody = () => {
  const rows = Array.from({ length: 50 });

  return (
    <tbody className="contents">
      {rows.map((_, index) => {
        return <Row key={index} rowIndex={index} />;
      })}
    </tbody>
  );
};
