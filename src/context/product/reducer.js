import update from 'react-addons-update';

import { CREATE_PRODUCT, DELETE_PRODUCT, GET_FILTERS, GET_PRODUCT, GET_PRODUCT_LIST, UPDATE_PRODUCT } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      return update(state.list, { $push: [action.payload] });

    case UPDATE_PRODUCT:
      return update(state, {
        list: {
          [action.id]: {
            product: { $set: action.payload },
          },
        },
      });

    case DELETE_PRODUCT:
      return {
        ...state,
        list: state.list.filter((_, i) => i !== action.payload),
      };

    case GET_PRODUCT:
      return {
        ...state,
        selected: action.payload,
      };

    case GET_PRODUCT_LIST:
      return {
        ...state,
        list: Object.values(action.payload),
      };

    case GET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
