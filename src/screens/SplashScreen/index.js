import { actionCreators } from '@actions';
import { Strings } from '@constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    _splashTimeout() {
        return setTimeout(() => {
            this.props.navigation.replace('BottomTab');
        }, 1000);
    }

    componentDidMount() {
        this._splashTimeout();
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>{Strings.splash_Screen}</Text>
                </View>
            </SafeAreaView>
        );
    }
}
const mapStatetoProps = state => {
    return {};
};

const styles = StyleSheet.create({
    mainContainer: { justifyContent: 'center', alignItems: 'center', flex: 1 },
    title: { fontSize: 20, fontWeight: '600' },
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(actionCreators, dispatch);
export default connect(mapStatetoProps, mapDispatchToProps)(SplashScreen);
