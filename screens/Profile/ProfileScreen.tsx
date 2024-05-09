import React from 'react';
import {Image, Text, View} from 'react-native';
import {styleByTime} from "../../constants/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";

export default function SettingsScreen() {
    const username = useSelector((state: RootState) => state.user.username);
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

    return (
        <View style={styles.container}>
            {styleByTime(
                <Image
                    style={styles.imageHeader}
                    source={require('../../assets/user-_black_.png')}
                />,
                <Image
                    style={styles.imageHeader}
                    source={require('../../assets/user-_white_.png')}
                />)}
            <Text style={styles.text}>{username}</Text>
            <Text style={styles.text}>{isAdmin ? 'Admin' : 'Regular User'}</Text>
        </View>
    );
}