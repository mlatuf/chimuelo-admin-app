import { useNavigate } from 'react-router-dom';

// @mui
import { LoadingButton } from '@mui/lab';

// Context
// import { UserContext, useUserContext } from 'context/user/userContext';

// services
import { signInWithGoogle } from 'services';

// Components
import { Notification } from 'components';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  // const { loginUserDispatch } = useUserContext(UserContext);

  const handleClick = async () => {
    try {
      const result = await signInWithGoogle();
      // loginUserDispatch(result.user);
      if (result) {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      return <Notification variant="error" message={error.message} opened />;
    }
  };

  return (
    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
      Ingresar con Google
    </LoadingButton>
  );
}
