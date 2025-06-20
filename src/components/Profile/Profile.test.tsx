import { render, screen, fireEvent } from '@testing-library/react';
import Profile from './index';
import type { GithubUser } from '../GithubUserSearch/hooks/useGithubUserSearch';

const user: GithubUser = {
  id: 1,
  index: 0,
  avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  login: 'doe',
  url: 'https://github.com/doe'
};

test('renders user profile with avatar, login and link', () => {
  render(<Profile user={user} toggleSelect={() => {}} isSelected={false} />);
  expect(screen.getByAltText('doe')).toBeInTheDocument();
  expect(screen.getByText('doe')).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /view profile/i })).toHaveAttribute('href', user.url);
});

test('calls onCheck when checkbox is clicked', () => {
  const onCheck = jest.fn();
  render(<Profile user={user} toggleSelect={onCheck} isSelected={false} />);
  fireEvent.click(screen.getByRole('checkbox'));
  expect(onCheck).toHaveBeenCalled();
});
