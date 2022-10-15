import { actionCreators } from '@actions';
import { Strings } from '@constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <Text style={styles.title}>{Strings.user_Screen}</Text>
                </View>
            </SafeAreaView>
        );
    }
}
const mapStatetoProps = state => {
    return {};
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, marginHorizontal: 20 },
    title: { fontSize: 20, fontWeight: '600' },
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(actionCreators, dispatch);
export default connect(mapStatetoProps, mapDispatchToProps)(UserScreen);
