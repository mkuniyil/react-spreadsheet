import { useCallback, useEffect, useState } from "react";
import { Data } from "../../AppProvider";
import { objectToCsv } from "../../utils/objectToCsv";
import { DataResponse, fetchStatus, postData } from "../request";

export const useSaveData = (appData: Data) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<DataResponse | null>(null);

  const saveData = useCallback(() => {
    const csvString = objectToCsv(appData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });

    setIsLoading(true);
    postData({ data: blob })
      .then((response) => response.json())
      .then((responseData: DataResponse) => {
        setData(responseData);
      })
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [appData]);

  const getStatus = useCallback((data: DataResponse) => {
    const timeDifference =
      new Date(data?.done_at).getTime() - new Date().getTime();
    let timer = timeDifference > 0 ? timeDifference : 0;

    setTimeout(() => {
      setIsLoading(true);
      fetchStatus(data?.id)
        .then((response) => response.json())
        .then((response) => {
          if (response.status === "IN_PROGRESS") getStatus(response);
        })
        .finally(() => setIsLoading(false));
    }, timer);
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const intervalId = setInterval(saveData, 30000);

    return () => clearInterval(intervalId);
  }, [isLoading, saveData]);

  useEffect(() => {
    if (isLoading || !data?.id) return;

    getStatus(data);
  }, [data, getStatus, isLoading]);
};
