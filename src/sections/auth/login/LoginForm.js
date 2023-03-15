import { useNavigate } from 'react-router-dom';

// @mui
import { LoadingButton } from '@mui/lab';

// services
import { signInWithGoogle } from '../../../firebase';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const result = await signInWithGoogle();
      console.log(result)
      if (result) {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
      Ingresar con Google
    </LoadingButton>
  );
}
