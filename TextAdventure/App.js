import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Icon} from 'react-native-elements';


import MainMenu from "./src/MainMenu"
import Settings from "./src/Settings"
import Reading from "./src/Reading"


export default class App extends React.Component {
    render() {




      const AppNavigator = createStackNavigator(
        {
        MainMenu: {screen: MainMenu},
        Settings: {screen: Settings},
        Reading: {screen: Reading}
      },
      {
        defaultNavigationOptions: ({navigation}) => {
          return{
        		headerRight: () =>(
        			<View>
        					<Icon iconStyle={{fontSize: 25, margin: 10}} type='AntDesign'
        					name='settings' onPress={() => navigation.navigate('Settings') }> </Icon>

        			</View>
        		)
          };
        },
        initialRouteName: 'MainMenu',

      }
      );

      const Navigation = createAppContainer(AppNavigator);

        return (
            <Navigation/>
        );
    }
}
