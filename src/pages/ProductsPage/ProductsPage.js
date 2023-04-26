import { Helmet } from 'react-helmet-async';

// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// ----------------------------------------------------------------------

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title> Productos | Chimuelo Admin App </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Productos
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => {}}>
            Nuevo Producto
          </Button>
        </Stack>
        <Card>Listado de Productos</Card>
      </Container>
    </>
  );
};

export default ProductsPage;
