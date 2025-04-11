import React from 'react';

interface Props {
  columns: string[];
  visibleColumns: string[];
  toggleColumn: (col: string) => void;
}

const ColumnToggle: React.FC<Props> = ({ columns, visibleColumns, toggleColumn }) => {
  return (
    <div className="flex gap-3 flex-wrap">
      {columns.map((col) => (
        <label key={col} className="text-sm">
          <input
            type="checkbox"
            checked={visibleColumns.includes(col)}
            onChange={() => toggleColumn(col)}
          />
          <span className="ml-1">{col}</span>
        </label>
      ))}
    </div>
  );
};

export default ColumnToggle;