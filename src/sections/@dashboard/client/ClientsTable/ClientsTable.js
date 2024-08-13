import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

// @mui
import {
  Avatar,
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
import { Delete, Edit, Search as SearchIcon } from '@mui/icons-material';

// utils
import { getComparator } from 'utils';

// Components
import { Scrollbar, Toolbar } from 'components';

import { ClientListHead } from 'sections/@dashboard/client';
import { applySortFilter, ROWS_PER_PAGE, TABLE_HEAD } from './utils';

import { StyledSearch } from './styles';

const ClientsTable = ({ clientList, onDelete }) => {
  // Hooks
  const navigate = useNavigate();

  // State
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);

  // Handlers
  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleRequestSort = useCallback((event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    if (property !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    }
  }, []);

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Memos
  const emptyRows = useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientList.length) : 0),
    [page, rowsPerPage]
  );

  const filteredClients = useMemo(
    () => applySortFilter(clientList, getComparator(order, orderBy), filterName),
    [order, orderBy, filterName, clientList]
  );

  const isNotFound = useMemo(() => !filteredClients.length && !!filterName, [filteredClients, filterName]);

  return (
    <React.Fragment>
      <Toolbar>
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
        <Typography>{clientList.length} Clientes</Typography>
      </Toolbar>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ClientListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={clientList.length}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredClients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, name, lastname, score, avatarUrl } = row;
                const fullName = `${name} ${lastname}`;

                return (
                  <TableRow hover key={id} tabIndex={-1}>
                    <TableCell component="th" padding="checkbox" />
                    <TableCell component="th" scope="row" padding="none">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={fullName} src={avatarUrl} />
                        <Typography variant="subtitle2" noWrap>
                          {fullName}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{score}</TableCell>

                    <TableCell align="center">
                      <IconButton color="inherit" onClick={() => navigate(`/dashboard/clients/details/${id}`)}>
                        <Edit />
                      </IconButton>
                      <IconButton color="error" onClick={() => onDelete(id)}>
                        <Delete />
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
        rowsPerPageOptions={[5, 10, 25, { value: -1, label: 'All' }]}
        component="div"
        count={clientList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Clientes por pagina"
      />
    </React.Fragment>
  );
};

ClientsTable.propTypes = {
  clientList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ClientsTable;
