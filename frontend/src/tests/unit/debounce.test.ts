// src/hooks/__tests__/useDebounce.test.ts

import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "@/hooks/debounce";
import { describe, it, expect, vi } from "vitest";

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should return the updated value after the debounce delay", async () => {
    vi.useFakeTimers();
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );
    rerender({ value: "updated", delay: 500 });
    expect(result.current).toBe("initial");
    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe("updated");
  });
});
