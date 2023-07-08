import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import { CategoriesPage, ClientDetailsPage, ClientsPage, LoginPage, Page404, ProductsPage } from 'pages';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/clients" />, index: true },
        { path: 'clients', element: <ClientsPage /> },
        { path: 'clients/details', element: <ClientDetailsPage /> },
        { path: 'clients/details/:clientId', element: <ClientDetailsPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'categories', element: <CategoriesPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/clients" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
