import { render } from "@testing-library/react";
import { Button, ButtonProps } from "../../components/ui/button";

describe("Button component - Unit Tests", () => {
  it("renders primary variant button correctly", () => {
    const { getByText } = render(<Button>Primary Button</Button>);
    const button = getByText("Primary Button");

    expect(button).toBeTruthy();
    const expectedClass =
    "rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm disabled:bg-slate-500 disabled:border-0 disabled:text-white focus-visible:ring-2 focus-visible:ring-offset- active:opacity-80 bg-green-800 text-white hover:bg-green-900";
    
    expectedClass.split(" ").forEach(className => {
      expect(button.classList.contains(className)).toBe(true);
    });

  });

  it("renders outline variant button correctly", () => {
    const variantProps: ButtonProps = { variant: "outline" };
    const { getByText } = render(<Button {...variantProps}>Outline Button</Button>);
    const button = getByText("Outline Button");
    expect(button).toBeTruthy();
    const expectedClass = "rounded-lg px-4 py-2 text-sm font-semibold outline-none shadow-sm disabled:bg-slate-500 disabled:border-0 disabled:text-white focus-visible:ring-2 focus-visible:ring-offset- active:opacity-80 border-2 border-green-900 text-green-900 hover:bg-zinc-100";
    expectedClass.split(" ").forEach(className => {
      expect(button.classList.contains(className)).toBe(true);
    });
  });

  it("renders with additional props", () => {
    const onClick = vi.fn();
    const disabled = true;
    const { getByText } = render(<Button onClick={onClick} disabled={disabled}>Click Me</Button>);
    const button = getByText("Click Me");

    expect(button).toBeTruthy();
  });
});
