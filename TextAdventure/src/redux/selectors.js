

export function getFontSize(state){
  return state.fontSize;
}

export function getCurrentRoom(state){
  return state.currentRoom;
}

export function getCurrentChoices(state){
  return state.currentChoices;
}

export function getCurrentBody(state){
  return state.currentBody;
}

export function getShowBackChoiceButton(state){
  return (state.backstack.length > 0);
}
