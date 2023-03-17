import PropTypes from 'prop-types';

// icons
import { Icon } from '@iconify/react';

// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Iconify = ({ icon, width = 20, sx, ...other }) => (
  <Box component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
);

Iconify.propTypes = {
  sx: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

Iconify.defaultProps = {
  sx: {},
  width: 20,
  icon: null,
};

export default Iconify;
