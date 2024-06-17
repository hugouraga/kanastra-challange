import { expect } from "vitest";
import { render } from "@testing-library/react";
import { FileSelect } from "../../components/ui/file/file-select";

describe("Text FileSelect component", () => {
  it("renders correctly without error", async () => {
    const fileError = "";

    const { getByText } = render(
      <FileSelect fileError={fileError} />
    );

    expect(getByText("Selecionar arquivo")).toBeTruthy();
    expect(getByText("Clique para fazer upload")).toBeTruthy();
    expect(getByText("Arquivo .CSV")).toBeTruthy();
  });

  it("renders with file error message", async () => {
    const fileError = "Formato de arquivo inválido. Por favor, selecione um arquivo CSV.";

    const { getByText } = render(
      <FileSelect fileError={fileError} />
    );

    expect(getByText("Selecionar arquivo")).toBeTruthy();
    expect(getByText("Clique para fazer upload")).toBeTruthy();
    expect(getByText("Arquivo .CSV")).toBeTruthy();
    expect(getByText(fileError)).toBeTruthy();
  });
});
