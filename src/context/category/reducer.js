import update from 'react-addons-update';

import { CREATE_CATEGORY, DELETE_CATEGORY, GET_CATEGORY, GET_CATEGORY_LIST, UPDATE_CATEGORY } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_CATEGORY:
      return update(state.list, { $push: [action.payload] });

    case UPDATE_CATEGORY:
      return update(state, {
        list: {
          [action.id]: {
            client: { $set: action.payload },
          },
        },
      });

    case DELETE_CATEGORY:
      return {
        ...state,
        list: state.list.filter((_, i) => i !== action.payload),
      };

    case GET_CATEGORY:
      return {
        ...state,
        selected: action.payload,
      };

    case GET_CATEGORY_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
