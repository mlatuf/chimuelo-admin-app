import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

// Hooks
import { FormProvider, useForm } from 'react-hook-form';

// @mui
import { Button, InputAdornment, Stack, TextField } from '@mui/material';

// components
// import { TelephoneInput } from 'components';

// styles
import { StyledForm } from './styles';

const DEFAULT_CLIENT_VALUES = {
  name: '',
  lastname: '',
  instagram: '',
  phone: '',
  address: {
    street: '',
    number: '',
    flat: '',
    city: '',
    province: '',
    notes: '',
  },
  score: 0,
};

const ClientForm = ({ client, onSubmit, onDelete }) => {
  const methods = useForm({ mode: 'onBlur' });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = methods;

  const defaultValues = useMemo(
    () => ({
      name: client?.name || DEFAULT_CLIENT_VALUES.name,
      lastname: client?.lastname || DEFAULT_CLIENT_VALUES.lastname,
      instagram: client?.instagram || DEFAULT_CLIENT_VALUES.instagram,
      phone: client?.phone || DEFAULT_CLIENT_VALUES.phone,
      address: client?.address || DEFAULT_CLIENT_VALUES.address,
      score: client?.score || DEFAULT_CLIENT_VALUES.score,
    }),
    [client]
  );

  // Effects
  useEffect(() => {
    if (client) {
      reset(defaultValues);
    }
  }, [reset, defaultValues, client]);

  return (
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
            error={errors.lastname}
            label="Apellido"
            InputLabelProps={{ shrink: true }}
            {...register('lastname', { required: true })}
          />
          <TextField
            label="Perfíl de Instagram"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: <InputAdornment position="start">@</InputAdornment>,
            }}
            {...register('instagram')}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5} gap={4}>
          <TextField label="Teléfono" InputLabelProps={{ shrink: true }} {...register('phone')} />
          <TextField label="Calle" InputLabelProps={{ shrink: true }} {...register('address.street')} />
          <TextField label="Número" InputLabelProps={{ shrink: true }} {...register('address.number')} />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5} gap={4}>
          <TextField label="Departamento" InputLabelProps={{ shrink: true }} {...register('address.flat')} />
          <TextField label="Ciudad" InputLabelProps={{ shrink: true }} {...register('address.city')} />
          <TextField label="Provincia" InputLabelProps={{ shrink: true }} {...register('address.province')} />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5} gap={4}>
          <TextField label="Observaciones" InputLabelProps={{ shrink: true }} {...register('address.notes')} />
          <TextField
            label="Chimu puntos"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              disabled: true,
            }}
            {...register('score')}
          />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="end">
          <Button variant="outlined" color="error" onClick={onDelete}>
            Eliminar
          </Button>
          <Button variant="contained" color="inherit" onClick={() => history.back()}>
            Cancelar
          </Button>
          <Button variant="contained" type="submit" disabled={!isValid}>
            Guardar
          </Button>
        </Stack>
      </StyledForm>
    </FormProvider>
  );
};

ClientForm.propTypes = {
  client: PropTypes.object,
  onLoading: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

ClientForm.defaultProps = {
  client: null,
  onLoading: null,
  onDelete: null,
  onSubmit: null,
};

export default ClientForm;
