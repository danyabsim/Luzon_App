import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import {styleByTime} from "../../constants/AppStyles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";
import {setImage} from "../../redux/User/userSlice";
import {XHRRequest} from "../../UserServerIntegration/XHR";

export default function SettingsScreen() {
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.darkMode.mode);
    const dispatch = useDispatch();

    return (
        <View style={styles(mode).container}>
            <TouchableOpacity onLongPress={() => {
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
                        XHRRequest(dispatch, '/changeImage', {...user, image: uriImage})
                    }
                }).then(r => r);
            }}>
                <Image
                    style={styles(mode).imageHeader}
                    source={user.image ? user.image : styleByTime(require('../../assets/user (black).png'), require('../../assets/user (white).png'), mode)}
                />
            </TouchableOpacity>
            <Text style={styles(mode).text}>{user.username}</Text>
            <Text style={styles(mode).text}>{user.isAdmin ? 'Admin' : 'Regular User'}</Text>
        </View>
    );
}