// @mui
import { Card, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4)
}));

export const StyledForm = styled(Box)(() => ({
  '& .MuiTextField-root': { 
    m: 1, 
    width: '25ch' 
  }
}))