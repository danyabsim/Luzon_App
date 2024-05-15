import React from 'react';
import {Image, View, Text} from 'react-native';
import {styleByTime} from "../../constants/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";

export default function SettingsScreen() {
    const username = useSelector((state: RootState) => state.user.username);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <View style={styles(mode).container}>
            <Image
                style={styles(mode).imageHeader}
                source={styleByTime(require('../../assets/user (black).png'), require('../../assets/user (white).png'), mode)}
            />
            <Text style={styles(mode).text}>{username}</Text>
            <Text style={styles(mode).text}>{isAdmin ? 'Admin' : 'Regular User'}</Text>
        </View>
    );
}