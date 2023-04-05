import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ConfirmationModal = ({ open, title, description, onConfirm, onClose }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose} variant="contained" color="inherit">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained">
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmationModal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func,
};

ConfirmationModal.defaultProps = {
  open: false,
  description: '',
  onClose: null,
};

export default ConfirmationModal;
