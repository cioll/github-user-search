import { renderHook, act } from "@testing-library/react";
import { useGithubUserSearch } from "../useGithubUserSearch";

(window as any).fetch = jest.fn();

describe("useGithubUserSearch", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns users after a successful search", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({
        items: [
          { id: 1, login: "doe", avatar_url: "avatar.png", html_url: "https://github.com/doe" }
        ]
      })
    });

    const { result } = renderHook(() => useGithubUserSearch());

    await act(async () => {
      await result.current.searchUsers("doe");
    });

    expect(result.current.users).toHaveLength(1);
    expect(result.current.users[0].login).toBe("doe");
    expect(result.current.error).toBeNull();
  });

  it("handles error if the request fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const { result } = renderHook(() => useGithubUserSearch());

    await act(async () => {
      await result.current.searchUsers("fail");
    });

    expect(result.current.users).toHaveLength(0);
    expect(result.current.error).not.toBeNull();
  });
});