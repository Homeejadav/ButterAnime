import { actionCreators } from '@actions';
import { Strings } from '@constants';
import React from 'react';
import { Dimensions, FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NetInfo from "@react-native-community/netinfo";
import { Fonts, FontSize } from '../../assets/Fonts';
import { Colors } from '../../constants/colors';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Skeletton from '../../components/Skeletton';

class CategoryScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connectionType: '',
            isConnected: '',
            isLoading: false,
            serviceData: [],
            serviceCategory: [
                { title: "action" },
                { title: "adventure" },
                { title: "cars" },
                { title: 'comedy' },
                { title: 'crime' },
                { title: "dementia" },
                { title: "demons" },
                { title: "drama" },
                { title: "dub" },
                { title: 'ecchi' },
                { title: 'family' },
                { title: 'fantasy' },
                { title: 'game' },
                { title: 'gourmet' },
                { title: 'harem' },
                { title: 'historical' },
                { title: 'horror' },
                { title: 'josei' },
                { title: 'kids' },
                { title: 'magic' },
                { title: 'martial - arts' },
                { title: 'mecha' },
                { title: 'military' },
                { title: 'Mmusic' },
                { title: 'mystery' },
                { title: 'parody' },
                { title: 'police' },
                { title: 'psychological' },
                { title: 'romance' },
                { title: 'samurai' },
                { title: 'school' },
                { title: 'sci - fi' },
                { title: 'seinen' },
                { title: 'shoujo' },
                { title: 'shoujo - ai' },
                { title: 'shounen' },
                { title: 'shounen - ai' },
                { title: 'slice - of - Life' },
                { title: 'space' },
                { title: 'sports' },
                { title: 'super- power' },
                { title: 'supernatural' },
                { title: 'suspense' },
                { title: 'thriller' },
                { title: 'vampire' },
                { title: 'yaoi' },
                { title: 'yuri' }
            ]
        };
    }

    componentDidMount() {
        NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.setState({ connectionType: state.type, isConnected: state.isConnected })
        });
        this._getMoviesFromApi()
    }

    async _getMoviesFromApi() {
        this.setState({ isLoading: true })
        try {
            const response = await fetch("https://gogoanime.herokuapp.com/popular");
            const animelist = await response.json();
            console.log(animelist);
            return this.setState({ serviceData: animelist, isLoading: false });
        } catch (error) {
            console.error(error);
        }
    };



    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <ScrollView style={{}} showsVerticalScrollIndicator={false} stickyHeaderIndices={[2]}>

                        <Text style={{ paddingTop: 20, fontSize: 24, fontFamily: Fonts.BOLD }}>POPULAR</Text>

                        {this.state.isLoading ?
                            <Skeletton skulldata={['1']} />
                            :
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                style={{ paddingTop: 20, }}
                                bounces={false}
                                horizontal
                                data={this.state.serviceData}
                                scrollEnabled={true}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => item.id}
                                ItemSeparatorComponent={() => <View style={{ marginHorizontal: 20, height: '100%', width: 1, backgroundColor: Colors.sunset, opacity: 0.2 }} />}
                                contentContainerStyle={{ paddingBottom: hp(3) }}

                                renderItem={({ item, index }) =>
                                    <TouchableOpacity
                                        onPress={() => { alert(item.animeUrl) }}
                                        style={{ backgroundColor: "transparent", width: 200 }}>

                                        <Text numberOfLines={2} style={{ fontFamily: Fonts.REGULAR, color: Colors.sunset, height: 50 }}>{item.animeTitle}</Text>

                                        <ImageBackground
                                            imageStyle={{}}
                                            style={{
                                                height: 200, width: '100%', borderRadius: 10,
                                                shadowColor: "#000",
                                                shadowOffset: {
                                                    width: 0,
                                                    height: 2,
                                                },
                                                shadowOpacity: 0.25,
                                                shadowRadius: 3.84,
                                                elevation: 5,
                                            }} source={{ uri: item.animeImg }}>

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
                                                <Text style={{ fontFamily: Fonts.REGULAR, }}>Release {item.releasedDate}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                }
                            />}


                        <View style={{ justifyContent: 'center', backgroundColor: 'rgba(242,242,242,1)' }}>
                            <Text style={{ paddingTop: 20, paddingBottom: 20, fontSize: 24, fontFamily: Fonts.BOLD }}>CATEGORIES</Text>
                        </View>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingTop: 20, }}
                            bounces={false}
                            numColumns={3}
                            data={this.state.serviceCategory}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => item.id}
                            contentContainerStyle={{ paddingBottom: hp(15) }}
                            renderItem={({ item, index }) =>
                                <TouchableOpacity
                                    onPress={() => { alert(item.title) }}
                                    style={{ backgroundColor: "transparent", width: Dimensions.get('window').width / 3 }}>
                                    <Text numberOfLines={1} style={{ fontSize: FontSize._16, fontFamily: Fonts.REGULAR, color: Colors.sunset, height: 50 }}>{item.title}</Text>

                                </TouchableOpacity>
                            }
                        />



                    </ScrollView>
                </View >
            </SafeAreaView >
        );
    }
}
const mapStatetoProps = state => {
    return {};
};

const styles = StyleSheet.create({
    mainContainer: { flex: 1, paddingHorizontal: 20 },
    title: { fontSize: 20, fontWeight: '600' },
    netInfoTitle: { fontSize: 14, fontWeight: '600', opacity: 0.5 },

});

const mapDispatchToProps = dispatch =>
    bindActionCreators(actionCreators, dispatch);
export default connect(mapStatetoProps, mapDispatchToProps)(CategoryScreen);
