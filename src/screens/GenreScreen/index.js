import { actionCreators } from '@actions';
import { Strings } from '@constants';
import React from 'react';
import {
	FlatList,
	Image,
	ImageBackground,
	Linking,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	Touchable,
	TouchableOpacity,
	View,
} from 'react-native';
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
import HomeScreenCard from '../../components/HomeScreenCard';

class GenreScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			isModalLoading: false,
			indexPage: 1,
			isDetailModal: false,
			connectionType: '',
			isConnected: '',
			serviceData: [],
			serviceAnimeData: [],
			title: this?.props?.route?.params?.item
		};
	}

	componentDidMount() {
		this._getRecentRelease();
	}

	_getRecentRelease() {
		this.setState({ isLoading: true });
		let recentRelease = APIMethods.get(`/genre/${this.state.title}?page=${this.state.indexPage}`, '', '')
			.then((response) => { console.log(response); this.setState({ serviceData: response.data, isLoading: false }) })
			.catch((err) => { console.log(err) });
	}

	_loadMoreData() {
		this.setState({ isLoading: true });
		let recentRelease = APIMethods.get(`/genre/${this.state.title}?page=${this.state.indexPage}`, '', '')
			.then((response) => {
				this.setState({ serviceData: response.data, isLoading: false })
			})
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
					entry={'bottom'}
				>
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
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<TouchableOpacity onPress={() => { this.props.navigation.goBack() }}>
							<Image source={Icons.icnBack} />
						</TouchableOpacity>
						<Text style={[styles.titleText, { paddingTop: 0, marginLeft: 10 }]}>{this.state.title.toUpperCase()}</Text>
					</View>

					<ScrollView showsVerticalScrollIndicator={false}>
						{this.state.isLoading ? (
							<Skeletton skulldata={['1', '2', '3', '4']} />
						) : (
							<>
								<FlatList
									data={this?.state?.serviceData}
									showsHorizontalScrollIndicator={false}
									style={{ paddingTop: 20, paddingBottom: 50, }}
									bounces={true}
									scrollEnabled={false}
									showsVerticalScrollIndicator={false}
									keyExtractor={(item, index) => item.id}
									ItemSeparatorComponent={() => (<View style={styles.Seperator} />)}
									contentContainerStyle={{ paddingBottom: hp(15) }}
									renderItem={({ item, index }) => (<HomeScreenCard onCardPress={() => this._getAnimeDetails(item.animeId)} data={item} />)}
								/>


							</>
						)}
					</ScrollView>

					<View style={{ flexDirection: 'row', padding: 10, backgroundColor: Colors.sunset, position: 'absolute', alignSelf: 'center', bottom: 10, borderTopRightRadius: 20, justifyContent: 'space-around', width: 150 }}>
						<TouchableOpacity
							onPress={() => { this.setState({ indexPage: this.state.indexPage - 1 }); this._loadMoreData() }}>
							<Image style={{ tintColor: Colors.snowWhite }} source={Icons.icnBack} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => { this.setState({ indexPage: this.state.indexPage + 1 }); this._loadMoreData() }}>
							<Image style={{ tintColor: Colors.snowWhite, transform: [{ rotateZ: '180deg' }] }} source={Icons.icnBack} />
						</TouchableOpacity>
					</View>

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
	return {};
};

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(actionCreators, dispatch);
export default connect(mapStatetoProps, mapDispatchToProps)(GenreScreen);
