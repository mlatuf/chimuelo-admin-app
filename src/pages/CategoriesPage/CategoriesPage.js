/* eslint-disable no-debugger */
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// @mui
import { Button, Card, Container, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';

// Context
import { useCategoryContext } from 'context/category/categoryContext';
import { GET_CATEGORY, GET_CATEGORY_LIST } from 'context/category/actions';

// service
import { getCategoryList, saveCategory, updateCategory } from 'services/categoryService';

// components
import { Spinner } from 'components';

// Sections
import CategoriesTable from 'sections/@dashboard/category/CategoriesTable';
import CategoryModal from 'sections/@dashboard/category/CategoryModal';

// ----------------------------------------------------------------------

const CategoriesPage = () => {
  // Hooks
  const navigate = useNavigate();
  const { state, dispatch } = useCategoryContext();
  const { list: categoriesList, selected: selectedCategory } = state;

  // State
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Handlers
  const handleNewCategory = useCallback(() => {
    dispatch({ type: GET_CATEGORY, payload: {} });
    setOpenModal(true);
  }, []);

  const handleOnClose = useCallback(() => {
    dispatch({ type: GET_CATEGORY, payload: {} });
    setOpenModal(false);
  }, []);

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

  const handleOnSubmit = async (payload) => {
    try {
      setLoading(true);
      setOpenModal(false);
      const result = selectedCategory
        ? await updateCategory(selectedCategory.id, payload)
        : await saveCategory(payload);
      if (result.data) {
        setLoading(false);
        dispatch({ type: GET_CATEGORY, payload: null });
        toast.success(`La categoria ${result.data.name} fue guardada con exito`, {
          onClose: navigate('/dashboard/categories', { replace: true }),
        });
      }
    } catch (error) {
      setLoading(false);
      dispatch({ type: GET_CATEGORY, payload: null });
      toast.error(error.message);
    }
  };

  const handleOnSelect = useCallback(
    (categoryId) => {
      const categoryResult = categoriesList.find((category) => category.id === categoryId);
      if (categoryResult) {
        dispatch({ type: GET_CATEGORY, payload: categoryResult });
        setOpenModal(true);
      } else {
        toast.error('La categoria seleccionada no existe o no se encuentra disponible');
      }
    },
    [categoriesList]
  );

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
          <CategoriesTable categoriesList={categoriesList} onEdit={handleOnSelect} />
        </Card>
        <CategoryModal
          open={openModal}
          category={selectedCategory}
          onSubmit={handleOnSubmit}
          list={categoriesList}
          onClose={handleOnClose}
        />
      </Container>
    </>
  );
};

export default CategoriesPage;
