import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking } from 'react-native';
import GlobalText from "./GlobalText";
import Reading from "./Reading";
import StoryKey from "./data/StoryKey";
import { useDispatch } from 'react-redux';
import { resetRoom } from './redux/actions';

export default function MainMenu(props){

  const dispatch = useDispatch();

  return(
    <View style={{alignItems: 'center', flex:1, justifyContent: 'space-between'}}>
      <Text> </Text>

      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 40}}>{StoryKey.StoryName}</Text>

        <View style={{flexDirection: "row", alignItems:'center'}}>
          <Image
              style={{width: 25, height: 40}}
              source={require('../assets/icon_assets/icon-for-title.png')}
            />
            <Text style={{fontSize: 35}}> Infinite Paths </Text>
        </View>
      </View>

      <View style={{paddingBottom: 10}}>
        <MenuButton onPress={() => {dispatch(resetRoom());props.navigation.navigate('Reading');}}>New Story</MenuButton>
        <MenuButton onPress={() => {props.navigation.navigate('Reading')}}>Continue Story</MenuButton>
        <MenuButton>More Stories</MenuButton>
      </View>
    </View>
  );
}

function MenuButton(props){
  return(
    <TouchableOpacity onPress={props.onPress} style={{backgroundColor: "gray", padding: 10, margin: 4}}>
      <Text style={{fontSize: 30}}>
        {props.children}
      </Text>
    </TouchableOpacity>

  );
}
