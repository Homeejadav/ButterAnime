import { actionCreators } from '@actions';
import React from 'react';
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import { DETAILS, SEARCH, TOPAIRING } from '../../services/API/endpoints';
import { APIMethods } from '../../services/API/methods';

class SearchScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			connectionType: '',
			isConnected: '',
			isLoading: false,
			serviceData: [],
			search: '',
			isModalLoading: false,
			serviceAnimeData: [],
			topAiring: [],
		};
	}

	componentDidMount() {
		this._getRecentTop();
	}

	_getRecentTop() {
		this.setState({ isLoading: true });
		let recentRelease = APIMethods.get(`${TOPAIRING}`, '', '')
			.then(response => {
				console.log(response);
				this.setState({ topAiring: response.data, isLoading: false });
			})
			.catch(err => { console.log(err) });
	}

	_SearchAnime() {
		this.setState({ isLoading: true, });
		let recentRelease = APIMethods.get(`${SEARCH}${this.state.search}`, '', '')
			.then(response => {
				console.log(response);
				this.setState({ serviceData: response.data, isLoading: false })
			})
			.catch(err => { console.log(err) });
	}

	_getAnimeDetails(animeID) {
		this.setState({ isDetailModal: true, isModalLoading: true });
		let recentRelease = APIMethods.get(`${DETAILS}${animeID}`, '', '')
			.then(response => {
				console.log(response); this.setState({ serviceAnimeData: response.data, isModalLoading: false })
			})
			.catch(err => { console.log(err) });
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
									<Text style={{ fontFamily: Fonts.MEDIUM, color: Colors.metal }}> Status - {' '}</Text>
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
					<Text style={styles.titleText}>SEARCH</Text>
					<ScrollView showsVerticalScrollIndicator={false}>
						<View style={styles.searchContainer}>
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Image opacity={0.5} style={{ tintColor: Colors.sunset }} source={Icons.icnSearch} />
								<TextInput style={styles.textInputStyle}
									autoCorrect={true} autoCapitalize={false}
									placeholderTextColor={Colors.metalTransparent}
									placeholder={"Type Anime name"}
									onChangeText={text => { this.setState({ search: text }) }}
									value={this.state.search}
									returnKeyType={'search'}
									onSubmitEditing={() => { this._SearchAnime() }}
									onBlur={() => { this._SearchAnime() }}
								/>
								{this.state.search.length > 0 && (
									<TouchableOpacity style={{ width: 40 }} onPress={() => { this.setState({ search: '', serviceData: [] }) }}>
										<Image opacity={1} style={{ tintColor: Colors.sunset }} source={Icons.icnClose} />
									</TouchableOpacity>
								)}
							</View>

							{this?.state?.search?.length > 3 && (
								<FlatList
									data={this.state.serviceData}
									keyExtractor={(item, index) => item.id}
									style={{ maxHeight: 100, marginTop: 10, }}
									ItemSeparatorComponent={() => (<View style={styles.searchSeperator} />)}
									renderItem={({ item, index }) => (
										<TouchableOpacity
											onPress={() => { this.setState({ search: item?.animeTitle }); setTimeout(() => { this._SearchAnime() }, 500) }}>
											<Text style={styles.searchBoxTitle}>{item?.animeTitle}</Text>
										</TouchableOpacity>
									)}
								/>
							)}
						</View>


						{this.state.isLoading ? (
							<Skeletton skulldata={['1', '2', '3', '4']} />
						) : this.state.topAiring.length > 0 &&
							this.state.serviceData.length == 0 ? (
							<View style={{ flex: 1 }}>
								{this.state.serviceData.length == 0 &&
									<View style={styles.noResultContainer}>
										<Text style={{ color: Colors.metalTransparent, fontFamily: Fonts.REGULAR }}>No Results</Text>
									</View>}

								<FlatList
									data={this.state.topAiring}
									showsHorizontalScrollIndicator={false}
									style={{ paddingBottom: 50, marginTop: 10 }}
									bounces={true}
									ListHeaderComponent={() => (<Text style={styles.headerComponentText}>TOP AIRING</Text>)}
									scrollEnabled={false}
									showsVerticalScrollIndicator={false}
									keyExtractor={(item, index) => item.id}
									ItemSeparatorComponent={() => (<View style={styles.Seperator} />)}
									contentContainerStyle={{ paddingBottom: hp(15) }}
									renderItem={({ item, index }) => (<HomeScreenCard onCardPress={() => { this._getAnimeDetails(item.animeId) }} data={item} />)}
								/>
							</View>
						) : (
							<FlatList
								data={this.state.serviceData}
								showsHorizontalScrollIndicator={false}
								style={{ paddingTop: 0, paddingBottom: 50 }}
								bounces={true}
								ListHeaderComponent={() => (
									<View style={{ paddingBottom: 20, alignItems: 'center' }}>
										<Text style={{ color: Colors.metalTransparent, fontFamily: Fonts.REGULAR }}>{this?.state?.serviceData?.length} Results found</Text>
									</View>
								)}
								scrollEnabled={false}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item, index) => item.id}
								ItemSeparatorComponent={() => (<View style={styles.Seperator} />)}
								contentContainerStyle={{ paddingBottom: hp(15) }}
								renderItem={({ item, index }) => (<HomeScreenCard onCardPress={() => { this._getAnimeDetails(item.animeId) }} data={item} />)}
							/>
						)
						}
					</ScrollView>
				</View>
			</SafeAreaView>
		);
	}
}
const mapStatetoProps = state => {
	return {
		favorite: state.redState.favorite
	};
};


const styles = StyleSheet.create({
	mainContainer: { flex: 1, marginHorizontal: 20 },
	noResultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	headerComponentText: { paddingBottom: 20, fontSize: 24, fontFamily: Fonts.BOLD, },
	searchContainer: { justifyContent: 'center', marginTop: 20, marginBottom: 20, borderTopRightRadius: 20, paddingHorizontal: 20, paddingVertical: 15, borderWidth: 1, borderColor: Colors.sunset, backgroundColor: 'white', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5, },
	searchSeperator: { height: 1, marginVertical: 5, opacity: 0.1, backgroundColor: Colors.sunset, },
	titleText: { paddingTop: 20, fontSize: 24, fontFamily: Fonts.BOLD },
	textInputStyle: { marginLeft: 20, marginRight: 20, width: '70%', fontFamily: Fonts.REGULAR, },
	title: { fontSize: 20, fontWeight: '600' },
	searchBoxTitle: { color: Colors.metalTransparent, fontFamily: Fonts.REGULAR, },
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

const mapDispatchToProps = dispatch =>
	bindActionCreators(actionCreators, dispatch);
export default connect(mapStatetoProps, mapDispatchToProps)(SearchScreen);
