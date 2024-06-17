const checkColumnsFile = async (file: string): Promise<boolean> => {
  const lines = file.split("\n");
  if (lines.length <= 1) throw new Error("Arquivo vazio.");

  const columns = lines[0].trim().split(",");
  const expectedColumnsInFile = [
    "name",
    "governmentId",
    "email",
    "debtAmount",
    "debtDueDate",
    "debtId",
  ];

  const missingColumnsInFile = expectedColumnsInFile.filter(
    (column) => !columns.includes(column)
  );

  if (missingColumnsInFile.length > 0)
    throw new Error(
      `O arquivo CSV é inválido. Estão faltando as seguintes colunas obrigatórias: ${missingColumnsInFile.join(
        ", "
      )}`
    );

  return true;
};

export { checkColumnsFile };
