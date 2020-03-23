import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput, TouchableOpacity, SafeAreaView, ScrollView, Linking} from 'react-native';
import GlobalText from "./GlobalText";
import Constants from 'expo-constants';
import {getFontSize} from './redux/selectors';
import {incrementFontSize, decrementFontSize} from './redux/actions'
import { useSelector, useDispatch } from 'react-redux';


export default function Settings(){

  let globalFontSize = useSelector(getFontSize);
  const dispatch = useDispatch();




  return(
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>

        <View style={styles.element, {flexDirection: 'row'}}>
          <GlobalText> Font Size:</GlobalText>
          <GlobalText> {globalFontSize} </GlobalText>
          <TouchableOpacity onPress={() => dispatch(decrementFontSize())} style={styles.button}><GlobalText > - </GlobalText></TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(incrementFontSize())} style={styles.button}><GlobalText> + </GlobalText></TouchableOpacity>
        </View>

        <LinkButton linkURL={'https://adidner.wixsite.com/textadventureprivacy'}>Privacy Policy </LinkButton>
        <LinkButton linkURL={'https://adidner.wixsite.com/textadventureprivacy/contact'}>Contact Us </LinkButton>
        <LinkButton linkURL={'https://adidner.wixsite.com/textadventureprivacy/blank-page'}>Credits </LinkButton>
      </ScrollView>
    </SafeAreaView>
  );
}

function LinkButton(props){
  return(
    <TouchableOpacity style={styles.element} onPress={() => Linking.openURL(props.linkURL)}>
      <GlobalText>{props.children}</GlobalText>
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
    margin: 4
  },
  scrollView: {

    marginHorizontal: 4,
  },
  element: {
    marginLeft: 4,
    marginTop: 13,
  },
});
