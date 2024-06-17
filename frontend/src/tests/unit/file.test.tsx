/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { FileUploader } from "../../components/ui/file/index";
import AppProvider from "@/contexts";

describe("FileUploader component", () => {
  it("handles file upload correctly", async () => {
    const { getByText, container  } = render(
      <AppProvider>
        <FileUploader />
      </AppProvider>
    );

    const csvData =
    `name,governmentId,email,debtAmount,debtDueDate,debtId\n` +
    `John Doe Kanastra,123456789,johnDoeKanastra@example.com,1000,2024-01-01,kanastra-id\n` +
    `Hugo Uraga Kanastra,11822425117,hugouraga@kanastra.com,2000,2024-06-01,kanastra-id-2`;

    const file = new File([csvData], "test.csv", { type: "text/csv" });
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toBe(file);
    
    expect(getByText("Selecionar arquivo")).toBeTruthy();
    expect(getByText(`Carregando...`)).toBeTruthy();
  });
});
