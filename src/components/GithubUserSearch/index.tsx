import React, { useEffect, useState } from 'react';

import { useGithubUserSearch } from './hooks/useGithubUserSearch';
import type { GithubUser } from './hooks/useGithubUserSearch';
import { useUserListActions } from './hooks/useUserListActions';
import { useDebounce } from '../../hooks/useDebounce';
import copyIcon from '../../assets/copy.svg';
import trashIcon from '../../assets/trash.svg';
import cancelIcon from '../../assets/cancel.svg';
import editIcon from '../../assets/edit.svg';
import en from '../../locales/en';
import Profile from '../Profile';
import ActionCheckbox from '../ActionCheckbox';

import styles from './GithubUserSearch.module.css';

/**
 * GithubUserSearch component
 * @returns A GithubUserSearch component.
 */
const GithubUserSearch: React.FC = () => {
  const { users: initialUsers, loading, error, searchUsers } = useGithubUserSearch();
  const { users, selected, toggleSelect, duplicateSelected, deleteSelected, selectUsers } = useUserListActions(initialUsers);
  const [editMode, setEditMode] = useState<boolean>(true);
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  useEffect(() => {
    searchUsers(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder={en.searchPlaceholder}
      />
      <div className={styles.actions}>
        {editMode && <div className={styles.checkbox}>
          <ActionCheckbox
            total={users.length}
            selected={selected.size}
            onChange={checked => selectUsers(checked ? users.map(u => u.index) : [])}
          />
          <b> {selected.size}</b> {en.selectedElements(selected.size)}
        </div>}
        <div className={styles.buttons}>
          {editMode && <>
            <button onClick={duplicateSelected}><img src={copyIcon} alt={en.duplicate} /></button>
            <button onClick={deleteSelected}><img src={trashIcon} alt={en.delete} /></button>
          </>}
          <button onClick={() => setEditMode(!editMode)}><img src={editMode ? cancelIcon : editIcon} alt={en.edit} /></button>
        </div>
      </div>
      {loading && <p>{en.loading}</p>}
      {error && <p>{error}</p>}
      {!!users.length &&
        <div className={styles.users}>
          {users.map((user: GithubUser) => (
            <Profile
              key={user.index}
              user={user}
              toggleSelect={editMode ? () => toggleSelect(user.index) : undefined}
              isSelected={selected.has(user.index)}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default GithubUserSearch;
