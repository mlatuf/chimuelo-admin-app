import PropTypes from 'prop-types';
// @mui

import { InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { StyledRoot, StyledSearch } from './styles';

// ----------------------------------------------------------------------

const CategoriesListToolbar = ({ numSelected, filterName, onFilterName }) => {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Buscar categoria..."
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
    </StyledRoot>
  );
};

CategoriesListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

CategoriesListToolbar.defaultProps = {
  numSelected: 0,
  filterName: '',
  onFilterName: null,
};

export default CategoriesListToolbar;
