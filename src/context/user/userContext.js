import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';

const UserContext = createContext();

const initialState = {
  user: {},
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserContextProvider, useUserContext };
