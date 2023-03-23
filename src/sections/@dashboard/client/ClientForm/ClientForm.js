import { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

// Hooks
import { FormProvider, useForm } from 'react-hook-form';

// @mui
import { Button, InputAdornment, Stack, TextField } from '@mui/material';

// components
import { TelephoneInput } from 'components';

// styles
import { StyledForm } from './styles';

const DEFAULT_CLIENT_VALUES = {
  firstName: '',
  lastName: '',
  instagram: '',
  phone: '',
  address: {
    street: '',
    number: '',
    flat: '',
    city: '',
  },
  points: 0,
};

const ClientForm = ({ client, onSubmit }) => {
  const methods = useForm({ mode: 'onBlur' });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isDirty, isValid },
  } = methods;

  const defaultValues = useMemo(
    () => ({
      firstName: client?.firstName || DEFAULT_CLIENT_VALUES.firstName,
      lastName: client?.lastName || DEFAULT_CLIENT_VALUES.lastName,
      instagram: client?.instagram || DEFAULT_CLIENT_VALUES.instagram,
      phone: client?.phone || DEFAULT_CLIENT_VALUES.phone,
      address: client?.address || DEFAULT_CLIENT_VALUES.address,
      points: client?.points || DEFAULT_CLIENT_VALUES.points,
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
            error={errors.firstName}
            label="Nombre"
            InputLabelProps={{ shrink: true }}
            {...register('firstName', { required: true })}
          />
          <TextField
            required
            error={errors.lastName}
            label="Apellido"
            InputLabelProps={{ shrink: true }}
            {...register('lastName', { required: true })}
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
          <TextField
            label="Teléfono"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: TelephoneInput,
            }}
            {...register('phone')}
          />
          <TextField label="Calle" InputLabelProps={{ shrink: true }} {...register('address.street')} />
          <TextField label="Número" InputLabelProps={{ shrink: true }} {...register('address.number')} />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5} gap={4}>
          <TextField label="Departamento" InputLabelProps={{ shrink: true }} {...register('address.flat')} />
          <TextField label="Ciudad" InputLabelProps={{ shrink: true }} {...register('address.city')} />
          <TextField
            label="Chimu puntos"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              disabled: true,
            }}
            {...register('points')}
          />
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="end">
          <Button variant="contained" color="error">
            Cancelar
          </Button>
          <Button variant="contained" type="submit" disabled={!isValid || isDirty}>
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
};

ClientForm.defaultProps = {
  client: null,
  onLoading: null,
  onSubmit: null,
};

export default ClientForm;
