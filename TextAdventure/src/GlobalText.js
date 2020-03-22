import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';


export default function GlobalText(props){

  const [globalFontSize, setGlobalFontSize] = useState(30);

  storageKey = "fontSize";

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem(storageKey)
      if(value !== null) {
        setGlobalFontSize(parseInt(value))
      }
    } catch(e) {
      // error reading value
    }
  }



  return(
    <View>
      <Text style={{ fontSize: globalFontSize }}> {props.children} </Text>
    </View>
  );
}
