import React from 'react';
import {Image, Text, Pressable, View} from 'react-native';
import {IMenuButtonProps} from "./IMenuButtonProps";
import {styles} from './styles';
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useTranslation} from "react-i18next";

export default function MenuButton({onPress, source, title}: IMenuButtonProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {i18n} = useTranslation();

    const ImageContainer = <Image source={source} style={styles(mode).btnIcon}/>;

    return (
        <Pressable
            onPress={onPress}
            style={[styles(mode).btnClickContain, {alignItems: i18n.language == 'en' ? 'flex-start' : "flex-end"}]}
        >
            <View style={[styles(mode).btnContainer]}>
                {i18n.language == 'en' && ImageContainer}
                <Text style={styles(mode).btnText}>{title}</Text>
                {i18n.language == 'he' && ImageContainer}
            </View>
        </Pressable>
    );
}