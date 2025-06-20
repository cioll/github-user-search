import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("returns the value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "a", delay: 500 } }
    );

    expect(result.current).toBe("a");
    rerender({ value: "b", delay: 500 });
    expect(result.current).toBe("a");

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe("b");
  });
});