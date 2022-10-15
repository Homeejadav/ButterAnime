import React from 'react'
import { Provider } from 'react-redux';
import myStore from './reducers';
import { StackNavigator } from '@navigators'
import NetInfo from "@react-native-community/netinfo";
import { Text, View } from 'react-native';

const store = myStore()


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connectionType: '',
            isConnected: '',
        };
    }

    render() {
        return (
            <Provider store={store}>
                <StackNavigator />
            </Provider >
        )
    }
}