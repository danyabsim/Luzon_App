import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import {IMenuImageProps} from "./IMenuImageProps";
import {styleByTime} from "../../constants/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function MenuImage ({onPress}: IMenuImageProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={onPress}>
            <Image
                style={styles.headerButtonImage}
                source={styleByTime(require('../../assets/menu (black).png'), require('../../assets/menu (white).png'), mode)}
            />
        </TouchableOpacity>
    );
}