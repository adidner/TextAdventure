import React, {useRef,useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import GlobalText from "./GlobalText";
import StoryKey from "./data/StoryKey";
import Constants from 'expo-constants';
import {getCurrentRoom, getCurrentChoices, getCurrentBody, getShowBackChoiceButton} from './redux/selectors';
import {updateRoom, resetRoom, popBackstack, pushBackstack} from './redux/actions'
import { useSelector, useDispatch } from 'react-redux';
import { scale, verticalScale } from 'react-native-size-matters';

export default function Reading(){

  let currentRoom = useSelector(getCurrentRoom);
  let currentChoices = useSelector(getCurrentChoices);
  let currentBody = useSelector(getCurrentBody);
  let showBackChoiceButton = useSelector(getShowBackChoiceButton)

  const dispatch = useDispatch();

  const scrollViewRef = useRef(null);

  let listChoiceElements;
  if(currentChoices.length > 0){
    listChoiceElements = currentChoices.map((item) =>
      <ChoiceElement key={item.choiceURL} newref={scrollViewRef} currentRoom={currentRoom} choiceText={item.choiceText} choiceURL={item.choiceURL} />
    );
  }
  else{
      listChoiceElements = <TouchableOpacity style={styles.buttonGray} onPress={() => {dispatch(resetRoom());scrollViewRef.current.scrollTo({x:0,y:0,animated:false});}}><GlobalText> Play Again? </GlobalText></TouchableOpacity>
  }


  function goBack(){
    dispatch(popBackstack());
    setTimeout(() => {
      scrollViewRef.current.scrollToEnd({animated:false});
    }, 50);
  }


  return(
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>

        <GlobalText>{currentBody}</GlobalText>

        <View>
          {listChoiceElements}
        </View>
        {
        showBackChoiceButton &&
        <TouchableOpacity style={styles.buttonGray} onPress={() => {goBack()}}>
          <GlobalText>
            Go Back a Choice
          </GlobalText>
        </TouchableOpacity>
        }

      </ScrollView>
    </SafeAreaView>
  );
}

function ChoiceElement(props){

  const dispatch = useDispatch();

  return(
    <TouchableOpacity
      onPress={() => {
        dispatch(pushBackstack(props.currentRoom));
        dispatch(updateRoom(props.choiceURL));
        props.newref.current.scrollTo({x:0,y:0,animated:false});
      }}
      style={styles.buttonGray}
    >
      <GlobalText>
        {props.choiceText}
      </GlobalText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    padding: scale(5)
  },
  scrollView: {
    marginHorizontal: scale(7),
  },
  buttonGray:{
    margin: scale(10),
    padding: scale(10),
    backgroundColor: 'gray'
  },
});
