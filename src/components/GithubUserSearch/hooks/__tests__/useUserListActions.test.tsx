import { renderHook, act } from "@testing-library/react";
import { useUserListActions } from "../useUserListActions";
import type { GithubUser } from "../useGithubUserSearch";

const users: GithubUser[] = [
  { id: 1, index: 0, avatar: "avatar.png", login: "doe", url: "https://github.com/doe" },
  { id: 2, index: 1, avatar: "avatar2.png", login: "john", url: "https://github.com/john" }
];

describe("useUserListActions", () => {
  it("toggleSelect select and deselect a user", () => {
    const { result } = renderHook(() => useUserListActions(users));
    act(() => result.current.toggleSelect(0));
    expect(result.current.selected.has(0)).toBe(true);
    act(() => result.current.toggleSelect(0));
    expect(result.current.selected.has(0)).toBe(false);
  });

  it("duplicateSelected duplicate selected users", () => {
    const { result } = renderHook(() => useUserListActions(users));
    act(() => result.current.toggleSelect(0));
    act(() => result.current.duplicateSelected());
    expect(result.current.users.length).toBe(3);
  });

  it("deleteSelected delete selected users", () => {
    const { result } = renderHook(() => useUserListActions(users));
    act(() => result.current.toggleSelect(0));
    act(() => result.current.deleteSelected());
    expect(result.current.users.length).toBe(1);
    expect(result.current.users[0].login).toBe("john");
  });

  it("selectUsers select multiple users", () => {
    const { result } = renderHook(() => useUserListActions(users));
    act(() => result.current.selectUsers([0, 1]));
    expect(result.current.selected.has(0)).toBe(true);
    expect(result.current.selected.has(1)).toBe(true);
  });
});