import { Helmet } from 'react-helmet-async';

// @mui
import { Container, Typography, Divider } from '@mui/material';

// hooks
import useResponsive from '../../hooks/useResponsive';

// components
import Logo from '../../components/logo';

// sections
import { LoginForm } from '../../sections/auth/login';

import { StyledRoot, StyledContent, StyledSection } from './styles'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | Chimuelo Admin App </title>
      </Helmet>

      <StyledRoot>
        <Logo
          sx={{
            position: 'fixed',
            top: { xs: 16, sm: 24, md: 40 },
            left: { xs: 16, sm: 24, md: 40 },
          }}
        />

        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Bienvenido de nuevo!
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}

        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h4" gutterBottom>
              Entrando a Chimuelo Admin App
            </Typography>

            <Divider sx={{ my: 3 }} />
            <LoginForm />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
