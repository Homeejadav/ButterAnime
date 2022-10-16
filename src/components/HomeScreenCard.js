import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, Linking, } from 'react-native';
import { Fonts, FontSize } from '../assets/Fonts';
import { Icons } from '../assets/Icons';
import { Colors } from '../constants/colors';
import Share from 'react-native-share';

export default class HomeScreenCard extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {

		const { onCardPress, data } = this.props

		return (
			<TouchableOpacity onPress={onCardPress} style={{ borderTopRightRadius: 20, flexDirection: 'row', flex: 1, backgroundColor: "white" }}>

				<ImageBackground imageStyle={{}}
					source={{ uri: data.animeImg }}
					style={{ height: 200, width: '100%', flex: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>

					<View style={{ alignSelf: 'center', borderTopRightRadius: 10, position: 'absolute', bottom: -15, shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, backgroundColor: Colors.sunset, padding: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
						{/* {data?.episodeNum && <Text style={{ fontFamily: Fonts.REGULAR, color: Colors.snowWhite }}>Episode {data?.episodeNum}</Text>} */}
						{/* {data?.latestEp && <Text style={{ fontFamily: Fonts.REGULAR, color: Colors.snowWhite }}>{data?.latestEp}</Text>} */}
						{/* {data?.status && <Text style={{ fontFamily: Fonts.REGULAR, color: Colors.snowWhite }}>{data.status}</Text>} */}

						<Text style={{ fontFamily: Fonts.REGULAR, color: Colors.snowWhite }}>{data.episodeNum ? `Episode ${data.episodeNum}` : data.latestEp ? data.latestEp : data.status ? data.status : data.releasedDate ? `Release ${data.releasedDate}` : null}</Text>


					</View>
				</ImageBackground>

				<View style={{ width: '50%', paddingHorizontal: 15, paddingVertical: 20, justifyContent: 'space-between' }}>
					<View>
						<Text numberOfLines={3} style={{ color: Colors.sunset, flexShrink: 1, fontFamily: Fonts.REGULAR, fontSize: FontSize._16 }}>{data.animeTitle}</Text>
						<Text style={{ color: Colors.sunset, flexShrink: 1, fontFamily: Fonts.BOLD, fontSize: FontSize._16 }}>{data.subOrDub}</Text>
					</View>

					<View style={{ width: '100%', height: 1, backgroundColor: Colors.metal, opacity: 0.05 }} />

					<View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
						<TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
							onPress={() => {
								Share.open({
									title: data.animeTitle, message: `${data.animeTitle} ${data.episodeUrl}`,
									url: data.animeTitle, social: Share.Social,
								}).then((res) => { console.log(res) }).catch((err) => { err && console.log(err) });
							}}>
							<Image style={{ tintColor: Colors.sunset }} source={Icons.icnShare} />
							<Text style={{ paddingTop: 5, color: Colors.sunset, fontSize: 12 }}>Share</Text>
						</TouchableOpacity>


						<TouchableOpacity
							onPress={() => { }}
							style={{ justifyContent: 'center', alignItems: 'center', }}>
							<Image style={{ tintColor: Colors.sunset }} source={Icons.icnFavorite} />
							<Text style={{ paddingTop: 5, color: Colors.sunset, fontSize: 12 }}>Favorite</Text>
						</TouchableOpacity>


						<TouchableOpacity
							onPress={() => { Linking.openURL(data.episodeUrl) }}
							style={{ justifyContent: 'center', alignItems: 'center', }}>
							<Image style={{ tintColor: Colors.sunset }} source={Icons.icnPlay} />
							<Text style={{ paddingTop: 5, color: Colors.sunset, fontSize: 12 }}>Watch</Text>
						</TouchableOpacity>

					</View>
				</View>
			</TouchableOpacity>

		);
	}
}
