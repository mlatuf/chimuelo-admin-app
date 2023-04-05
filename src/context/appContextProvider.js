import PropTypes from 'prop-types';

import { ClientContextProvider } from './client/clientContext';
import { UserContextProvider } from './user/userContext';

const AppContextProvider = ({ children }) => (
  <UserContextProvider>
    <ClientContextProvider>{children}</ClientContextProvider>
  </UserContextProvider>
);

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppContextProvider;
