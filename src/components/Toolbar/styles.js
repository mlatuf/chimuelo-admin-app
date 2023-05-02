// @mui
import { styled } from '@mui/material/styles';
import { Toolbar } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));
