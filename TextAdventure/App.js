import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {Icon} from 'react-native-elements';
import StoryKey from "./src/data/StoryKey";


import { Provider } from 'react-redux';
import configureStore from './src/redux/store';
const {store, persistor} = configureStore();

import MainMenu from "./src/MainMenu";
import Settings from "./src/Settings";
import Reading from "./src/Reading";

import { PersistGate } from 'redux-persist/integration/react';

import { scale, verticalScale } from 'react-native-size-matters';


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
            title: StoryKey.StoryName,
        		headerRight: () =>(
        			<View>
        					<Icon iconStyle={{fontSize: scale(25), margin: scale(10)}} type='AntDesign'
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
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Navigation/>
            </PersistGate>
          </Provider>
        );
    }
}
