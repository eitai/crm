import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

const TableCellComponent = ({
  type,
  direction,
  text,
  onClick,
  valueToSortBy,
  sortDirection,
}) => {
  // const [sortDirection, setSortDirection] = useState(direction);

  return (
    <TableCell key={type}>
      <TableSortLabel
        active={valueToSortBy === type}
        direction={sortDirection}
        onClick={onClick(type)}
      >
        {text}
      </TableSortLabel>
    </TableCell>
  );
};

export default TableCellComponent;
