import React from 'react';
import {Image, Pressable} from 'react-native';
import styles from './styles';
import {IMenuImageProps} from "./IMenuImageProps";
import {styleByTime} from "../../utils/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function MenuImage({onPress}: IMenuImageProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <Pressable style={styles.headerButtonContainer} onPress={onPress}>
            <Image
                style={styles.headerButtonImage}
                source={styleByTime(require('../../assets/menu (black).png'), require('../../assets/menu (white).png'), mode)}
            />
        </Pressable>
    );
}