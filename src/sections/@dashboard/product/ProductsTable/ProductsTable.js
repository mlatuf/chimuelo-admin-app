/* eslint-disable no-console */
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// @mui
import {
  Checkbox,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { MoreVert, Search as SearchIcon } from '@mui/icons-material';

// utils
import { getComparator } from 'utils';

// Components
import { Scrollbar, Toolbar } from 'components';

import { ProductListHead } from 'sections/@dashboard/product';
import { applySortFilter, ROWS_PER_PAGE, TABLE_HEAD } from './utils';

import { StyledSearch } from './styles';

const ProductsTable = ({ productList }) => {
  // State
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filter, setFilter] = useState({
    name: '',
    category: '',
  });

  // Handlers
  const handleFilterByName = (event) => {
    setPage(0);
    setFilter((prev) => ({ name: event.target.value, category: prev.category }));
  };

  const handleFilterByCategory = (event) => {
    setPage(0);
    setFilter((prev) => ({ name: prev.name, category: event.target.value }));
  };

  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = productList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  // Memos
  const emptyRows = useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - productList.length) : 0),
    [page, ROWS_PER_PAGE]
  );

  const filteredProducts = useMemo(
    () => applySortFilter(productList, getComparator(order, orderBy), filter),
    [order, orderBy, filter, productList]
  );

  const isNotFound = useMemo(() => !filteredProducts.length && !!filter, [filteredProducts, filter]);

  return (
    <React.Fragment>
      <Toolbar numSelected={selected.length}>
        <StyledSearch
          value={filter.name}
          onChange={handleFilterByName}
          placeholder="Buscar producto..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <StyledSearch
          value={filter.category}
          onChange={handleFilterByCategory}
          placeholder="Buscar categoria..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Toolbar>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ProductListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={productList.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredProducts.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE).map((row) => {
                const { id, name, category, stock, price } = row;
                const selectedClient = selected.indexOf(id) !== -1;

                return (
                  <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedClient}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedClient} onChange={(event) => handleClick(event, id)} />
                    </TableCell>

                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{price}</TableCell>
                    <TableCell align="left">{category}</TableCell>
                    <TableCell align="left">{stock}</TableCell>
                    <TableCell align="left">Variantes</TableCell>

                    <TableCell align="right">
                      <IconButton size="large" color="inherit" onClick={() => {}}>
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        No encontrado
                      </Typography>

                      <Typography variant="body2">
                        No hay resultados para su búsqueda
                        <br /> Intente verificar errores tipográficos o usar palabras completas.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        component="div"
        count={productList.length}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
      />
    </React.Fragment>
  );
};

ProductsTable.propTypes = {
  productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default React.memo(ProductsTable);
