import { useEffect, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

// @mui
import { Container, Stack, Typography } from '@mui/material';

// Context
import { useClientContext } from 'context/client/clientContext';
import { DELETE_CLIENT, GET_CLIENT, GET_CLIENT_LIST } from 'context/client/actions';

// Services
import { deleteClient, getClient, saveClient, updateClient } from 'services/clientService';

// Components
import { ConfirmationModal, Spinner } from 'components';

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
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  const fetchClient = async (clientId) => {
    try {
      setLoading(true);
      const selectedClient = await getClient(clientId);
      if (selectedClient) {
        setLoading(false);
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
      setOpenConfirmationModal(false);
      const result = await deleteClient(clientId);
      if (result) {
        setTimeout(() => {
          setLoading(false);
          dispatch({ type: DELETE_CLIENT, payload: clientId });
          toast.success('Cliente eliminado con éxito', {
            onClose: navigate('/dashboard/clients', { replace: true }),
          });
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message, {
        onClose: navigate('/dashboard/clients', { replace: true }),
      });
    }
  };

  // Effects
  useEffect(() => {
    if (clientId && client && Object.keys(client).length === 0) {
      fetchClient(clientId);
    }
  }, [clientId, client]);

  const onSubmit = async (payload) => {
    try {
      setLoading(true);
      const { data } = clientId ? await updateClient(clientId, payload) : await saveClient(payload);
      if (data) {
        setTimeout(() => {
          setLoading(false);
          dispatch({ type: GET_CLIENT_LIST, payload: [] });
          toast.success(`El cliente ${data.name} ${data.lastname} fue guardado con exito`, {
            onClose: navigate('/dashboard/clients', { replace: true }),
          });
        }, 3000);
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
          <ClientForm client={client} onSubmit={onSubmit} onDelete={() => setOpenConfirmationModal(true)} />
        </StyledCard>
      </Container>
      <ConfirmationModal
        title="Eliminar Cliente"
        description="Está seguro que desea eliminar el cliente seleccionado?"
        open={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        onConfirm={handleOnDelete}
      />
    </>
  );
};

export default ClientDetailsPage;
