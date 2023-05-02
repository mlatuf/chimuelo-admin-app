import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// @mui
import {
  Avatar,
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

import { ClientListHead } from 'sections/@dashboard/client';
import { applySortFilter, ROWS_PER_PAGE, TABLE_HEAD } from './utils';

import { StyledSearch } from './styles';

const ClientsTable = ({ clientList, onOpenMenu }) => {
  // State
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');

  // Handlers
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = clientList.map((n) => n.id);
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
    () => (page > 0 ? Math.max(0, (1 + page) * ROWS_PER_PAGE - clientList.length) : 0),
    [page, ROWS_PER_PAGE]
  );

  const filteredClients = useMemo(
    () => applySortFilter(clientList, getComparator(order, orderBy), filterName),
    [order, orderBy, filterName, clientList]
  );

  const isNotFound = useMemo(() => !filteredClients.length && !!filterName, [filteredClients, filterName]);

  return (
    <React.Fragment>
      <Toolbar numSelected={selected.length}>
        <StyledSearch
          value={filterName}
          onChange={handleFilterByName}
          placeholder="Buscar cliente..."
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
            <ClientListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={clientList.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredClients.slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE).map((row) => {
                const { id, firstName, lastName, points, avatarUrl } = row;
                const selectedClient = selected.indexOf(id) !== -1;
                const fullName = `${firstName} ${lastName}`;

                return (
                  <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedClient}>
                    <TableCell padding="checkbox">
                      <Checkbox checked={selectedClient} onChange={(event) => handleClick(event, id)} />
                    </TableCell>

                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={fullName} src={avatarUrl} />
                        <Typography variant="subtitle2" noWrap>
                          {fullName}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{points}</TableCell>

                    <TableCell align="right">
                      <IconButton size="large" color="inherit" onClick={(event) => onOpenMenu(event, id)}>
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
                        No hay resultados para &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
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
        count={clientList.length}
        rowsPerPage={ROWS_PER_PAGE}
        page={page}
        onPageChange={handleChangePage}
      />
    </React.Fragment>
  );
};

ClientsTable.propTypes = {
  clientList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onOpenMenu: PropTypes.func.isRequired,
};

export default ClientsTable;
