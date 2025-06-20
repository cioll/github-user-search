import { render, screen } from '@testing-library/react';
import GithubUserSearch from './index';

jest.mock('./hooks/useGithubUserSearch', () => ({
  useGithubUserSearch: () => ({
    users: [
      { id: 1, index: 0, avatar: 'avatar.png', login: 'doe', url: 'https://github.com/doe' }
    ],
    loading: false,
    error: null,
    searchUsers: jest.fn()
  })
}));

jest.mock('./hooks/useUserListActions', () => ({
  useUserListActions: () => ({
    users: [
      { id: 1, index: 0, avatar: 'avatar.png', login: 'doe', url: 'https://github.com/doe' }
    ],
    selected: new Set(),
    toggleSelect: jest.fn(),
    duplicateSelected: jest.fn(),
    deleteSelected: jest.fn(),
    selectUsers: jest.fn()
  })
}));

describe('GithubUserSearch', () => {
  it('displays the placeholder and a user', () => {
    render(<GithubUserSearch />);
    expect(screen.getByPlaceholderText('Search input')).toBeInTheDocument();
    expect(screen.getByText('doe')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view profile/i })).toHaveAttribute('href', 'https://github.com/doe');
  });
}); 
