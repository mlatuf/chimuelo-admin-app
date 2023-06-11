import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// Context
import { useCategoryContext } from 'context/category/categoryContext';
import { GET_CATEGORY_LIST } from 'context/category/actions';

// service
import { getCategoryList } from 'services/categoryService';

// components
import { Spinner } from 'components';

// Sections
import CategoriesTable from 'sections/@dashboard/category/CategoriesTable';

// ----------------------------------------------------------------------

const CategoriesPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { state, dispatch } = useCategoryContext();
  const { list: categoriesList } = state;

  // State
  const [loading, setLoading] = useState(true);

  // Handlers
  const handleNewCategory = () => {};

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await getCategoryList();
      if (result.data) {
        setLoading(false);
        dispatch({ type: GET_CATEGORY_LIST, payload: Object.values(result.data) });
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
    if (!categoriesList || categoriesList.length === 0) {
      fetchCategories();
    } else {
      setLoading(false);
    }
  }, [categoriesList]);

  return (
    <>
      <Helmet>
        <title> Categorias | Chimuelo Admin App </title>
      </Helmet>
      <Spinner open={loading} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Categorias
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleNewCategory}>
            Nueva categoria
          </Button>
        </Stack>
        <Card>
          <CategoriesTable categoriesList={categoriesList} />
        </Card>
      </Container>
    </>
  );
};

export default CategoriesPage;
