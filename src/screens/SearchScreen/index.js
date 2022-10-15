import { actionCreators } from '@actions';
import { Strings } from '@constants';
import React from 'react';
import {
	FlatList,
	Image,
	ImageBackground,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
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
import {
	DETAILS,
	RECENT_LIST,
	SEARCH,
	TOPAIRING,
} from '../../services/API/endpoints';
import { Icons } from '../../assets/Icons';
import Share from 'react-native-share';
import Modal from 'react-native-modalbox';
import SkelettonModal from '../../components/SkelettonModal';
import Skeletton from '../../components/Skeletton';
import { reducerType } from '../../constants/reducerType';

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
		NetInfo.fetch().then(state => {
			console.log('Connection type', state.type);
			console.log('Is connected?', state.isConnected);
			this.setState({
				connectionType: state.type,
				isConnected: state.isConnected,
			});
		});
	}

	_getRecentTop() {
		this.setState({ isLoading: true });
		let recentRelease = APIMethods.get(`${TOPAIRING}`, '', '')
			.then(response => {
				console.log(response);
				this.setState({ topAiring: response.data });
				this.setState({ isLoading: false });
			})
			.catch(err => {
				console.log(err);
			});
	}

	_getRecentRelease() {
		this.setState({ isLoading: true });
		let recentRelease = APIMethods.get(`${SEARCH}${this.state.search}`, '', '')
			.then(response => {
				console.log(response);
				this.setState({ serviceData: response.data });
				this.setState({ isLoading: false });
			})
			.catch(err => {
				console.log(err);
			});
	}

	_getAnimeDetails(animeID) {
		this.setState({ isDetailModal: true, isModalLoading: true });
		let recentRelease = APIMethods.get(`${DETAILS}${animeID}`, '', '')
			.then(response => {
				console.log(response);
				this.setState({ serviceAnimeData: response.data, isModalLoading: false });
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Modal
					style={{
						height: '85%',
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
					}}
					isOpen={this.state.isDetailModal}
					swipeToClose={false}
					backdropPressToClose={() => this.setState({ isDetailModal: false })}
					onClosed={() => this.setState({ isDetailModal: false })}
					// swipeThreshold={100}
					position={'bottom'}
					entry={'bottom'}>
					{this.state.isModalLoading ? (
						<View style={{ margin: 20 }}>
							<SkelettonModal skulldata={['1', '2', '3']} />
						</View>
					) : (
						<View style={{ margin: 20 }}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<Text
									style={{
										fontSize: 16,
										color: Colors.sunset,
										fontFamily: Fonts.MEDIUM,
									}}>
									Status: {this.state.serviceAnimeData.status}
								</Text>

								<TouchableOpacity
									onPress={() => this.setState({ isDetailModal: false })}
									style={{ alignSelf: 'flex-end' }}>
									<Image
										style={{ tintColor: Colors.sunset }}
										source={Icons.icnClose}
									/>
								</TouchableOpacity>
							</View>

							<ScrollView
								showsVerticalScrollIndicator={false}
								style={{ marginTop: 10 }}
								contentContainerStyle={{ paddingBottom: hp(20) }}>
								<Text
									style={{
										paddingTop: 10,
										fontSize: 24,
										fontFamily: Fonts.BOLD,
									}}>
									{this.state.serviceAnimeData.animeTitle}
								</Text>
								<Image
									style={{
										height: 300,
										width: '100%',
										borderTopRightRadius: 20,
										marginTop: 20,
									}}
									source={{ uri: this.state.serviceAnimeData.animeImg }}
								/>

								<Text
									style={{
										paddingTop: 10,
										fontSize: 16,
										color: Colors.sunset,
										fontFamily: Fonts.MEDIUM,
									}}>
									{this.state.serviceAnimeData.synopsis}
								</Text>

								<Text
									style={{
										paddingTop: 10,
										fontSize: 24,
										fontFamily: Fonts.BOLD,
									}}>
									{'Genres'}
								</Text>

								<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
									{this?.state?.serviceAnimeData?.genres?.map(data => {
										return (
											<View
												style={{
													marginRight: 10,
													borderTopRightRadius: 10,
													backgroundColor: Colors.sunset,
													marginTop: 10,
													padding: 5,
													paddingHorizontal: 20,
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												<Text style={{ fontSize: 16, fontFamily: Fonts.REGULAR }}>
													{data}
												</Text>
											</View>
										);
									})}
								</View>

								<Text
									style={{
										paddingTop: 10,
										fontSize: 24,
										fontFamily: Fonts.BOLD,
									}}>
									{'Number Of Episodes'}
								</Text>

								<View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
									{this?.state?.serviceAnimeData?.episodesList?.map(data => {
										return (
											<View
												style={{
													marginRight: 12,
													marginTop: 10,
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												<Text
													style={{
														width: 100,
														fontSize: 16,
														fontFamily: Fonts.REGULAR,
														color: Colors.sunset,
													}}>
													Episode {data.episodeNum}
												</Text>
											</View>
										);
									})}
								</View>
							</ScrollView>
						</View>
					)}
				</Modal>

				<View style={styles.mainContainer}>
					<Text style={{ paddingTop: 20, fontSize: 24, fontFamily: Fonts.BOLD }}>
						SEARCH
					</Text>

					<View
						style={{
							justifyContent: 'center',
							marginTop: 20,
							marginBottom: 20,
							borderTopRightRadius: 20,
							paddingHorizontal: 20,
							paddingVertical: 15,
							borderWidth: 1,
							borderColor: Colors.sunset,
							backgroundColor: 'white',

							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.1,
							shadowRadius: 3.84,

							elevation: 5,
						}}>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<Image
								opacity={0.5}
								style={{ tintColor: Colors.sunset }}
								source={Icons.icnSearch}
							/>
							<TextInput
								autoCorrect={false}
								autoCapitalize={false}
								style={{
									marginLeft: 20,
									marginRight: 20,
									width: '70%',
									fontFamily: Fonts.REGULAR,
								}}
								placeholder="Type Anime name"
								placeholderTextColor={Colors.metalTransparent}
								onChangeText={text => {
									this.setState({ search: text });
								}}
								value={this.state.search}
								// onBlur={() => this._getRecentRelease()}
								onKeyPress={() =>
									this.state.search.length >= 3 && this._getRecentRelease()
								}
							/>

							{this.state.search.length > 0 && (
								<TouchableOpacity
									style={{ width: 40 }}
									onPress={() => this.setState({ search: '', serviceData: [] })}>
									<Image
										opacity={1}
										style={{ tintColor: Colors.sunset }}
										source={Icons.icnClose}
									/>
								</TouchableOpacity>
							)}
						</View>

						{this.state.search.length > 3 && (
							<FlatList
								data={this.state.serviceData}
								keyExtractor={(item, index) => item.id}
								style={{ maxHeight: 100, marginTop: 10 }}
								ItemSeparatorComponent={() => (
									<View
										style={{
											height: 1,
											marginVertical: 5,
											opacity: 0.1,
											backgroundColor: Colors.sunset,
										}}
									/>
								)}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										onPress={() => {
											this.setState({ search: item.animeTitle });
											setTimeout(() => {
												this._getRecentRelease();
											}, 500);
										}}>
										<Text
											style={{
												color: Colors.metalTransparent,
												fontFamily: Fonts.REGULAR,
											}}>
											{item.animeTitle}
										</Text>
									</TouchableOpacity>
								)}
							/>
						)}
					</View>

					<ScrollView
						// stickyHeaderHiddenOnScroll={true}
						// stickyHeaderIndices={[0]}
						showsVerticalScrollIndicator={false}>
						{this.state.isLoading ? (
							<Skeletton skulldata={['1', '2', '3', '4']} />
						) : this.state.topAiring.length > 0 &&
							this.state.serviceData.length == 0 ? (
							<FlatList
								showsHorizontalScrollIndicator={false}
								style={{ paddingTop: 0, paddingBottom: 50 }}
								bounces={true}
								ListHeaderComponent={() => (
									<Text
										style={{
											paddingBottom: 20,
											fontSize: 24,
											fontFamily: Fonts.BOLD,
										}}>
										TOP AIRING
									</Text>
								)}
								data={this.state.topAiring}
								scrollEnabled={false}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item, index) => item.id}
								ItemSeparatorComponent={() => (
									<View
										style={{
											marginTop: 50,
											marginBottom: 30,
											width: '100%',
											height: 1,
											backgroundColor: Colors.sunset,
											opacity: 0.2,
										}}
									/>
								)}
								contentContainerStyle={{ paddingBottom: hp(15) }}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										onPress={() => {
											this._getAnimeDetails(item.animeId);
										}}
										style={{
											borderTopRightRadius: 20,
											flexDirection: 'row',
											flex: 1,
											backgroundColor: 'white',
										}}>
										<ImageBackground
											imageStyle={{}}
											style={{
												height: 200,
												width: '100%',
												flex: 1,
												shadowColor: '#000',
												shadowOffset: {
													width: 0,
													height: 2,
												},
												shadowOpacity: 0.25,
												shadowRadius: 3.84,

												elevation: 5,
											}}
											source={{ uri: item.animeImg }}>
											<View
												style={{
													alignSelf: 'center',
													borderTopRightRadius: 10,
													position: 'absolute',
													bottom: -15,
													shadowColor: '#000',
													shadowOffset: {
														width: 0,
														height: 2,
													},
													shadowOpacity: 0.25,
													shadowRadius: 3.84,

													elevation: 5,
													backgroundColor: Colors.sunset,
													padding: 5,
													paddingHorizontal: 20,
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												<Text style={{ fontFamily: Fonts.REGULAR }}>
													{item.latestEp}
												</Text>
											</View>
										</ImageBackground>

										<View
											style={{
												width: '50%',
												paddingHorizontal: 20,
												paddingVertical: 20,
												justifyContent: 'space-between',
											}}>
											<View>
												<Text
													numberOfLines={3}
													style={{
														color: Colors.sunset,
														flexShrink: 1,
														fontFamily: Fonts.REGULAR,
														fontSize: FontSize._16,
													}}>
													{item.animeTitle}
												</Text>
												<Text
													style={{
														color: Colors.sunset,
														flexShrink: 1,
														fontFamily: Fonts.BOLD,
														fontSize: FontSize._16,
													}}>
													{item.subOrDub}
												</Text>
											</View>

											<View
												style={{
													width: '100%',
													height: 1,
													backgroundColor: Colors.metal,
													opacity: 0.05,
												}}
											/>

											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'space-between',
												}}>
												<TouchableOpacity
													onPress={() => {
														Share.open({
															title: item.animeTitle,
															message: `${item.animeTitle}
                                                            ${item.episodeUrl}`,
															url: item.animeTitle,
															social: Share.Social,
														})
															.then(res => {
																console.log(res);
															})
															.catch(err => {
																err && console.log(err);
															});
													}}
													style={{
														justifyContent: 'center',
														alignItems: 'center',
													}}>
													<Image
														style={{ tintColor: Colors.sunset }}
														source={Icons.icnShare}
													/>
													<Text style={{ paddingTop: 5, color: Colors.sunset }}>
														Share
													</Text>
												</TouchableOpacity>


												<TouchableOpacity
													onPress={() => {
														this.props.navigation.navigate('WatchScreen', {
															url: item.episodeUrl,
														});
													}}
													style={{
														justifyContent: 'center',
														alignItems: 'center',
														marginLeft: 30,
													}}>
													<Image
														style={{ tintColor: Colors.sunset }}
														source={Icons.icnPlay}
													/>
													<Text style={{ paddingTop: 5, color: Colors.sunset }}>
														Watch
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									</TouchableOpacity>
								)}
							/>
						) : this.state.serviceData.length == 0 ? (
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
								}}>
								<Text
									style={{
										color: Colors.metalTransparent,
										fontFamily: Fonts.REGULAR,
									}}>
									No Results
								</Text>
							</View>
						) : (
							<FlatList
								showsHorizontalScrollIndicator={false}
								style={{ paddingTop: 0, paddingBottom: 50 }}
								bounces={true}
								ListHeaderComponent={() => (
									<View style={{ paddingBottom: 20, alignItems: 'center' }}>
										<Text
											style={{
												color: Colors.metalTransparent,
												fontFamily: Fonts.REGULAR,
											}}>
											{this.state.serviceData.length} Results found
										</Text>
									</View>
								)}
								data={this.state.serviceData}
								scrollEnabled={false}
								showsVerticalScrollIndicator={false}
								keyExtractor={(item, index) => item.id}
								ItemSeparatorComponent={() => (
									<View
										style={{
											marginTop: 50,
											marginBottom: 30,
											width: '100%',
											height: 1,
											backgroundColor: Colors.sunset,
											opacity: 0.2,
										}}
									/>
								)}
								contentContainerStyle={{ paddingBottom: hp(15) }}
								renderItem={({ item, index }) => (
									<TouchableOpacity
										onPress={() => {
											this._getAnimeDetails(item.animeId);
										}}
										style={{
											borderTopRightRadius: 20,
											flexDirection: 'row',
											flex: 1,
											backgroundColor: 'white',
										}}>
										<ImageBackground
											imageStyle={{}}
											style={{
												height: 200,
												width: '100%',
												flex: 1,
												shadowColor: '#000',
												shadowOffset: {
													width: 0,
													height: 2,
												},
												shadowOpacity: 0.25,
												shadowRadius: 3.84,

												elevation: 5,
											}}
											source={{ uri: item.animeImg }}>
											<View
												style={{
													alignSelf: 'center',
													borderTopRightRadius: 10,
													position: 'absolute',
													bottom: -15,
													shadowColor: '#000',
													shadowOffset: {
														width: 0,
														height: 2,
													},
													shadowOpacity: 0.25,
													shadowRadius: 3.84,

													elevation: 5,
													backgroundColor: Colors.sunset,
													padding: 5,
													paddingHorizontal: 20,
													justifyContent: 'center',
													alignItems: 'center',
												}}>
												<Text style={{ fontFamily: Fonts.REGULAR }}>
													{item.status}
												</Text>
											</View>
										</ImageBackground>

										<View
											style={{
												width: '50%',
												paddingHorizontal: 15,
												paddingVertical: 20,
												justifyContent: 'space-between',
											}}>
											<View>
												<Text
													numberOfLines={3}
													style={{
														color: Colors.sunset,
														flexShrink: 1,
														fontFamily: Fonts.REGULAR,
														fontSize: FontSize._16,
													}}>
													{item.animeTitle}
												</Text>
												<Text
													style={{
														color: Colors.sunset,
														flexShrink: 1,
														fontFamily: Fonts.BOLD,
														fontSize: FontSize._16,
													}}>
													{item.subOrDub}
												</Text>
											</View>

											<View
												style={{
													width: '100%',
													height: 1,
													backgroundColor: Colors.metal,
													opacity: 0.05,
												}}
											/>

											<View
												style={{
													flexDirection: 'row',
													justifyContent: 'space-between',
												}}>
												<TouchableOpacity
													onPress={() => {
														Share.open({
															title: item.animeTitle,
															message: `${item.animeTitle}
                                                            ${item.episodeUrl}`,
															url: item.animeTitle,
															social: Share.Social,
														})
															.then(res => {
																console.log(res);
															})
															.catch(err => {
																err && console.log(err);
															});
													}}
													style={{
														justifyContent: 'center',
														alignItems: 'center',
													}}>
													<Image
														style={{ tintColor: Colors.sunset }}
														source={Icons.icnShare}
													/>
													<Text style={{ paddingTop: 5, color: Colors.sunset, fontSize: 12 }}>
														Share
													</Text>
												</TouchableOpacity>

												<TouchableOpacity
													onPress={() => {
														this.props.dispatchData({
															item
														}, reducerType.favorite)
													}}
													style={{ justifyContent: 'center', alignItems: 'center', }}>
													<Image style={{ tintColor: Colors.sunset }} source={Icons.icnFavorite} />
													<Text style={{ paddingTop: 5, color: Colors.sunset, fontSize: 12 }}>Favorite</Text>
												</TouchableOpacity>

												<TouchableOpacity
													onPress={() => {
														this.props.navigation.navigate('WatchScreen', {
															url: item.episodeUrl,
														});
													}}
													style={{
														justifyContent: 'center',
														alignItems: 'center',

													}}>
													<Image
														style={{ tintColor: Colors.sunset }}
														source={Icons.icnPlay}
													/>
													<Text style={{ paddingTop: 5, color: Colors.sunset, fontSize: 12 }}>
														Watch
													</Text>
												</TouchableOpacity>
											</View>
										</View>
									</TouchableOpacity>
								)}
							/>
						)}
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
	title: { fontSize: 20, fontWeight: '600' },
	netInfoTitle: { fontSize: 14, fontWeight: '600', opacity: 0.5 },
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(actionCreators, dispatch);
export default connect(mapStatetoProps, mapDispatchToProps)(SearchScreen);
