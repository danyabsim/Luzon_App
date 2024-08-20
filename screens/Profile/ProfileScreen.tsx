import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {ImageLibraryOptions, launchImageLibrary} from 'react-native-image-picker';
import {styleByTime} from "../../constants/AppStyles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";
import {setImage} from "../../redux/User/userSlice";
import {XHR} from "../../utils/XHR";
import {useTranslation} from "react-i18next";

export default function SettingsScreen() {
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    return (
        <View style={styles(mode).container}>
            <TouchableOpacity onPress={() => {
                const options: ImageLibraryOptions = {
                    mediaType: 'photo',
                    includeBase64: false,
                };

                launchImageLibrary(options, async (response) => {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.errorCode && response.errorMessage) {
                        console.log(`ImagePicker Error: ${response.errorCode} (${response.errorMessage})`);
                    } else {
                        const uriImage = response.assets[0].uri;
                        dispatch(setImage(uriImage));
                        XHR(dispatch, '/changeImage', {...user, image: uriImage})
                    }
                });
            }}>
                <Image
                    style={styles(mode).imageHeader}
                    source={user.image ? user.image : styleByTime(require('../../assets/user (black).png'), require('../../assets/user (white).png'), mode)}
                />
            </TouchableOpacity>
            <Text style={styles(mode).text}>{user.username}</Text>
            <Text style={styles(mode).text}>{user.isAdmin ? t('Admin') : t('RegularUser')}</Text>
        </View>
    );
}