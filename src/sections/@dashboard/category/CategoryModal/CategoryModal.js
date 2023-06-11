import { useEffect, useMemo } from 'react';

import PropTypes from 'prop-types';

// @mui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';

// Hooks
import { FormProvider, useForm } from 'react-hook-form';

// styles
import { StyledForm } from './styles';

const DEFAULT_CATEGORY_VALUES = {
  name: '',
  parent: null,
};

const CategoryModal = ({ category, open, onClose, onSubmit, onDelete }) => {
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

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <FormProvider {...methods}>
          <StyledForm component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5} gap={4}>
              <TextField
                required
                error={errors.name}
                label="Nombre"
                InputLabelProps={{ shrink: true }}
                {...register('name', { required: true })}
              />
              <TextField
                required
                error={errors.parent}
                label="Categoria padre"
                InputLabelProps={{ shrink: true }}
                {...register('parent')}
              />
            </Stack>
          </StyledForm>
        </FormProvider>
        <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onDelete}>
          Eliminar
        </Button>
        <Button variant="contained" color="inherit">
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={!isValid}>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryModal.propTypes = {
  open: PropTypes.boolean,
  category: PropTypes.object,
  onLoading: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onClose: PropTypes.func,
};

CategoryModal.defaultProps = {
  open: false,
  category: null,
  onLoading: null,
  onDelete: null,
  onSubmit: null,
  onClose: null,
};

export default CategoryModal;
