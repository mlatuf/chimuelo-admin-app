import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// Context
import { useProductContext } from 'context/product/productContext';
import { GET_PRODUCT_LIST } from 'context/product/actions';

// components
import { Spinner } from 'components';

// service
import { getProductList } from 'services/productService';

// Sections
import { ProductsTable } from 'sections/@dashboard/product';

// ----------------------------------------------------------------------

const ProductsPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { state, dispatch } = useProductContext();
  const { list: productList } = state;

  // State
  const [loading, setLoading] = useState(true);

  // Handlers
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getProductList();
      if (result) {
        setLoading(false);
        dispatch({ type: GET_PRODUCT_LIST, payload: result });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        onClose: navigate('/dashboard/products', { replace: true }),
      });
    }
  }, [getProductList]);

  const handleNewProduct = useCallback(() => {}, []);

  // Effects
  useEffect(() => {
    if (!productList || productList.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [productList]);

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
          <Button variant="contained" startIcon={<Add />} onClick={handleNewProduct}>
            Nuevo Producto
          </Button>
        </Stack>
        <Card>
          <ProductsTable productList={productList} />
        </Card>
      </Container>
    </>
  );
};

export default ProductsPage;
