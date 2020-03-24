import React, { useState } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';

import {getFontSize} from './redux/selectors';
import { useSelector } from 'react-redux';

export default function GlobalText(props){

  let globalFontSize = useSelector(getFontSize);

  return(
    <View  style={props.style} >
      <Text style={{ fontSize: globalFontSize }}> {props.children} </Text>
    </View>
  );
}
