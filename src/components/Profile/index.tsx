import React from 'react';
import type { GithubUser } from '../GithubUserSearch/hooks/useGithubUserSearch';

import styles from './Profile.module.css';

type ProfileProps = {
  user: GithubUser;
  toggleSelect?: () => void;
  isSelected: boolean;
};

/**
 * Profile component
 * @param user - The user to display.
 * @param toggleSelect - Callback when the checkbox is toggled.
 * @param isSelected - Whether the profile is selected.
 * @returns A GitHub user profile card.
 */
const Profile: React.FC<ProfileProps> = ({ user, toggleSelect, isSelected }) => (
  <div className={styles.profile}>
    {toggleSelect && <input type="checkbox" className={styles.checkbox} onChange={toggleSelect} checked={isSelected} />}
    <img src={user.avatar} alt={user.login} className={styles.avatar} />
    <div>
      <div>{user.id}</div>
      <div>{user.login}</div>
    </div>
    <a href={user.url} target="_blank" rel="noopener noreferrer" className={styles.link}>View profile</a>
  </div>
);

export default Profile;
