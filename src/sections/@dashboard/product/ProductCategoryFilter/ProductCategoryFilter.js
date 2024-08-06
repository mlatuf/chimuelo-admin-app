/* eslint-disable no-console */
/* eslint-disable no-debugger */
import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';

// @mui
import { Autocomplete, Box, Button, Divider, Drawer, IconButton, Stack, TextField, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

// Styles
import { StyledAutocomplete } from './styles';

const ProductCategoryFilter = ({ categories, attributeOptions, isOpen, onClose }) => {
  // State
  const [selected, setSelected] = useState({
    category: '',
    attributes: {},
  });

  // Handlers
  const handleOnClear = useCallback(() => {
    onClose({ category: '', attributes: {} });
  }, []);

  const handleOnConfirm = useCallback(() => {
    onClose({ category: selected.category, attributes: selected.attributes });
  }, [selected]);

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { width: 400, border: 'none', overflow: 'hidden' },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Filtros
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>

      <Divider />
      <Box>
        <Stack direction="column" spacing={2} justifyContent="space-between" sx={{ px: 1, py: 4 }}>
          <StyledAutocomplete
            disablePortal
            id="categories-filter"
            options={categories}
            onChange={(_, newValue) => {
              setSelected((prev) => ({ ...prev, category: newValue.name }));
            }}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Filtrar categorias" placeholder="Categorias" />}
          />
          {attributeOptions.map((attribute) => (
            <Autocomplete
              disablePortal
              key={`${attribute.label}-filter`}
              id={`${attribute.label}-filter`}
              options={attribute.options}
              onChange={(_, newValue) =>
                setSelected((prev) => ({
                  ...prev,
                  attributes: { ...prev.attributes, [attribute.label]: newValue },
                }))
              }
              getOptionLabel={(option) => option}
              renderInput={(params) => <TextField {...params} label={attribute.label} placeholder={attribute.label} />}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="end" sx={{ px: 2, py: 2 }}>
          <Button variant="contained" color="inherit" onClick={handleOnClear}>
            Limpiar
          </Button>
          <Button variant="contained" onClick={handleOnConfirm}>
            Aplicar
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
};

ProductCategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
  attributeOptions: PropTypes.arrayOf(PropTypes.object),
  isOpen: PropTypes.bool,
};

ProductCategoryFilter.defaultProps = {
  attributeOptions: [],
  isOpen: false,
};

export default memo(ProductCategoryFilter);
