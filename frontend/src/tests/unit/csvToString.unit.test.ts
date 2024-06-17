import { describe, it, expect } from "vitest";
import { csvToString } from "@/utils/csvToString";

describe("csvToString - Unit Tests", () => {
  it("should convert a File to string", async () => {
    const csvData =
      `name,governmentId,email,debtAmount,debtDueDate,debtId\n` +
      `John Doe Kanastra,123456789,johnDoeKanastra@example.com,1000,2024-01-01,kanastra-id\n` +
      `Hugo Uraga Kanastra,11822425117,hugouraga@kanastra.com,2000,2024-06-01,kanastra-id-2`;
    const file = new File([csvData], "test.csv", { type: "text/csv" });
    // console.log(file);
    const result = await csvToString(file);
    expect(result).toContain(
      "name,governmentId,email,debtAmount,debtDueDate,debtId"
    );
    expect(result).toContain(
      "John Doe Kanastra,123456789,johnDoeKanastra@example.com,1000,2024-01-01,kanastra-id"
    );
    expect(result).toContain(
      "Hugo Uraga Kanastra,11822425117,hugouraga@kanastra.com,2000,2024-06-01,kanastra-id-2"
    );
  });
});
