/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';

// @mui
import { Button, Container, InputAdornment, Stack, TextField, Typography } from '@mui/material';

import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebase/config';

import TelephoneInput from 'components/TelephoneInput';

// mock
import CLIENTSLIST from '_mock/clients';

import { StyledCard, StyledForm } from './styles';

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

const ClientDetailsPage = () => {
  // Hooks
  const { clientId } = useParams();

  // States
  const [client, setClient] = useState();

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

  const fetchClients = async () => {
    const querySnapshot = await getDocs(collection(db, 'clients'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  // Effects
  useEffect(() => {
    // TODO get data of services
    if (clientId && !client) {
      setClient(CLIENTSLIST[Math.floor(Math.random() * CLIENTSLIST.length)]);
    }
    fetchClients();
  }, [reset, defaultValues, clientId, client]);

  useEffect(() => {
    if (client) {
      reset(defaultValues);
    }
  }, [reset, defaultValues, client]);

  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Helmet>
        <title>Clientes | Chimuelo Admin App</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5}>
          <Typography variant="h4" gutterBottom>
            Editar Cliente
          </Typography>
        </Stack>
        <StyledCard>
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
        </StyledCard>
      </Container>
    </>
  );
};

export default ClientDetailsPage;
