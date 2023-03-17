import PropTypes from 'prop-types';
// @mui

import { IconButton, InputAdornment, Tooltip, Typography } from '@mui/material';
import { Delete as DeleteIcon, Search as SearchIcon } from '@mui/icons-material';

import { StyledRoot, StyledSearch } from './styles';

// ----------------------------------------------------------------------

const ClientListToolbar = ({ numSelected, filterName, onFilterName }) => {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} seleccionados
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Buscar cliente..."
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Eliminar">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
};

ClientListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

ClientListToolbar.defaultProps = {
  numSelected: 0,
  filterName: '',
  onFilterName: null,
};

export default ClientListToolbar;
