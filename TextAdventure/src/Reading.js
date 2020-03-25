import React, {useRef,useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import GlobalText from "./GlobalText";
import StoryKey from "./data/StoryKey";
import Constants from 'expo-constants';
import {getCurrentRoom, getCurrentChoices, getCurrentBody} from './redux/selectors';
import {updateRoom, resetRoom} from './redux/actions'
import { useSelector, useDispatch } from 'react-redux';

export default function Reading(){

  let currentRoom = useSelector(getCurrentRoom);
  let currentChoices = useSelector(getCurrentChoices);
  let currentBody = useSelector(getCurrentBody);

  const dispatch = useDispatch();

  const scrollViewRef = useRef(null);

  let listChoiceElements;
  if(currentChoices.length > 0){
    listChoiceElements = currentChoices.map((item) =>
      <ChoiceElement newref={scrollViewRef} choiceText={item.choiceText} choiceURL={item.choiceURL} />
    );
  }
  else{
      listChoiceElements = <TouchableOpacity style={styles.buttonGray} onPress={() => {dispatch(resetRoom());scrollViewRef.current.scrollTo({x:0,y:0,animated:false});}}><GlobalText> Play Again? </GlobalText></TouchableOpacity>
  }




  return(
    <SafeAreaView style={styles.container}>
      <ScrollView ref={scrollViewRef} style={styles.scrollView}>

        <GlobalText> {currentBody} </GlobalText>

        <View>
          {listChoiceElements}
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

function ChoiceElement(props){

  const dispatch = useDispatch();

  return(
    <TouchableOpacity
      onPress={() => {
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
    padding: 5
  },
  scrollView: {
    marginHorizontal: 4,
  },
  buttonGray:{
    margin: 10,
    padding: 10,
    backgroundColor: 'gray'
  },
});
