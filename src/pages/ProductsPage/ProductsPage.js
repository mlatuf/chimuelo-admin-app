import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// components
import { Spinner } from 'components';

// service
import { getCategories } from 'services/productService';

// Sections
import { ProductsTable } from 'sections/@dashboard/product';

// ----------------------------------------------------------------------

const ProductsPage = () => {
  // Hooks
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await getCategories();
      if (result) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        onClose: navigate('/dashboard/products', { replace: true }),
      });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title> Productos | Chimuelo Admin App </title>
      </Helmet>
      <Spinner open={loading} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Productos
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={() => {}}>
            Nuevo Producto
          </Button>
        </Stack>
        <Card>
          <ProductsTable />
        </Card>
      </Container>
    </>
  );
};

export default ProductsPage;
