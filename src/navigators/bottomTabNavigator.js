import { actionCreators } from '@actions';
import { Colors, CommonStyle } from '@constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Screen from '@screens';
import React, { Fragment } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icons } from '../assets/Icons';

const BottomTab = createBottomTabNavigator();

const MyTabBar = props => {
	return (
		<View style={{
			bottom: 0,
			position: 'absolute',
			width: '100%',
			borderTopLeftRadius: 20,
			borderTopRightRadius: 20,
			backgroundColor: 'rgba(255,255,255,1)',

			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.25,
			shadowRadius: 3.84,
			elevation: 5,
		}}>
			<View
				style={{
					flexDirection: 'row',
					height: hp(11),
					justifyContent: 'space-between',
					alignSelf: 'center',
					width: '85%',
				}}>

				{props.tabValue.map((item, index) => {
					return (
						<TouchableOpacity style={[{ alignItems: 'center', }]}
							onPress={() => props.navigation.navigate(item.screen)}>
							<Image source={Icons[item.icon]}
								style={{ marginTop: 15, tintColor: Colors[props.state.index == index ? 'sunset' : 'metal'], }}
							/>

							<Text style={[CommonStyle.textStyle('_10', 'REGULAR', props.state.index == index ? 'sunset' : 'metal',), { marginTop: hp(0.5), textAlign: 'center', width: 70 },]}>
								{item.text}
							</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		</View>
	);
};

const styleTab = StyleSheet.create({});

class bottomTabNavigation extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tabValue: [
				{ icon: 'icnHome', text: 'Home', screen: 'HomeScreen' },
				{ icon: 'icnSearch', text: 'Search', screen: 'SearchScreen' },
				{ icon: 'icnFavorite', text: 'Favorites', screen: 'FavoriteScreen' },
				{ icon: 'icnFeed', text: 'Categories', screen: 'CategoryScreen' },
			],
		};
	}

	_addScreen(name) {
		return <BottomTab.Screen name={name} component={Screen[name]} />;
	}

	render() {
		return (
			<Fragment>
				<View style={{ flex: 1, zIndex: 1, backgroundColor: 'white' }}>
					<BottomTab.Navigator
						tabBar={props => {
							var tabValue = { ...props, ...this.state };
							return <MyTabBar {...tabValue} />;
						}}

						screenOptions={{ headerShown: false }}>

						{this._addScreen('HomeScreen')}
						{this._addScreen('SearchScreen')}
						{this._addScreen('FavoriteScreen')}
						{this._addScreen('CategoryScreen')}

					</BottomTab.Navigator>
				</View>
			</Fragment>
		);
	}
}

const mapStatetoProps = state => {
	return {

	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);
export default connect(mapStatetoProps, mapDispatchToProps,)(bottomTabNavigation);
