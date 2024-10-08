import PropTypes from 'prop-types';

import { CategoryContextProvider } from './category/categoryContext';
import { ClientContextProvider } from './client/clientContext';
import { ProductContextProvider } from './product/productContext';
import { UserContextProvider } from './user/userContext';

const AppContextProvider = ({ children }) => (
  <UserContextProvider>
    <ClientContextProvider>
      <CategoryContextProvider>
        <ProductContextProvider>{children}</ProductContextProvider>
      </CategoryContextProvider>
    </ClientContextProvider>
  </UserContextProvider>
);

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
