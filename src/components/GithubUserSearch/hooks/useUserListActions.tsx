import { useState, useCallback, useEffect } from 'react';

import type { GithubUser } from './useGithubUserSearch';

type Return = {
  users: GithubUser[];
  selected: Set<number>;
  toggleSelect: (index: number) => void;
  duplicateSelected: () => void;
  deleteSelected: () => void;
  selectUsers: (users: number[]) => void;
};

/**
 * Custom hook to manage a list of GitHub users with selection, duplication, and deletion actions.
 * @param initialUsers - The initial list of users.
 * @returns An object containing the user list, selected users, and action handlers.
 */
export const useUserListActions = (initialUsers: GithubUser[] = []): Return => {
  const [users, setUsers] = useState<GithubUser[]>(initialUsers);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  /**
   * Toggle the selection state of a user by index.
   * If the user is already selected, it will be deselected and vice versa.
   */
  const toggleSelect = useCallback((index: number) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }, []);

  /**
   * Duplicate all selected users.
   * Each duplicated user receives a new unique index.
   */
  const duplicateSelected = useCallback(() => {
    setUsers(prev => [
      ...prev,
      ...prev.filter(user => selected.has(user.index)).map(user => ({
        ...user,
        index: user.index + Math.random(),
      }))
    ]);
    setSelected(new Set());
  }, [selected]);

  /**
   * Delete all selected users from the list.
   */
  const deleteSelected = useCallback(() => {
    setUsers(prev => prev.filter(user => !selected.has(user.index)));
    setSelected(new Set());
  }, [selected]);

  /**
   * Select all users by their index.
   */
  const selectUsers = (users: number[]) => {
    setSelected(new Set(users));
  };

  return {
    users,
    selected,
    toggleSelect,
    duplicateSelected,
    deleteSelected,
    selectUsers,
  };
};
