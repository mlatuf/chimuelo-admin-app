import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

// @mui
import { Container, Divider, Typography } from '@mui/material';

// hooks
import useResponsive from 'hooks/useResponsive';

// components
import { Logo, Spinner } from 'components';

// sections
import { LoginForm } from 'sections/auth/login';

import { StyledContent, StyledRoot, StyledSection } from './styles';

export default function LoginPage() {
  // Hooks
  const mdUp = useResponsive('up', 'md');

  // State
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Helmet>
        <title> Login | Chimuelo Admin App </title>
      </Helmet>
      <Spinner open={loading} />
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
            <LoginForm onLoading={(value) => setLoading(value)} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
}
