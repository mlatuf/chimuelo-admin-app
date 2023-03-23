/* eslint-disable no-debugger */
import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

// @mui
import { Container, Stack, Typography } from '@mui/material';

// Context
import { useClientContext } from 'context/client/clientContext';
import { GET_CLIENT } from 'context/client/actions';

// Services
import { getClient, saveClient, updateClient } from 'services/clientService';

// Components
import { Notification, Spinner } from 'components';

// Sections
import { ClientForm } from 'sections/@dashboard/client';

import { StyledCard } from './styles';

const ClientDetailsPage = () => {
  // Hooks
  const { clientId } = useParams();
  const { state, dispatch } = useClientContext();
  const { selected: client } = state;
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(false);

  const fetchClient = async (clientId) => {
    try {
      setLoading(true);
      const selectedClient = await getClient(clientId);
      setLoading(false);
      if (selectedClient) {
        dispatch({ type: GET_CLIENT, payload: selectedClient });
      } else {
        return <Notification variant="error" message={'El cliente no existe'} opened />;
      }
    } catch (error) {
      setLoading(false);
      return <Notification variant="error" message={error.message} opened />;
    }
  };

  // Effects
  useEffect(() => {
    if (clientId && Object.keys(client).length === 0) {
      fetchClient(clientId);
    }
  }, [clientId]);

  const onSubmit = (payload) => {
    try {
      setLoading(true);
      const result = payload.uid ? updateClient(payload) : saveClient(payload);
      if (result) {
        setLoading(false);
        navigate('/dashboard/clients', { replace: true });
        return (
          <Notification
            variant="success"
            message={`El cliente ${result.firstName} ${result.lastName} fue guardado con exito`}
            opened
          />
        );
      }
    } catch (error) {
      setLoading(false);
      return <Notification variant="error" message={error.message} opened />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Clientes | Chimuelo Admin App</title>
      </Helmet>
      <Spinner open={loading} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="flex-start" mb={5}>
          <Typography variant="h4" gutterBottom>
            Editar Cliente
          </Typography>
        </Stack>
        <StyledCard>
          <ClientForm client={client} onSubmit={onSubmit} />
        </StyledCard>
      </Container>
    </>
  );
};

export default ClientDetailsPage;
