import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import GlobalText from "./GlobalText";
import Reading from "./Reading";
import StoryKey from "./data/StoryKey";
import { useDispatch } from 'react-redux';
import { resetRoom } from './redux/actions';
import { scale, verticalScale } from 'react-native-size-matters';

export default function MainMenu(props){

  const dispatch = useDispatch();

  return(
    <View style={{alignItems: 'center', flex:1, justifyContent: 'space-between'}}>
      <Text> </Text>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: scale(40)}}>{StoryKey.StoryName}</Text>

        <View style={{flexDirection: "row", alignItems:'center'}}>
          <Image
              style={{width: scale(25), height: scale(40)}}
              source={require('../assets/icon_assets/icon-for-title.png')}
            />
            <Text style={{fontSize: scale(35)}}> Infinite Paths </Text>
        </View>
      </View>

      <View style={{paddingBottom: scale(10)}}>
        <MenuButton onPress={() => {dispatch(resetRoom());props.navigation.navigate('Reading');}}>New Story</MenuButton>
        <MenuButton onPress={() => {props.navigation.navigate('Reading')}}>Continue Story</MenuButton>
        <MenuButton>More Stories</MenuButton>
      </View>
    </View>
  );
}

function MenuButton(props){
  return(
    <TouchableOpacity onPress={props.onPress} style={{backgroundColor: "gray", padding: scale(10), margin: scale(4)}}>
      <Text style={{fontSize: scale(30)}}>
        {props.children}
      </Text>
    </TouchableOpacity>

  );
}
