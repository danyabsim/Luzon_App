import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import {MenuImageProps} from "./MenuImageProps";
import {styleByTime} from "../../constants/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function MenuImage ({onPress}: MenuImageProps) {
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
            <Image
                style={styles.headerButtonImage}
                source={styleByTime(require('../../assets/menu (black).png'), require('../../assets/menu (white).png'), mode)}
            />
        </TouchableOpacity>
    );
}