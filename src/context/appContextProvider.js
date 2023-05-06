import PropTypes from 'prop-types';

import { ClientContextProvider } from './client/clientContext';
import { ProductContextProvider } from './product/productContext';
import { UserContextProvider } from './user/userContext';

const AppContextProvider = ({ children }) => (
  <UserContextProvider>
    <ClientContextProvider>
      <ProductContextProvider>{children}</ProductContextProvider>
    </ClientContextProvider>
  </UserContextProvider>
);

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
