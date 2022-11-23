import { Dimensions, PixelRatio, Platform } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Fonts, FontSize } from "../assets";
import { Colors } from "./colors";

const {
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
const scale1 = SCREEN_WIDTH / 320;

export const CommonStyle = {
	textStyle: (size = '_12', family = 'Regular', color = 'White', align = 'left') => {
		return {
			color: Colors[color],
			includeFontPadding: false,
			fontSize: moderateScale(FontSize[size]),
			fontFamily: Fonts[family]
		}
	}
}

export function responsiveFont(size = 0) {
	const newSize = size * scale1
	if (Platform.OS === 'ios') {
		return Math.round(PixelRatio.roundToNearestPixel(newSize))
	} else {
		return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
	}
}


export const TOP_HEIGHT = Platform.OS == 'android' ? "93%" : "91%"
export const BOTTOM_HEIGHT = Platform.OS == 'android' ? "7%" : "9%"