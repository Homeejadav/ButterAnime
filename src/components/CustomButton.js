import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../constants/colors';

const CustomButton = ({
    Icon, title, onTouch
}) => (
    <TouchableOpacity onPress={onTouch} style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Image style={{ tintColor: Colors.sunset }} source={Icon} />
        <Text style={{ paddingTop: 5, color: Colors.sunset, fontSize: 12 }}>{title}</Text>
    </TouchableOpacity>
);

export default CustomButton;
