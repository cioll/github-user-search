import React, { useEffect, useRef } from 'react';

type ActionCheckboxProps = {
  total: number;
  selected: number;
  onChange: (checked: boolean) => void;
}

/**
 * ActionCheckbox component
 * @param total - The total number of users.
 * @param selected - The number of selected users.
 * @param onChange - The callback function when the checkbox is toggled.
 * @returns An ActionCheckbox component.
 */
const ActionCheckbox: React.FC<ActionCheckboxProps> = ({ total, selected, onChange }) => {
  const ref = useRef<HTMLInputElement>(null);

  const isChecked = selected > 0 && selected === total;
  const isIndeterminate = selected > 0 && selected < total;

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={isChecked}
      onChange={e => onChange(e.target.checked)}
      aria-checked={isIndeterminate ? 'mixed' : isChecked}
    />
  );
};

export default ActionCheckbox;
