import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import {MenuImageProps} from "./MenuImageProps";

export default function MenuImage ({onPress}: MenuImageProps) {
    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
            <Image
                style={styles.headerButtonImage}
                source={require('../../assets/menu.png')}
            />
        </TouchableOpacity>
    );
}