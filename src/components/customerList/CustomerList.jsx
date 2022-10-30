import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { DataGrid, GridToolbarQuickFilter, heIL } from '@mui/x-data-grid';
import Style from './customerList.module.scss';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import shallow from 'zustand/shallow';
import { useCustomersStore } from '../../utils/zustand/customers-list-store';

const CustomerList = () => {
  const navigate = useNavigate();
  const { customerList, setSelectedCustomersList, selectedCustomersList } =
    useCustomersStore((state) => state, shallow);
  console.log(customerList);
  return (
    <div className={Style.container}>
      {selectedCustomersList.length >= 1 && (
        <button
          className={Style.btn_container}
          onClick={() => handleMoveToCustomerPage(navigate)}
        >
          עבור לדף לקוח{' '}
        </button>
      )}
      <DataGrid
        rows={customerList}
        columns={columns}
        selectionModel={selectedCustomersList}
        pageSize={30}
        rowsPerPageOptions={[5, 10, 20, 25, 30]}
        checkboxSelection
        rowHeight={65}
        sx={style}
        experimentalFeatures={{ newEditingApi: true }}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: QuickSearchToolbar }}
        localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
        componentsProps={{
          pagination: paginationStyle,
        }}
        onSelectionModelChange={setSelectedCustomersList}
      />
    </div>
  );
};

export default CustomerList;

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter />
    </Box>
  );
}
const style = {
  height: '100%',
  width: '100%',
  fontSize: '1.5rem',
  '& .MuiDataGrid-iconSeparator': { display: 'none' },
  '& .muirtl-1ptx2yq-MuiInputBase-root-MuiInput-root': {
    padding: '5px 15px',
    width: '25rem',
    fontSize: '1.5rem',
    border: '1px solid #77777777',
    borderRadius: '5px',
    color: '#444',
  },
};
const paginationStyle = {
  sx: {
    '& .muirtl-pdct74-MuiTablePagination-selectLabel': {
      fontSize: '1.5rem',
    },
    '& .MuiTablePagination-displayedRows': {
      fontSize: '1.5rem',
    },
  },
  SelectProps: {
    sx: {
      '& .MuiSelect-select': {
        fontSize: '1.5rem',
        paddingTop: '12px',
      },
    },

    MenuProps: {
      sx: {
        color: 'red',
        '& .MuiMenuItem-root': {
          fontSize: '2rem',
        },
      },
    },
  },
};

const handleMoveToCustomerPage = (navigate) => {
  const { selectedCustomersList, setDisplayedCustomer, customerList } =
    useCustomersStore.getState();
  setDisplayedCustomer(
    customerList.find((el) => selectedCustomersList[0] === el.id)
  );
  navigate(`/customer/${selectedCustomersList[0]}`);
};

const columns = [
  { field: 'fullName', headerName: 'שם מלא', width: 200 },
  {
    field: 'tz',
    headerName: 'תעודת זהות',
    width: 150,
  },
  {
    field: 'email',
    headerName: 'אימייל',
    width: 280,
  },
  {
    field: 'phone',
    headerName: 'מספר טלפון',
    width: 160,
  },
  {
    field: 'products',
    headerName: 'מוצרים',
    width: 200,
  },
];
