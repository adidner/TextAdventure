import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Linking, Alert} from 'react-native';
import GlobalText from "./GlobalText";
import Constants from 'expo-constants';
import { Overlay } from 'react-native-elements';
import {getFontSize} from './redux/selectors';
import {incrementFontSize, decrementFontSize} from './redux/actions'
import { useSelector, useDispatch } from 'react-redux';
import StoryKey from "./data/StoryKey";


export default function Settings(){

  let globalFontSize = useSelector(getFontSize);
  const dispatch = useDispatch();

  const [creditAlertVisible, setCreditAlertVisible] = useState(false)





  return(
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <Overlay
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="lightgray"
          width="80%"
          height="80%"
          isVisible={creditAlertVisible}
        >
          <View style={{flex: 1,justifyContent:"space-between"}}>
            <View>
              <Text style={{alignSelf: 'flex-start', fontSize: 30, marginBottom: 10}}>Story Credits</Text>
              <Text style={styles.modalButton}>Written By: {StoryKey.Author}</Text>
              <Text style={styles.modalButtonGray} onPress={() => Linking.openURL(StoryKey.LinkToProfile)}>
                Web Profile
              </Text>
              <Text style={styles.modalButtonGray} onPress={() => Linking.openURL(StoryKey.LinkToStorySite)}>
                Web Version
              </Text>
            </View>
            <Text style={styles.modalButtonGrayRight} onPress={() => setCreditAlertVisible(false)}>close</Text>
          </View>
        </Overlay>

        <View style={styles.element, {flexDirection: 'row'}}>
          <Text style={styles.fontSizing}> Story Font Size:</Text>
          <Text style={styles.fontSizing}> {globalFontSize} </Text>
          <TouchableOpacity onPress={() => dispatch(decrementFontSize())} style={styles.button}><Text style={styles.fontSizing}> - </Text></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(incrementFontSize())} style={styles.button}><Text style={styles.fontSizing}> + </Text></TouchableOpacity>
        </View>

        <LinkButton linkURL={'https://adidner.wixsite.com/textadventureprivacy'}>Privacy Policy </LinkButton>
        <LinkButton linkURL={'https://adidner.wixsite.com/textadventureprivacy/contact'}>Contact Us </LinkButton>
        <LinkButton linkURL={'https://adidner.wixsite.com/textadventureprivacy/blank-page'}>App Credits </LinkButton>
        <TouchableOpacity style={styles.element} onPress={() => setCreditAlertVisible(true)} >
          <Text style={styles.fontSizing}>Story Credits</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function LinkButton(props){
  return(
    <TouchableOpacity style={styles.element} onPress={() => Linking.openURL(props.linkURL)}>
      <Text style={styles.fontSizing}>{props.children}</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  button: {
    backgroundColor: 'gray',
    marginLeft: 8,
    padding: 0
  },
  scrollView: {
    marginHorizontal: 4,
  },
  element: {
    marginLeft: 4,
    marginTop: 13,
  },
  fontSizing: {
    fontSize: 30
  },
  modalButton:{
    fontSize: 17,
    margin: 10,
    padding: 10,
    alignSelf:'center'
  },
  modalButtonGray:{
    fontSize: 17,
    margin: 10,
    padding: 10,
    backgroundColor: 'gray',
    alignSelf: 'center'
  },
  modalButtonGrayRight:{
    fontSize: 17,
    margin: 10,
    padding: 10,
    backgroundColor: 'gray',
    alignSelf: 'flex-end'
  }
});
