/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { Add, ImportExport, PriceCheck } from '@mui/icons-material';

// Context
import { useProductContext } from 'context/product/productContext';
import { GET_FILTERS, GET_PRODUCT_LIST } from 'context/product/actions';
import { useCategoryContext } from 'context/category/categoryContext';
import { GET_CATEGORY_LIST } from 'context/category/actions';

// components
import { Spinner } from 'components';

// service
import { getProductList, saveProduct } from 'services/productService';
import { getCategoryList } from 'services/categoryService';

// Sections
import { ProductsTable } from 'sections/@dashboard/product';

import exportedProducts from './exportedProducts';
import { groupProductsBy } from 'utils/products';
import { async } from '@firebase/util';

// ----------------------------------------------------------------------

const ProductsPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { state: productState, dispatch: dispatchProducts } = useProductContext();
  const { list: productList, filters } = productState;

  const { state: categoryState, dispatch: dispatchCategories } = useCategoryContext();
  const { list: categoryList } = categoryState;

  // State
  const [loading, setLoading] = useState(true);

  // Handlers
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const result = await getProductList(filters);
      if (result) {
        setLoading(false);
        dispatchProducts({ type: GET_PRODUCT_LIST, payload: result?.data?.elements });
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
      const result = await getCategoryList();
      if (result) {
        setLoading(false);
        dispatchCategories({ type: GET_CATEGORY_LIST, payload: result.data });
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message, {
        onClose: navigate('/dashboard/products', { replace: true }),
      });
    }
  }, [getProductList]);

  const setFilters = useCallback(({ category, attributes }) => {
    dispatchProducts({ type: GET_FILTERS, payload: { category, attributes } });
  }, []);

  const handleNewProduct = async () => {
    const groupedProducts = Object.values(groupProductsBy(exportedProducts, 'IDProduct'));
    console.log(groupedProducts);

    groupedProducts.forEach(async (productVariants) => {
      const currentCategory = categoryList.find(() => {
        const catArray = productVariants[0].Categorías.split(' > ');
        return (cat) => cat.name === catArray[catArray.lenght - 1];
      });
      try {
        setLoading(true);
        const productResult = await saveProduct({ name: productVariants[0].name, category: currentCategory.id });
        if (productResult) {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    });
  };
  // Effects
  useEffect(() => {
    fetchCategories();
    if (!productList) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [productList]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  console.log(productList);

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
          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
            <Button variant="contained" startIcon={<Add />} onClick={handleNewProduct}>
              Nuevo Producto
            </Button>
            <Button variant="contained" startIcon={<ImportExport />} onClick={() => {}} disabled>
              Exportar / Importar
            </Button>
            <Button variant="contained" startIcon={<PriceCheck />} onClick={() => {}} disabled>
              Actualizar Precios
            </Button>
          </Stack>
        </Stack>
        <Card>
          <ProductsTable productList={productList} categories={categoryList} onSetFilters={setFilters} />
        </Card>
      </Container>
    </>
  );
};

export default ProductsPage;
