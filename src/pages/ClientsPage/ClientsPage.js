import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// Context
import { useClientContext } from 'context/client/clientContext';
import { DELETE_CLIENT, GET_CLIENT_LIST } from 'context/client/actions';

// service
import { deleteClient, getClientList } from 'services/clientService';

// components
import { ConfirmationModal, Spinner } from 'components';

// sections
import { ClientsTable } from 'sections/@dashboard/client';
// ----------------------------------------------------------------------

const ClientsPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { state, dispatch } = useClientContext();
  const { list: clientList } = state;

  // State
  const [fetched, setFetched] = useState(false);
  const [reloadClientList, setReloadClientList] = useState(false);

  const [paramId, setParamId] = useState();
  const [loading, setLoading] = useState(true);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  // Handlers
  const handleSetParamId = (id) => {
    setOpenConfirmationModal(true);
    setParamId(id);
  };

  const handleNewClient = () => {
    navigate('/dashboard/clients/details');
  };

  const handleOnDelete = async () => {
    try {
      setOpenConfirmationModal(false);
      setLoading(true);
      const result = await deleteClient(paramId);
      if (result) {
        setTimeout(() => {
          setLoading(false);
          dispatch({ type: DELETE_CLIENT, payload: paramId });
          toast.success('Cliente eliminado con éxito', {
            onClose: navigate('/dashboard/clients', { replace: true }),
          });
          setReloadClientList(true);
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message, {
        onClose: navigate('/dashboard/clients', { replace: true }),
      });
    }
  };

  const fetchClients = async () => {
    try {
      setLoading(true);
      const result = await getClientList();
      if (result) {
        setFetched(true);
        setLoading(false);
        setReloadClientList(false);
        dispatch({ type: GET_CLIENT_LIST, payload: result });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        onClose: navigate('/dashboard/clients', { replace: true }),
      });
    }
  };

  // Effects
  useEffect(() => {
    if (!clientList || (clientList.length == 0 && !fetched) || reloadClientList) {
      fetchClients();
    } else {
      setLoading(false);
    }
  }, [clientList, reloadClientList]);

  return (
    <>
      <Helmet>
        <title> Clientes | Chimuelo Admin App </title>
      </Helmet>
      <Spinner open={loading} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Clientes
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleNewClient}>
            Nuevo Cliente
          </Button>
        </Stack>
        <Card>
          <ClientsTable clientList={clientList} onDelete={handleSetParamId} />
        </Card>
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

export default ClientsPage;
