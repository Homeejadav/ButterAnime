import { actionCreators } from '@actions';
import Lottie from 'lottie-react-native';
import React from 'react';
import { BackHandler, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts } from '../../assets/Fonts';
import lottie3 from '../../assets/Icons/lottie_orange.json';
import lottie1 from '../../assets/Icons/lottie_player.json';
import lottie2 from '../../assets/Icons/lottie_search.json';
import { Colors } from '../../constants/colors';

class OnBoardingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			indexData: 0,
			onBoardingData: [
				{
					anime: lottie1,
					title: `Manage all your Anime${'\n'}at one Place!`,
				},
				{
					anime: lottie2,
					title: `Find your interest${'\n'}with lots of categories.`,
				},
				{
					anime: lottie3,
					title: `Add to Favorites${'\n'}and watch at your own pace.`,
				}
			],
		};
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', () => {
			return true;
		});
	}



	render() {

		let dotStyle = { width: (wp(30) / Dimensions.get('window').width) * 100, height: (hp(4) / Dimensions.get('window').height) * 100, opacity: 0.35, backgroundColor: Colors.metal, flexDirection: 'row', right: wp(30), justifyContent: 'space-between' }
		let activeDotStyle = { width: (wp(30) / Dimensions.get('window').width) * 100, height: (hp(4) / Dimensions.get('window').height) * 100, borderRadius: 3, flexDirection: 'row', backgroundColor: Colors.sunset, right: wp(30), justifyContent: 'flex-start' }

		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Swiper
					style={styles.wrapper}
					scrollEnabled={false}
					loop={false}
					onIndexChanged={(index) => this.setState({ indexData: index })}
					key={this.state.onBoardingData.length}
					pagingEnabled={true}
					dotStyle={dotStyle}
					activeDotColor={Colors.sunset}
					activeDotStyle={activeDotStyle}
					buttonWrapperStyle={{ alignItems: 'flex-end' }}
					showsButtons={true}
					prevButton={<></>}
					nextButton={
						<View style={{ bottom: 0, right: 20, position: 'absolute', borderRadius: 4, backgroundColor: Colors.sunset, width: wp(35), height: hp(5), justifyContent: 'center', alignItems: 'center', }}>
							<Text style={{ fontFamily: Fonts.MEDIUM, color: 'white' }}>Next</Text>
						</View>
					}>

					{this.state.onBoardingData.map((item, index) => {
						return (
							<View key={index} style={styles.slide1}>
								<Lottie style={{ height: hp(50) }} source={(item.anime)} autoPlay loop />
								<View style={{ marginTop: hp(5) }}>
									<Text style={{ fontSize: 24, color: Colors.sunset, textAlign: 'center' }}>{item.title}</Text>
								</View>

								{this.state.indexData === this.state.onBoardingData.length - 1 &&
									<TouchableOpacity onPress={() => { this.props.navigation.navigate('BottomTab') }}
										style={{ bottom: 10, right: 30, position: 'absolute', borderRadius: 4, backgroundColor: Colors.sunset, width: wp(35), height: hp(5), justifyContent: 'center', alignItems: 'center', }}>
										<Text style={{ fontFamily: Fonts.MEDIUM, color: 'white' }}>Explore App</Text>
									</TouchableOpacity>}
							</View>
						)
					})}
				</Swiper>
			</SafeAreaView>
		);
	}
}


const styles = StyleSheet.create({
	safeAreaView: { flex: 1, marginHorizontal: hp(6), paddingVertical: hp(5) },
	slide1: { flex: 1, alignItems: 'center' }
});

const mapStatetoProps = state => { return {} };
const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(OnBoardingScreen);