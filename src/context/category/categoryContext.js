import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';

const CategoryContext = createContext();

const initialState = {
  list: [],
  selected: {},
};

const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <CategoryContext.Provider value={{ state, dispatch }}>{children}</CategoryContext.Provider>;
};

const useCategoryContext = () => useContext(CategoryContext);

CategoryContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CategoryContext, CategoryContextProvider, useCategoryContext };
