// FileInfo.test.tsx

import { expect } from "vitest";
import { render } from "@testing-library/react";

import * as mockUseFileContext from "@/contexts/file";
import * as mockUseErrorContext from "@/contexts/error";
import { FileInfo } from "../../components/ui/file/file-info";
import AppProvider from "@/contexts";

const useFileSpy = vi.spyOn(mockUseFileContext, "UseFileContext");
const useErrorSpy = vi.spyOn(mockUseErrorContext, "UseErrorContext");
const csvData =
`name,governmentId,email,debtAmount,debtDueDate,debtId\n` +
`John Doe Kanastra,123456789,johnDoeKanastra@example.com,1000,2024-01-01,kanastra-id\n` +
`Hugo Uraga Kanastra,11822425117,hugouraga@kanastra.com,2000,2024-06-01,kanastra-id-2`;

const mockFile = new File([csvData], "test.csv", { type: "text/csv" });

beforeEach(() => {
  useFileSpy.mockReturnValue({
    state: {
      fileUpload: mockFile,
      isLoading: false,
      isSuccessUploadNewFile: false,
      isErrorUploadNewFile: false,
      errorLoadingFile: "",
      filePreview: null,
      fileList: [],
      chargeList: [],
      charge: null,
      file: null
    },
    dispatch: function (): void {
      throw new Error("Function not implemented.");
    }
  });

  useErrorSpy.mockReturnValue({
    stateError: {
      isError: false,
      errorMessage: {
        title: "",
        message: ""
      }
    },
    dispatchError: function (): void {
      throw new Error("Function not implemented.");
    }
  });
});

describe("Test FileInfo component", () => {
  useFileSpy.mockReturnValue({
    state: {
      fileUpload: mockFile,
      isLoading: false,
      isSuccessUploadNewFile: false,
      isErrorUploadNewFile: false,
      errorLoadingFile: "",
      filePreview: null,
      fileList: [],
      chargeList: [],
      charge: null,
      file: null
    },
    dispatch: function (): void {
      throw new Error("Function not implemented.");
    }
  })
  it("renders file details correctly", async () => {
    const { getByText } = render(
    <AppProvider>
      <FileInfo />
    </AppProvider>
    );

    expect(getByText("Detalhes do arquivo")).toBeTruthy();
    expect(getByText("Nome:")).toBeTruthy();
    expect(getByText("test.csv")).toBeTruthy();
    expect(getByText("Tipo:")).toBeTruthy();
    expect(getByText("text/csv")).toBeTruthy();

  });
});
