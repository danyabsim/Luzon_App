import React, {useCallback} from 'react';
import {BackHandler, Text, View} from 'react-native';
import Calendar from "../../components/Calendar/Calendar";
import NewEventButton from "../../components/NewEventButton/NewEventButton";
import {styles} from './styles';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import Filter from "../../components/Filter/Filter";
import {useTranslation} from "react-i18next";
import {useFocusEffect} from "@react-navigation/native";

export default function CalendarScreen() {
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const lastUpdated = useSelector((state: RootState) => state.events.lastUpdated);
    const {t, i18n} = useTranslation();

    useFocusEffect(
        useCallback(() => {
            // Handler to disable the back button
            const onBackPress = () => {
                return true; // Returning true disables the default back button behavior
            };

            // Add the event listener when the screen is focused
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // Remove the event listener when the screen is unfocused or unmounted
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return (
        <View style={styles(mode).container}>
            <Text style={[styles(mode).mainText, styles(mode).plainText]}>{t('COD')} – {user.username}</Text>
            {user.isAdmin && <Filter/>}
            <Text
                style={styles(mode).plainText}>{t('LastUpdatedData')}{new Date(lastUpdated).toLocaleString(i18n.language == 'en' ? 'en-GB' : 'he', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
            })}</Text>
            <Calendar/>
            <NewEventButton/>
        </View>
    );
}