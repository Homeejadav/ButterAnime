import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this?.props?.route?.params?.url
        };
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1 }}>

                <WebView
                    setSupportMultipleWindows={false}
                    source={{ uri: this.state.url }}
                />

            </SafeAreaView>

        );
    }
}

export default index;
