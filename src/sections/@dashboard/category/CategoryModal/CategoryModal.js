import { useEffect, useMemo } from 'react';

import PropTypes from 'prop-types';

// @mui
import { Button, Dialog, DialogContent, DialogTitle, MenuItem, Stack, TextField } from '@mui/material';

// Hooks
import { FormProvider, useForm } from 'react-hook-form';

// styles
import { StyledForm } from './styles';

const DEFAULT_CATEGORY_VALUES = {
  name: '',
  parent: null,
};

const CategoryModal = ({ list, category, open, onClose, onSubmit, onDelete }) => {
  const methods = useForm({ mode: 'onBlur' });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = methods;

  const defaultValues = useMemo(
    () => ({
      name: category?.name || DEFAULT_CATEGORY_VALUES.name,
      parent: category?.parent || DEFAULT_CATEGORY_VALUES.parent,
    }),
    [category]
  );

  // Effects
  useEffect(() => {
    if (category) {
      reset(defaultValues);
    }
  }, [reset, defaultValues, category]);

  const parentOptions = useMemo(() => {
    const existingCategories = list.map((cat) => ({ id: cat.id, value: cat.name }));
    return [{ id: null, value: 'Sin categoria padre' }, ...existingCategories];
  }, [list]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Editar Categoria</DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="column" alignItems="center" justifyContent="flex-start" mb={5} mt={4} gap={4}>
              <TextField
                required
                error={errors.name}
                label="Nombre"
                InputLabelProps={{ shrink: true }}
                {...register('name', { required: true })}
              />
              <TextField
                select
                label="Categoria padre"
                defaultValue={category?.parent || ''}
                error={errors.name}
                InputLabelProps={{ shrink: true }}
                {...register('parent')}
              >
                {parentOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="end">
              <Button variant="outlined" color="error" onClick={onDelete}>
                Eliminar
              </Button>
              <Button variant="contained" color="inherit" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="contained" type="submit" disabled={!isValid}>
                Guardar
              </Button>
            </Stack>
          </StyledForm>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

CategoryModal.propTypes = {
  open: PropTypes.bool,
  category: PropTypes.object,
  list: PropTypes.arrayOf(PropTypes.object),
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
};

CategoryModal.defaultProps = {
  open: false,
  category: null,
  list: [],
  onDelete: null,
  onSubmit: null,
  onClose: null,
};

export default CategoryModal;
