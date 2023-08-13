import React from 'react';
import PropTypes from 'prop-types';

// @mui
import { IconButton, Tooltip, Typography } from '@mui/material';
import { Delete as DeleteIcon, FilterList as FilterListIcon } from '@mui/icons-material';

import { StyledRoot } from './styles';

const Toolbar = ({ children, numSelected, onFiltersClick }) => {
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
        <>{children}</>
      )}
      {numSelected > 0 && (
        <Tooltip title="Eliminar">
          <IconButton disabled>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {onFiltersClick && numSelected === 0 && (
        <Tooltip title="Filtrar">
          <IconButton onClick={onFiltersClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
};

Toolbar.propTypes = {
  numSelected: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  onFiltersClick: PropTypes.func,
};

Toolbar.defaultProps = {
  numSelected: 0,
  children: {},
  onFiltersClick: null,
};

export default React.memo(Toolbar);
