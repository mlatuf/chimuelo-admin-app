import { Helmet } from 'react-helmet-async';

// @mui
import { Container, Typography } from '@mui/material';

// ----------------------------------------------------------------------

const ProductsPage = () => {
  return (
    <>
      <Helmet>
        <title> Products | Chimuelo Admin App </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
      </Container>
    </>
  );
};

export default ProductsPage;
