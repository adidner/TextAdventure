export const INCREMENT_FONT_SIZE = "INCREMENT_FONT_SIZE";
export const DECREMENT_FONT_SIZE = "DECREMENT_FONT_SIZE";
export const SET_FONT_SIZE = "SET_FONT_SIZE";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const RESET_ROOM = "RESET_ROOM";
export const PUSH_BACKSTACK = "PUSH_BACKSTACK";
export const POP_BACKSTACK = "POP_BACKSTACK";

export function incrementFontSize(){
  return {type: INCREMENT_FONT_SIZE}
}

export function decrementFontSize(){
  return {type: DECREMENT_FONT_SIZE}
}

export function setFontSize(payload){
  return {type: SET_FONT_SIZE, payload}
}

export function updateRoom(newroom){
  return {type: UPDATE_ROOM, newroom}
}

export function resetRoom(){
  return {type: RESET_ROOM}
}

export function pushBackstack(payload){
  return {type: PUSH_BACKSTACK, payload}
}

export function popBackstack(){
  return {type: POP_BACKSTACK}
}
