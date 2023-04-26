import { Balance, Inventory, Person, ShoppingCartCheckout } from '@mui/icons-material';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Clientes',
    path: '/dashboard/clients',
    icon: <Person />,
  },
  {
    title: 'Productos',
    path: '/dashboard/products',
    icon: <Inventory />,
  },
  {
    title: 'Pedidos',
    path: '/dashboard/orders',
    icon: <ShoppingCartCheckout />,
  },
  {
    title: 'Finanzas',
    path: '/dashboard/balance',
    icon: <Balance />,
  },
];

export default navConfig;
