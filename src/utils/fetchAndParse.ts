export const fetchAndParse = async (url: string) => {
  let error = null;
  const response = await fetch(url);

  if (!response.ok) {
    error = new Error(response.statusText);
  }

  const res = await response.json();

  // Handling error inside status 200 response
  if (res.error) {
    error = new Error(res.error.message);
  }

  return { data: res || [], error };
};
