import { describe, it, expect } from "vitest";
import { checkColumnsFile } from "@/utils/csvCheckColumns";

describe("checkColumnsFile - Unit Tests", () => {
  it("should return true for a valid file", async () => {
    const fileContent =
      `name,governmentId,email,debtAmount,debtDueDate,debtId\n` +
      `John Doe Kanastra,123456789,johnDoeKanastra@example.com,1000,2024-01-01,kanastra-id`;
    const result = await checkColumnsFile(fileContent);
    expect(result).toBe(true);
  });

  it("should throw an error for an empty file", async () => {
    const fileContent = ``;
    await expect(checkColumnsFile(fileContent)).rejects.toThrow(
      "Arquivo vazio."
    );
  });

  it("should throw an error if required columns are missing", async () => {
    const fileContent = `name,governmentId,email\n`;
    await expect(checkColumnsFile(fileContent)).rejects.toThrow(
      "O arquivo CSV é inválido. Estão faltando as seguintes colunas obrigatórias: debtAmount, debtDueDate, debtId"
    );
  });
});
