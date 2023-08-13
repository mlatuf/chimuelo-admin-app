import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// Context
import { useProductContext } from 'context/product/productContext';
import { SET_CATEGORIES_LIST, SET_FILTERS, SET_PRODUCT_LIST } from 'context/product/actions';

// components
import { Spinner } from 'components';

// service
import { getCategories, getProductList } from 'services/productService';

// Sections
import { ProductsTable } from 'sections/@dashboard/product';

// ----------------------------------------------------------------------

const ProductsPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { state, dispatch } = useProductContext();
  const { list: productList, categories, filters } = state;

  // State
  const [loading, setLoading] = useState(true);

  // Handlers
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getProductList(filters);
      if (result) {
        setLoading(false);
        dispatch({ type: SET_PRODUCT_LIST, payload: result });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        onClose: navigate('/dashboard/products', { replace: true }),
      });
    }
  }, [getProductList, filters]);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getCategories();
      if (result) {
        setLoading(false);
        dispatch({ type: SET_CATEGORIES_LIST, payload: result });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        onClose: navigate('/dashboard/products', { replace: true }),
      });
    }
  }, [getProductList]);

  const setFilters = useCallback(({ category, attributes }) => {
    dispatch({ type: SET_FILTERS, payload: { category, attributes } });
  }, []);

  const handleNewProduct = useCallback(() => {}, []);

  // Effects
  useEffect(() => {
    fetchCategories();
    if (!productList || productList.length === 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [productList]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

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
          <ProductsTable productList={productList} categories={categories} onSetFilters={setFilters} />
        </Card>
      </Container>
    </>
  );
};

export default ProductsPage;
