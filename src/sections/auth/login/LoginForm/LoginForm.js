/* eslint-disable no-debugger */
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// @mui
import { LoadingButton } from '@mui/lab';

// Context
import { useUserContext } from 'context/user/userContext';

// Actions
import { LOGIN_USER } from 'context/user/actions';

// services
import { signInWithGoogle } from 'services/userService';

// Components
import { toast } from 'react-toastify';

// ----------------------------------------------------------------------

const LoginForm = ({ onLoading }) => {
  // Hooks
  const navigate = useNavigate();
  const { dispatch } = useUserContext();

  // Handlers
  const handleClick = async () => {
    try {
      onLoading(true);
      const result = await signInWithGoogle();
      if (result) {
        dispatch({ type: LOGIN_USER, payload: result.user });
        onLoading(false);
        navigate('/dashboard', { replace: true });
      } else {
        onLoading(false);
        toast.error('Ha ocurrido un error, por favor consulte al administrador');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
      Ingresar con Google
    </LoadingButton>
  );
};

LoginForm.propTypes = {
  onLoading: PropTypes.func,
};

LoginForm.defaultProps = {
  onLoading: null,
};

export default LoginForm;
