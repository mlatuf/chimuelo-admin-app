/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
// @mui
import { TableContainer } from '@mui/material';

// Components
import { Scrollbar, Toolbar } from 'components';

const ProductsTable = ({ productList }) => {
  console.log(productList);
  return (
    <React.Fragment>
      <Toolbar numSelected={0}>toolbar</Toolbar>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>ProductsTable</TableContainer>
      </Scrollbar>
    </React.Fragment>
  );
};

ProductsTable.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default React.memo(ProductsTable);
