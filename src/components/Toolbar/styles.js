// @mui
import { styled } from '@mui/material/styles';
import { Toolbar } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1, 1, 3),
}));
