export const INCREMENT_FONT_SIZE = "INCREMENT_FONT_SIZE";
export const DECREMENT_FONT_SIZE = "DECREMENT_FONT_SIZE";
export const SET_FONT_SIZE = "SET_FONT_SIZE";


export function incrementFontSize(){
  return {type: INCREMENT_FONT_SIZE}
}

export function decrementFontSize(){
  return {type: DECREMENT_FONT_SIZE}
}

export function setFontSize(payload){
  return {type: SET_FONT_SIZE, payload}
}
