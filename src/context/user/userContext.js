import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';
import { LOGIN_USER, LOGOUT_USER } from './actions';

const UserContext = createContext();

const initialState = {
  user: {},
};

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loginUserDispatch = (user) => dispatch({ type: LOGIN_USER, payload: user });
  const logoutUserDispatch = dispatch({ type: LOGOUT_USER, payload: 'logout' });

  return (
    <UserContext.Provider value={{ user: state.user, loginUserDispatch, logoutUserDispatch, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserContext, UserContextProvider, useUserContext };
