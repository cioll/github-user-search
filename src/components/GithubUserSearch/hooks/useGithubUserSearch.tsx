import { useState } from 'react';

import en from '../../../locales/en';

export type GithubUser = {
  index: number;
  id: number;
  avatar: string;
  login: string;
  url: string;
}

export type Return = {
  users: GithubUser[];
  loading: boolean;
  error: string | null;
  searchUsers: (query: string) => Promise<void>;
}

/**
 * Custom hook to search for GitHub users.
 * @returns An object containing the user list, loading state, error state, and a function to search for users.
 */
export const useGithubUserSearch = (): Return => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Search for GitHub users based on the provided query.
   * @param query - The search query.
   */
  const searchUsers = async (query: string): Promise<void> => {
    if (!query.length) {
      setUsers([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
      if (response.status === 403) {
        throw new Error(en.githubLimit);
      }
      if (!response.ok) {
        throw new Error(en.error);
      }
      const data = await response.json();
      setUsers(data.items.map((user: any, index: number) => ({
        index,
        id: user.id,
        avatar: user.avatar_url,
        login: user.login,
        url: user.html_url,
      })));

      if (data.items.length === 0) {
        throw new Error(en.noResults);
      }
    } catch (err: any) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    users,
    loading: loading && !!users.length,
    error,
    searchUsers
  };
};
