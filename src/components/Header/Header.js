import PropTypes from 'prop-types';

// @mui
import { Box, IconButton, Stack } from '@mui/material';

// components
import { AccountPopover, Iconify, Searchbar } from 'components';

import { StyledRoot, StyledToolbar } from './styles.js';

// ----------------------------------------------------------------------

const Header = ({ onOpenNav, user, onLogout }) => {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <AccountPopover user={user} onLogout={onLogout} />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
  onOpenNav: PropTypes.func,
  onLogout: PropTypes.func,
};

Header.defaultProps = {
  onOpenNav: null,
  onLogout: null,
};

export default Header;
