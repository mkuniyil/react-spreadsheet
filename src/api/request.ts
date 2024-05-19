export interface DataResponse {
  id: string;
  status: string;
  done_at: string;
}

export const postData = async (data = {}) => {
  return fetch("http://localhost:8082/save", {
    method: "POST",
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename='data.csv'",
    },
    body: JSON.stringify(data),
  });
};

export const fetchStatus = async (id: string) => {
  return fetch(`http://localhost:8082/get-status?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
