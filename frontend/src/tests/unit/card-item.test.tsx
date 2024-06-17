import { expect } from "vitest";
import { render } from "@testing-library/react";
import { ItemCard } from "../../components/ui/card-item";
import { format } from "date-fns";
import { BrowserRouter as Router } from "react-router-dom";

describe("ItemCard component - Unit Tests", () => {
  const testData = {
    id: "1",
    created_at: new Date(2024, 6, 15),
    size: "1048576",
    description: "Kanastra",
    amount_final: 1000,
  };

  it("renders description, size in MB, and formatted amount correctly", () => {
    const { getByText } = render(
      <Router>
        <ItemCard data={testData} />
      </Router>
    );

    const descriptionElement = getByText(testData.description);
    const sizeElement = getByText("1.00 MB");
    const amountElement = getByText("R$ 1.000,00");

    expect(descriptionElement).toBeTruthy();
    expect(sizeElement).toBeTruthy();
    expect(amountElement).toBeTruthy();
  });

  it("renders formatted date correctly", () => {
    const { getByText } = render(
      <Router>
        <ItemCard data={testData} />
      </Router>
    );

    const formattedDate = format(testData.created_at, "dd/MM/yy");
    const dateElement = getByText(formattedDate);

    expect(dateElement).toBeTruthy();
  });
});
