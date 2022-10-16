import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screen from '@screens';
import React from 'react';
import { StatusBar } from 'react-native';

import BottomTabNav from './bottomTabNavigator';

const Stack = createNativeStackNavigator();

export class StackNavigator extends React.Component {

    _addScreen(name) {
        return <Stack.Screen name={name} component={Screen[name]} />;
    }

    render() {
        return (
            <NavigationContainer>
                <StatusBar barStyle="dark-content" />
                <Stack.Navigator

                    screenOptions={{ headerShown: false }}>

                    {/* {this._addScreen('SplashScreen')} */}
                    {/* {this._addScreen('OnBoardingScreen')} */}
                    <Stack.Screen name={'BottomTab'} component={BottomTabNav} />
                    {this._addScreen('WatchScreen')}
                    {this._addScreen('GenreScreen')}

                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}
