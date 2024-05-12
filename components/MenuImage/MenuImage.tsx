import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import {MenuImageProps} from "./MenuImageProps";
import {styleByTime} from "../../constants/AppStyles";

export default function MenuImage ({onPress}: MenuImageProps) {
    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
            <Image
                style={styles.headerButtonImage}
                source={styleByTime(require('../../assets/menu (black).png'), require('../../assets/menu (white).png'))}
            />
        </TouchableOpacity>
    );
}