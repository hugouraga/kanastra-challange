import { describe, it, expect } from "vitest";
import { csvToArray } from "@/utils/csvToArray";

describe("csvToArray - Unit Tests", () => {
  it("should convert CSV to array of objects", async () => {
    const csvContent =
      `name,governmentId,email,debtAmount,debtDueDate,debtId\n` +
      `John Doe Kanastra,123456789,johnDoeKanastra@example.com,1000,2024-01-01,kanastra-id\n` +
      `Hugo Uraga Kanastra,11822425117,hugouraga@kanastra.com,2000,2024-06-01,kanastra-id-2`;
    const result = await csvToArray(csvContent);
    // console.log(result);

    expect(result).toEqual([
      {
        name: "John Doe Kanastra",
        governmentId: "123456789",
        email: "johnDoeKanastra@example.com",
        debtAmount: "1000",
        debtDueDate: "2024-01-01",
        debtId: "kanastra-id",
      },
      {
        name: "Hugo Uraga Kanastra",
        governmentId: "11822425117",
        email: "hugouraga@kanastra.com",
        debtAmount: "2000",
        debtDueDate: "2024-06-01",
        debtId: "kanastra-id-2",
      },
    ]);
  });

  it("should throw error for empty CSV file", async () => {
    const csvContent = "";
    await expect(csvToArray(csvContent)).rejects.toThrow("Arquivo CSV vazio.");
  });
});
