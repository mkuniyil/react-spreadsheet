import { useCallback, useEffect, useRef, useState } from "react";
import { COLUMN_COUNT } from "../../config";
import { TableBody } from "../core/Table/TableBody";
import { TableHeader } from "../core/Table/TableHeader";

const createHeaders = (headers: Array<string>) => {
  return headers.map((item: string) => ({
    text: item,
    ref: useRef<HTMLTableCellElement>(null),
  }));
};

export const AppTable = () => {
  const [tableHeight, setTableHeight] = useState("auto");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tableElement = useRef<HTMLTableElement>(null);

  const alphabets = Array.from({ length: COLUMN_COUNT }, (_, i: number) =>
    String.fromCharCode(65 + i)
  );
  const columns = createHeaders(alphabets);

  useEffect(() => {
    if (tableElement.current)
      setTableHeight(`${tableElement.current.offsetHeight}px`);
  }, []);

  const mouseDown = (index: number) => setActiveIndex(index);
  const mouseMove = useCallback(
    (e: { clientX: number }) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          const width = col.ref.current?.offsetLeft
            ? e.clientX - col.ref.current?.offsetLeft
            : e.clientX;

          if (width >= 160) {
            return `${width}px`;
          }
        }

        return `${col.ref.current?.offsetWidth}px`;
      });

      if (tableElement.current)
        tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
          " "
        )}`;
    },
    [activeIndex, columns]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener("mousemove", mouseMove);
    window.removeEventListener("mouseup", removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  return (
    <div className="table-wrapper overflow-hidden mb-6">
      <table
        className="resizeable-table w-full overflow-auto grid grid-cols-26"
        ref={tableElement}
      >
        <TableHeader
          activeIndex={activeIndex}
          mouseDown={mouseDown}
          columns={columns}
          tableHeight={tableHeight}
        />

        <TableBody />
      </table>
    </div>
  );
};
