// @mui
import { alpha, styled } from '@mui/material/styles';
import { Autocomplete } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: 380,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: '1px !important',
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));
