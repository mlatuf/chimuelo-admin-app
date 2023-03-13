import { useState } from 'react';
import PropTypes from 'prop-types';

// @mui
import { 
  Alert,
  Snackbar
} from '@mui/material'

const Notification = ({ opened, message, variant = "success"}) => {
  
  // States
  const [open, setOpen] = useState(opened)
 
  const handleClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return ( 
  <Snackbar 
    open={open} 
    autoHideDuration={6000} 
    onClose={handleClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert 
      onClose={handleClose}
      severity={variant}
      sx={{ width: '100%' }}
      variant="filled"
    >
    {message}
    </Alert> 
  </Snackbar>
)}

Notification.propTypes = {
  opened: PropTypes.bool,
  message: PropTypes.string,
  variant: PropTypes.string
}

export default Notification;