import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import reducer from './reducer';

const ProductContext = createContext();

const initialState = {
  list: [],
  selected: {},
  filters: { category: 0 },
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ProductContext.Provider value={{ state, dispatch }}>{children}</ProductContext.Provider>;
};

const useProductContext = () => useContext(ProductContext);

ProductContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ProductContext, ProductContextProvider, useProductContext };
