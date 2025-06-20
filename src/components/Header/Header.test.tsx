import { render, screen } from '@testing-library/react';
import Header from './index';
import en from '../../locales/en';

describe('Header', () => {
  it('should display header', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toHaveTextContent(en.title);
  });
}); 
