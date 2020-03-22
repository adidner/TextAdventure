import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage, TextInput} from 'react-native';
import GlobalText from "./GlobalText"


export default function Settings(){


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
      <GlobalText> Settings </GlobalText>
      <TextInput></TextInput>
    </View>
  );
}
