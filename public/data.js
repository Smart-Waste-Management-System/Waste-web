import Papa from 'papaparse';

export const parseCSV = async (file) => {
  return new Promise((resolve) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => resolve(results.data),
    });
  });
};
