import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// @mui
import { MenuItem, Popover } from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';

const ClientOptionsPopover = ({ target, onClose, onDelete, paramId }) => {
  // Hooks
  const navigate = useNavigate();

  return (
    <Popover
      open={Boolean(target)}
      anchorEl={target}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          '& .MuiMenuItem-root': {
            px: 1,
            typography: 'body2',
            borderRadius: 0.75,
          },
        },
      }}
    >
      <MenuItem onClick={() => navigate(`/dashboard/clients/details/${paramId}`)}>
        <Edit />
        Editar
      </MenuItem>

      <MenuItem sx={{ color: 'error.main' }} onClick={onDelete}>
        <Delete />
        Eliminar
      </MenuItem>
    </Popover>
  );
};

ClientOptionsPopover.propTypes = {
  target: PropTypes.any,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  paramId: PropTypes.string,
};

ClientOptionsPopover.defaultProps = {
  target: null,
  onClose: null,
  onDelete: null,
  paramId: null,
};

export default ClientOptionsPopover;
