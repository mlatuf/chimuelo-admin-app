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
import { ClientOptionsPopover } from 'sections/@dashboard/client';
import ClientsTable from 'sections/@dashboard/client/ClientsTable/ClientsTable';

// ----------------------------------------------------------------------

const ClientsPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { state, dispatch } = useClientContext();
  const { list: clientList } = state;

  // State
  const [clientTarget, setClientTarget] = useState(null);

  const [paramId, setParamId] = useState();
  const [loading, setLoading] = useState(true);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

  // Handlers
  const handleOpenMenu = (event, id) => {
    setParamId(id);
    setClientTarget(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setClientTarget(null);
    setParamId(null);
  };

  const handleNewClient = () => {
    navigate('/dashboard/clients/details');
  };

  const handleOnDelete = async () => {
    try {
      setOpenConfirmationModal(false);
      setClientTarget(null);
      setLoading(true);
      const result = await deleteClient(paramId);
      if (result) {
        dispatch({ type: DELETE_CLIENT, payload: result });
        toast.success('Cliente eliminado con éxito');
        setLoading(false);
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
        setLoading(false);
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
    if (!clientList || clientList.length === 0) {
      fetchClients();
    } else {
      setLoading(false);
    }
  }, [clientList]);

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
          <ClientsTable clientList={clientList} onOpenMenu={handleOpenMenu} />
        </Card>
      </Container>
      <ClientOptionsPopover
        target={clientTarget}
        onClose={handleCloseMenu}
        onDelete={() => setOpenConfirmationModal(true)}
        paramId={paramId}
      />
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
