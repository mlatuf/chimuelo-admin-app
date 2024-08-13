import update from 'react-addons-update';

import { CREATE_CLIENT, DELETE_CLIENT, GET_CLIENT, GET_CLIENT_LIST, UPDATE_CLIENT } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_CLIENT:
      return update(state.list, { $push: [action.payload] });

    case UPDATE_CLIENT:
      return update(state, {
        list: {
          [action.id]: {
            client: { $set: action.payload },
          },
        },
      });

    case DELETE_CLIENT:
      return {
        ...state,
        list: state.list.filter((_, i) => i.id !== action.payload),
      };

    case GET_CLIENT:
      return {
        ...state,
        selected: action.payload,
      };

    case GET_CLIENT_LIST:
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
