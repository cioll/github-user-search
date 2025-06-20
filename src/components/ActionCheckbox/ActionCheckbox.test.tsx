import { render, screen, fireEvent } from '@testing-library/react';
import ActionCheckbox from './index';

describe('ActionCheckbox', () => {
  it('should be unchecked when selected = 0', () => {
    render(<ActionCheckbox total={3} selected={0} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('aria-checked', 'false');
  });

  it('should be checked when selected = total', () => {
    render(<ActionCheckbox total={3} selected={3} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('aria-checked', 'true');
  });

  it('should be indeterminate when 0 < selected < total', () => {
    render(<ActionCheckbox total={3} selected={2} onChange={() => {}} />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('should call onChange when clicked', () => {
    const onChange = jest.fn();
    render(<ActionCheckbox total={3} selected={0} onChange={onChange} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(true);
  });
}); 
