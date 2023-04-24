import PropTypes from 'prop-types';

// @mui
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const LoginForm = ({ onSubmit }) => (
  <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={onSubmit}>
    Ingresar con Google
  </LoadingButton>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
