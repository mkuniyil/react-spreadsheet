export const objectToCsv = (data: any) => {
  const headers = Object.keys(data);

  // Build the CSV content by converting key-value pairs to rows
  const csvContent = [
    headers.join(","), // Add header row
    ...Object.entries(data).map(([key, value]) => `${key},${value}`),
  ];

  // Join rows with newline characters
  return csvContent.join("\n");
};
