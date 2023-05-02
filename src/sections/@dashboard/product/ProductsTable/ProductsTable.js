import React from 'react';

// @mui
import { TableContainer } from '@mui/material';

// Components
import { Scrollbar, Toolbar } from 'components';

const ProductsTable = () => {
  return (
    <React.Fragment>
      <Toolbar numSelected={0}>toolbar</Toolbar>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>ProductsTable</TableContainer>
      </Scrollbar>
    </React.Fragment>
  );
};

export default React.memo(ProductsTable);
