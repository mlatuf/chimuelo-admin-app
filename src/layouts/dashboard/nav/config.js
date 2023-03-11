import {
  Person, 
  Inventory,
  ShoppingCartCheckout,
  Balance,

} from '@mui/icons-material';

// ----------------------------------------------------------------------


const navConfig = [
  {
    title: 'Clientes',
    path: '/dashboard/clients',
    icon: <Person />
  },
  {
    title: 'Productos',
    path: '/dashboard/products',
    icon: <Inventory />
  },
  {
    title: 'Pedidos',
    path: '/dashboard/products',
    icon: <ShoppingCartCheckout />,
  },
  {
    title: 'Finanzas',
    path: '/dashboard/products',
    icon: <Balance />,
  },
];

export default navConfig;
