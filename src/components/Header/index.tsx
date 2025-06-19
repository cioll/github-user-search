import React from 'react';

import en from '../../locales/en';

import styles from './Header.module.css';

/**
 * Header component
 * @returns A header component.
 */
const Header: React.FC = () => (
  <header className={styles.header}>
    {en.title}
  </header>
);

export default Header;
