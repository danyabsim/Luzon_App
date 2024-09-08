import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../../navigation/MainStackParamList";
import {styles} from "./styles";
import {RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/User/userSlice";
import {XHR} from "../../utils/XHR";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RememberMeButton} from "../../components/RememberMeButton/RememberMeButton";
import {TextInputContainers} from "../../components/TextInputContainers/TextInputContainers";
import {setDarkMode} from "../../redux/Theme/themeSlice";
import {ErrorModalApp} from "../../components/ErrorModalApp/ErorrModalApp";
import {setEvents, setFilteredOption} from "../../redux/Events/eventsSlice";
import {useTranslation} from 'react-i18next';
import '../../i18n';
import {ButtonApp} from "../../components/ButtonApp/ButtonApp";

type Props = StackScreenProps<MainStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
    const [username, setUsername] = useState(useSelector((state: RootState) => state.user.username));
    const [password, setPassword] = useState(useSelector((state: RootState) => state.user.password));
    const [rememberMe, setRememberMe] = useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t, i18n} = useTranslation();

    const inputContainers = [
        {label: t('Username'), state: username, setState: setUsername},
        {label: t('Password'), state: password, setState: setPassword}
    ];

    useEffect(() => {
        const getStatus = async () => {
            try {
                const storedRememberMe = await AsyncStorage.getItem('rememberMe');
                storedRememberMe && setRememberMe(JSON.parse(storedRememberMe));
                const storedDarkMode = await AsyncStorage.getItem('darkMode');
                storedDarkMode && dispatch(setDarkMode(JSON.parse(storedDarkMode)));
                const storedUserName = await AsyncStorage.getItem('username');
                const storedPassword = await AsyncStorage.getItem('password');
                if (storedUserName !== null && storedPassword !== null) dispatch(setUser({
                    username: JSON.parse(storedUserName),
                    password: JSON.parse(storedPassword)
                }));
                setUsername(JSON.parse(storedUserName));
                setPassword(JSON.parse(storedPassword));
            } catch (error) {
                console.error('Error retrieving status:', error);
            }
        };
        getStatus();
        dispatch(setFilteredOption(t('All')));
        dispatch(setEvents({}));
    }, []);

    useEffect(() => {
        dispatch(setFilteredOption(t('All')));
    }, [i18n.language]);

    useEffect(() => {
        const getLanguage = async () => {
            try {
                const storedLanguage = JSON.parse(await AsyncStorage.getItem('language'));
                await i18n.changeLanguage(storedLanguage == 'en' || storedLanguage == 'he' ? storedLanguage : 'he');
            } catch (error) {
                console.error('Error retrieving language:', error);
            }
        }
        getLanguage();
    }, [i18n]);

    return (
        <View style={styles(mode).container}>
            <View style={{alignSelf: "center"}}>
                <Text style={styles(mode).mainText}>{t('COD')}</Text>
                <TextInputContainers inputContainers={inputContainers}/>
                <RememberMeButton rememberMe={rememberMe} onPress={async () => {
                    setRememberMe(!rememberMe);
                    await AsyncStorage.setItem('rememberMe', JSON.stringify(!rememberMe));
                }}/>
                <ButtonApp labelStyle={styles(mode).textStyle} label={t('Login')} onPress={() => {
                    if (username !== "" && password !== "") XHR(dispatch, '/connect', {
                        username: username, password: password
                    }, async () => {
                        dispatch(setUser({username: username, password: password}));
                        await AsyncStorage.setItem('username', JSON.stringify(rememberMe ? username : ''));
                        await AsyncStorage.setItem('password', JSON.stringify(rememberMe ? password : ''));
                        setUsername(rememberMe ? username : '');
                        setPassword(rememberMe ? password : '');
                        navigation.navigate('Calendar');
                    })
                    else setErrorModalVisible(true);
                }}/>
                <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                               errorText={t("IncompleteFields")}/>
            </View>
        </View>
    );
}