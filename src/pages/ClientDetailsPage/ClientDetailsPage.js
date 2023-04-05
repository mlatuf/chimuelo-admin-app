import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

// @mui
import { Container, Stack, Typography } from '@mui/material';

// Context
import { useClientContext } from 'context/client/clientContext';
import { DELETE_CLIENT, GET_CLIENT } from 'context/client/actions';

// Services
import { deleteClient, getClient, saveClient, updateClient } from 'services/clientService';

// Components
import { Spinner } from 'components';

// Sections
import { ClientForm } from 'sections/@dashboard/client';

import { StyledCard } from './styles';
import { toast } from 'react-toastify';

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
        toast.error('El cliente no existe', {
          onClose: navigate('/dashboard/clients', { replace: true }),
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        onClose: navigate('/dashboard/clients', { replace: true }),
      });
    }
  };

  const handleOnDelete = async () => {
    try {
      setLoading(true);
      const result = await deleteClient(clientId);
      if (result) {
        dispatch({ type: DELETE_CLIENT, payload: result });
        toast.success('Cliente eliminado con éxito', {
          onClose: navigate('/dashboard/clients', { replace: true }),
        });
      }
    } catch (error) {
      toast.error(error.message, {
        onClose: navigate('/dashboard/clients', { replace: true }),
      });
    }
  };

  // Effects
  useEffect(() => {
    if (clientId && Object.keys(client).length === 0) {
      fetchClient(clientId);
    }
  }, [clientId]);

  const onSubmit = async (payload) => {
    try {
      setLoading(true);
      const result = payload.uid ? await updateClient(payload) : await saveClient(payload);
      if (result) {
        setLoading(false);
        toast.success(`El cliente ${result.firstName} ${result.lastName} fue guardado con exito`, {
          onClose: navigate('/dashboard/clients', { replace: true }),
        });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
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
          <ClientForm client={client} onSubmit={onSubmit} onDelete={handleOnDelete} />
        </StyledCard>
      </Container>
    </>
  );
};

export default ClientDetailsPage;
