import { actionCreators } from '@actions';
import { Strings } from '@constants';
import React from 'react';
import { FlatList, Image, ImageBackground, Linking, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetInfo from '@react-native-community/netinfo';
import { Fonts, FontSize } from '../../assets/Fonts';
import { Colors } from '../../constants/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { APIMethods } from '../../services/API/methods';
import { DETAILS, RECENT_LIST } from '../../services/API/endpoints';
import { Icons } from '../../assets/Icons';
import Share from 'react-native-share';
import Skeletton from '../../components/Skeletton';
import Modal from 'react-native-modalbox';
import SkelettonModal from '../../components/SkelettonModal';

class FavoriteScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isModalLoading: false,
			isDetailModal: false,
			connectionType: '',
			isConnected: '',
			serviceData: [],
			serviceAnimeData: [],
			favorite: this.props.favorite
		};
	}

	componentDidMount() {
		// console.log(this.state.favorite, '===== favorite');
		NetInfo.fetch().then(state => {
			console.log('Connection type', state.type);
			console.log('Is connected?', state.isConnected);
			this.setState({
				connectionType: state.type,
				isConnected: state.isConnected,
			});
		});
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.mainContainer}>
					<Text style={{ paddingTop: 20, fontSize: 24, fontFamily: Fonts.BOLD }}>
						FAVORITES
					</Text>
					<ScrollView contentContainerStyle={{ flex: 1 }} style={{}} showsVerticalScrollIndicator={false}>
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontFamily: Fonts.MEDIUM, color: Colors.sunset, fontSize: 18 }}>Add Anime{'\n'}to Favorites</Text>
						</View>
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	mainContainer: { flex: 1, marginHorizontal: 20 },
	title: { fontSize: 20, fontWeight: '600' },
	netInfoTitle: { fontSize: 14, fontWeight: '600', opacity: 0.5 },
});

const mapStatetoProps = state => { return { favorite: state.redState.favorite }; };
const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(FavoriteScreen);
