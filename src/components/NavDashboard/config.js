import { Balance, Category, Inventory, Person, ShoppingCartCheckout } from '@mui/icons-material';

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
    title: 'Categorias',
    path: '/dashboard/categories',
    icon: <Category />,
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
