import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';

const ClientContext = createContext();

const initialState = {
  list: [],
  selected: {},
};

const ClientContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ClientContext.Provider value={{ state, dispatch }}>{children}</ClientContext.Provider>;
};

const useClientContext = () => useContext(ClientContext);

ClientContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ClientContext, ClientContextProvider, useClientContext };
