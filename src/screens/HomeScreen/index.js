import { actionCreators } from '@actions';
import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modalbox';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Fonts } from '../../assets/Fonts';
import { Icons } from '../../assets/Icons';
import HomeScreenCard from '../../components/HomeScreenCard';
import Skeletton from '../../components/Skeletton';
import SkelettonModal from '../../components/SkelettonModal';
import { Colors } from '../../constants/colors';
import { DETAILS, RECENT_LIST } from '../../services/API/endpoints';
import { APIMethods } from '../../services/API/methods';

class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false, isModalLoading: false, isDetailModal: false,
			connectionType: '', isConnected: '',
			serviceData: [], serviceAnimeData: [],
		};
	}

	componentDidMount() {
		this._getRecentRelease();
	}

	_getRecentRelease() {
		this.setState({ isLoading: true });
		let recentRelease = APIMethods.get(RECENT_LIST, '', '')
			.then((response) => { console.log(response); this.setState({ serviceData: response.data, isLoading: false }) })
			.catch((err) => { console.log(err) });
	}

	_getAnimeDetails(animeID) {
		this.setState({ isDetailModal: true, isModalLoading: true });
		let recentRelease = APIMethods.get(`${DETAILS}${animeID}`, '', '')
			.then((response) => { console.log(response); this.setState({ serviceAnimeData: response.data, isModalLoading: false }) })
			.catch((err) => { console.log(err) });
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>

				<Modal
					style={styles.modalStyle}
					isOpen={this.state.isDetailModal}
					swipeToClose={false}
					backdropPressToClose={() => this.setState({ isDetailModal: false })}
					onClosed={() => this.setState({ isDetailModal: false })}
					position={'bottom'}
					entry={'bottom'}>
					{this.state.isModalLoading ? (
						<View style={{ margin: 20 }}>
							<SkelettonModal skulldata={['1', '2', '3']} />
						</View>
					) : (
						<View style={{ margin: 20 }}>
							<View style={styles.modalContentContainer}>
								<Text style={styles.statusText}>
									<Text style={{ fontFamily: Fonts.MEDIUM, color: Colors.metal }}> Status -{' '}</Text>
									{this.state.serviceAnimeData.status}
								</Text>
								<TouchableOpacity
									onPress={() => this.setState({ isDetailModal: false })}
									style={{ alignSelf: 'flex-end' }}>
									<Image style={{ tintColor: Colors.sunset }} source={Icons.icnClose} />
								</TouchableOpacity>
							</View>

							<ScrollView style={{ marginTop: 10 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: hp(20) }}>
								<Text style={styles.animeTitle}>{this.state.serviceAnimeData.animeTitle}</Text>
								<Image style={styles.imageStyle} source={{ uri: this.state.serviceAnimeData.animeImg }} />
								<Text style={styles.detailsText}>{this.state.serviceAnimeData.synopsis}</Text>
								<Text style={styles.genreTextTitle}>{'Genres'}</Text>
								<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
									{this?.state?.serviceAnimeData?.genres?.map((data) => {
										return (
											<View style={styles.mapContainer}>
												<Text style={styles.genreText}>{data}</Text>
											</View>
										)
									})}
								</View>
								<Text style={styles.titleText}>{'Number Of Episodes'}</Text>
								<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
									{this?.state?.serviceAnimeData?.episodesList?.map((data) => {
										return (
											<View style={styles.mapEpisodeContainer}>
												<Text style={styles.mapEpisodeText}>Episode {data.episodeNum}</Text>
											</View>
										);
									})}
								</View>
							</ScrollView>
						</View>
					)}
				</Modal>

				<View style={styles.mainContainer}>
					<Text style={styles.titleText}>RECENT EPISODES</Text>
					<ScrollView showsVerticalScrollIndicator={false}>
						{this.state.isLoading ? (
							<Skeletton skulldata={['1', '2', '3', '4']} />
						) : (
							<FlatList
								data={this.state.serviceData}
								showsHorizontalScrollIndicator={false}
								style={{ paddingTop: 20, paddingBottom: 50 }}
								bounces={true}
								scrollEnabled={false}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item, index) => item.id}
								ItemSeparatorComponent={() => (<View style={styles.Seperator} />)}
								contentContainerStyle={{ paddingBottom: hp(15) }}
								renderItem={({ item, index }) => (
									<HomeScreenCard
										onCardPress={() => this._getAnimeDetails(item.animeId)}
										data={item} />
								)}
							/>
						)}
					</ScrollView>
				</View>

			</SafeAreaView>
		);
	}

}

const styles = StyleSheet.create({
	mainContainer: { flex: 1, marginHorizontal: 20 },
	titleText: { paddingTop: 20, fontSize: 24, fontFamily: Fonts.BOLD },
	title: { fontSize: 20, fontWeight: '600' },
	imageStyle: { height: 300, width: '100%', borderTopRightRadius: 20, marginTop: 20, },
	netInfoTitle: { fontSize: 14, fontWeight: '600', opacity: 0.5 },
	modalStyle: { height: '85%', borderTopLeftRadius: 20, borderTopRightRadius: 20, },
	modalContentContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
	mapEpisodeContainer: { marginRight: 12, marginTop: 10, justifyContent: 'center', alignItems: 'center', },
	mapEpisodeText: { fontFamily: Fonts.REGULAR, width: 100, fontSize: 16, color: Colors.sunset, },
	numberOfEpisode: { paddingTop: 10, fontSize: 24, fontFamily: Fonts.BOLD, },
	statusText: { fontSize: 16, color: Colors.sunset, fontFamily: Fonts.MEDIUM, },
	animeTitle: { paddingTop: 10, fontSize: 24, fontFamily: Fonts.BOLD, },
	genreTextTitle: { paddingTop: 10, fontSize: 24, fontFamily: Fonts.BOLD, },
	genreText: { fontSize: 16, fontFamily: Fonts.MEDIUM, color: Colors.sunset, },
	Seperator: { marginTop: 50, marginBottom: 30, width: '100%', height: 1, backgroundColor: Colors.sunset, opacity: 0.2, },
	detailsText: { paddingTop: 10, fontSize: 16, color: Colors.sunset, fontFamily: Fonts.MEDIUM, },
	mapContainer: { marginRight: 10, borderTopRightRadius: 10, borderColor: Colors.sunset, marginTop: 10, padding: 5, borderWidth: 1, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center', }
});

const mapStatetoProps = (state) => {
	return {

	}
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStatetoProps, mapDispatchToProps)(HomeScreen);
