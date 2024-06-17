export interface CSVRow {
  [key: string]: string;
}

const csvToArray = async (file: string): Promise<CSVRow[]> => {
  const lines = file.split("\n");

  if (lines.length <= 1) throw new Error("Arquivo CSV vazio.");

  const headers = lines[0].trim().split(",");
  const rows: CSVRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].trim().split(",");
    const row: CSVRow = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j];
    }
    rows.push(row);
  }

  return rows;
};

export { csvToArray };
