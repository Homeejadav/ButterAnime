import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, } from 'react-native';
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

    // this._getAnimeDetails(item.animeId)

    render() {

        const { onCardPress, data } = this.props

        return (
            <TouchableOpacity

                onPress={onCardPress}

                style={{
                    // borderWidth: 1,
                    // borderColor: Colors.sunsetTrans,
                    borderTopRightRadius: 20,
                    flexDirection: 'row', flex: 1, backgroundColor: "white"
                }}>
                <ImageBackground
                    imageStyle={{

                    }}
                    style={{

                        height: 200, width: '100%', flex: 1,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }} source={{ uri: data.animeImg }}>
                    <View style={{
                        alignSelf: 'center',
                        borderTopRightRadius: 10,
                        position: 'absolute', bottom: -15,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                        backgroundColor: Colors.sunset, padding: 5, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{ fontFamily: Fonts.REGULAR, }}>Episode {data.episodeNum}</Text>
                    </View>
                </ImageBackground>

                <View style={{ width: '50%', paddingHorizontal: 15, paddingVertical: 20, justifyContent: 'space-between' }}>
                    <View>
                        <Text numberOfLines={3} style={{ color: Colors.sunset, flexShrink: 1, fontFamily: Fonts.REGULAR, fontSize: FontSize._16 }}>{data.animeTitle}</Text>
                        <Text style={{ color: Colors.sunset, flexShrink: 1, fontFamily: Fonts.BOLD, fontSize: FontSize._16 }}>{data.subOrDub}</Text>

                    </View>

                    <View style={{ width: '100%', height: 1, backgroundColor: Colors.metal, opacity: 0.05 }} />

                    <View style={{ flexDirection: 'row', width: "100%", justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => {
                                Share.open(
                                    {
                                        title: data.animeTitle,
                                        message: `${data.animeTitle}
                                         ${data.episodeUrl}`,
                                        url: data.animeTitle,
                                        social: Share.Social,
                                    }
                                )
                                    .then((res) => {
                                        console.log(res);
                                    })
                                    .catch((err) => {
                                        err && console.log(err);
                                    });
                            }}

                            style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                            onPress={() => {
                                Linking.openURL(data.episodeUrl)
                            }}
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
