import {
  INCREMENT_FONT_SIZE,
  DECREMENT_FONT_SIZE,
  SET_FONT_SIZE,
  UPDATE_ROOM,
  RESET_ROOM,
  POP_BACKSTACK,
  PUSH_BACKSTACK,
} from './actions'

import StoryKey from "../data/StoryKey";

const initialState = {
  fontSize: 18,
  currentRoom: getInitialRoom(StoryKey),
  currentChoices: getInitialChoices(StoryKey),
  currentBody: getInitialBody(StoryKey),
  backstack: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type){
    case INCREMENT_FONT_SIZE:
      if (state.fontSize < 69){
        return {
          ...state,
          fontSize: state.fontSize + 1
        };
      }
      else{
        return state;
      }
    case DECREMENT_FONT_SIZE:
      if (state.fontSize > 1){
        return {
          ...state,
          fontSize: state.fontSize - 1
        };
      }
      else{
        return state;
      }
    case SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.payload
      };
    case UPDATE_ROOM:
      return {
        ...state,
        currentRoom: action.newroom,
        currentChoices: StoryKey.RoomKey[action.newroom].choices,
        currentBody: StoryKey.RoomKey[action.newroom].body,
      }
    case RESET_ROOM:
      console.log("in reset room")
      return {
        ...state,
        currentRoom: getInitialRoom(StoryKey),
        currentChoices: getInitialChoices(StoryKey),
        currentBody: getInitialBody(StoryKey),
        backstack: []
      }
    case PUSH_BACKSTACK:
      let newstackPush = state.backstack;
      newstackPush.push(action.payload);
      return{
        ...state,
        backstack: newstackPush
      }
    case POP_BACKSTACK:
      if (state.backstack.length == 0 ){
        return state;
      }
      let newstackPop = state.backstack;
      let newcurrentRoom = state.currentRoom;
      newcurrentRoom = newstackPop.pop();
      return{
        ...state,
        currentRoom: newcurrentRoom,
        currentChoices: StoryKey.RoomKey[newcurrentRoom].choices,
        currentBody: StoryKey.RoomKey[newcurrentRoom].body,
        backstack: newstackPop
      }
    default:
      return state;
  }
}

function getInitialRoom(StoryKey){
  return Object.keys(StoryKey.RoomKey)[0];
}

function getInitialBody(StoryKey){
  initialRoom = getInitialRoom(StoryKey);
  return StoryKey.RoomKey[initialRoom].body;
}

function getInitialChoices(StoryKey){
  initialRoom = getInitialRoom(StoryKey);
  return StoryKey.RoomKey[initialRoom].choices;
}
