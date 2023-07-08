import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// @mui
import { IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { Delete, Edit, Label as LabelIcon } from '@mui/icons-material';

// Components
import { Scrollbar } from 'components';
import CategoriesListToolbar from '../CategoriesListToolbar';

import { applySortFilter, getComparator } from './utils';

const CategoriesTable = ({ categoriesList, onEdit }) => {
  // State
  const [filterName, setFilterName] = useState('');

  // Handlers
  const handleFilterByName = useCallback(
    (event) => {
      setFilterName(event.target.value);
    },
    [setFilterName]
  );

  // Memos
  const filteredCategories = useMemo(
    () => applySortFilter(categoriesList, getComparator('asc', 'fullName'), filterName),
    [filterName, categoriesList]
  );

  const isNotFound = useMemo(() => !filteredCategories.length && !!filterName, [filteredCategories, filterName]);

  return (
    <React.Fragment>
      <CategoriesListToolbar filterName={filterName} onFilterName={handleFilterByName} />
      <Scrollbar>
        <List>
          {filteredCategories.map((row) => {
            const { id, name, fullName } = row;

            return (
              <ListItem
                key={id}
                secondaryAction={
                  <>
                    <IconButton size="large" color="inherit" aria-label="Editar" onClick={() => onEdit(id)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="large" color="inherit" aria-label="Eliminar" disabled>
                      <Delete />
                    </IconButton>
                  </>
                }
              >
                <ListItemIcon>
                  <LabelIcon />
                </ListItemIcon>
                <ListItemText primary={fullName} secondary={name} />
              </ListItem>
            );
          })}
          {isNotFound && (
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
          )}
        </List>
      </Scrollbar>
    </React.Fragment>
  );
};

CategoriesTable.propTypes = {
  categoriesList: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default memo(CategoriesTable);
