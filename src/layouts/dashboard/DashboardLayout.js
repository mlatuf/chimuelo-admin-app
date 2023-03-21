import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// Context
import { useUserContext } from 'context/user/userContext';

// Actions
import { LOGIN_USER, LOGOUT_USER } from 'context/user/actions';

// Services
import { logout } from 'services/userService';

import { auth, onAuthStateChanged } from 'services/config';

// Components
import { Header, NavDashboard, Notification, Spinner } from 'components';

import { Main, StyledRoot } from './styles.js';

// ----------------------------------------------------------------------

const DashboardLayout = () => {
  // Hooks
  const { state, dispatch } = useUserContext();
  const { user } = state;
  const navigate = useNavigate();

  // State
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOGIN_USER, payload: user });
      } else {
        dispatch({ type: LOGOUT_USER, payload: user });
        navigate('/login', { replace: true });
      }
    });
  }, []);

  // Handlers
  const handleOnLogout = async () => {
    try {
      setLoading(true);
      const result = await logout();
      if (result) {
        dispatch({ type: LOGOUT_USER, payload: result.user });
        setLoading(false);
        navigate('/login', { replace: true });
      }
    } catch (error) {
      return <Notification variant="error" message={error.message} opened />;
    }
  };

  return (
    <StyledRoot>
      <Header user={user} onOpenNav={() => setOpen(true)} onLogout={handleOnLogout} />

      <NavDashboard openNav={open} onCloseNav={() => setOpen(false)} user={user} />
      <Spinner open={loading} />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
};

export default DashboardLayout;
