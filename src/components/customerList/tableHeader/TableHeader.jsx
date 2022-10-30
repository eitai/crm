import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCellComponent from '../tableCellComponent/TableCellComponent';
import { TableCell } from '@mui/material';

const TableHeader = ({ valueToSortBy, sortDirection, handleRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  // const EnhancedTableHead=(props)=> {
  // const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
  //   props;
  // const createSortHandler = (property) => (event) => {
  //   onRequestSort(event, property);
  // };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            // indeterminate={numSelected > 0 && numSelected < rowCount}
            // checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
            // inputProps={{
            //   'aria-label': 'select all desserts',
            // }}
          />
        </TableCell>
        {tableHeaderTabs.map(({ type, direction, text }, index) => {
          return (
            <TableCellComponent
              key={index}
              type={type}
              direction={direction}
              text={text}
              onClick={createSortHandler}
              valueToSortBy={valueToSortBy}
              sortDirection={sortDirection}
            />
          );
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;

const tableHeaderTabs = [
  { type: 'fullName', direction: 'asc', text: 'שם מלא' },
  { type: 'TZ', direction: 'asc', text: 'תעודת זהות' },
  { type: 'adress', direction: 'asc', text: 'כתובת' },
  { type: 'email', direction: 'asc', text: 'אימייל' },
  { type: 'phone', direction: 'asc', text: 'טלפון' },
  { type: 'products', direction: 'asc', text: 'מוצרים' },
];
