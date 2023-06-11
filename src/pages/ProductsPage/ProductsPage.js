import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { Button, Container, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
// components
import { Spinner } from 'components';

// ----------------------------------------------------------------------

const ProductsPage = () => {
  // Hooks

  // State
  const [loading, setLoading] = useState(true);

  // Handlers
  const handleNewCategory = () => {};

  // Effects
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Helmet>
        <title> Productos | Chimuelo Admin App </title>
      </Helmet>
      <Spinner open={loading} />
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Productos
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={handleNewCategory}>
          Categoria
        </Button>
      </Container>
    </>
  );
};

export default ProductsPage;
