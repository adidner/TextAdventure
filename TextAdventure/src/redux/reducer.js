

import {INCREMENT_FONT_SIZE, DECREMENT_FONT_SIZE, SET_FONT_SIZE} from './actions'

const initialState = {
  fontSize: 25
};

export default function rootReducer(state = initialState, action) {
  switch (action.type){
    case INCREMENT_FONT_SIZE:
      return {
        ...state,
        fontSize: state.fontSize + 1
      };
    case DECREMENT_FONT_SIZE:
      return {
        ...state,
        fontSize: state.fontSize - 1
      };
    case SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload
      };
    default:
      return state;
  }
}
