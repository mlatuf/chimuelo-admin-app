/* eslint-disable no-debugger */
/* eslint-disable no-console */
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

// @mui
import { Container, Divider, Typography } from '@mui/material';

// hooks
import useResponsive from 'hooks/useResponsive';

// Context
import { useUserContext } from 'context/user/userContext';

// Actions
import { LOGIN_USER } from 'context/user/actions';

// services
import { signInWithGoogle } from 'services/userService';

// components
import { Logo, Spinner } from 'components';
import { toast } from 'react-toastify';

// sections
import { LoginForm } from 'sections/auth/login';

import { StyledContent, StyledRoot, StyledSection } from './styles';

const LoginPage = () => {
  // Hooks
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const { dispatch } = useUserContext();

  // State
  const [loading, setLoading] = useState(false);

  // Handlers
  const onSubmit = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      if (result) {
        setLoading(false);
        dispatch({ type: LOGIN_USER, payload: result.user });
        navigate('/dashboard', { replace: true });
      } else {
        setLoading(false);
        toast.error('Ha ocurrido un error, por favor consulte al administrador');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

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
            <LoginForm onSubmit={onSubmit} />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default LoginPage;
