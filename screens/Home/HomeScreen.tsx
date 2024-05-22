import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../../navigation/MainStackParamList";
import {styles} from "./styles";
import {RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/User/userSlice";
import {XHRRequest} from "../../UserServerIntegration/XHR";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RememberMeButton} from "../../components/RememberMeButton/RememberMeButton";
import {TextInputContainers} from "../../components/TextInputContainers/TextInputContainers";
import {setDarkMode} from "../../redux/Theme/themeSlice";
import {ErrorModalApp} from "../../components/ErrorModalApp/ErrorModalApp";
import {setEvents} from "../../redux/Events/eventsSlice";

type Props = StackScreenProps<MainStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
    const [username, setUsername] = React.useState(useSelector((state: RootState) => state.user.username));
    const [password, setPassword] = React.useState(useSelector((state: RootState) => state.user.password));
    const [rememberMe, setRememberMe] = React.useState(false);
    const [isErrorModalVisible, setErrorModalVisible] = React.useState(false);
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const inputContainers = [
        {label: 'Username', state: username, setState: setUsername},
        {label: 'Password', state: password, setState: setPassword}
    ];

    React.useEffect(() => {
        const getStatus = async () => {
            try {
                const storedRememberMe = await AsyncStorage.getItem('rememberMe');
                if (storedRememberMe !== null) setRememberMe(JSON.parse(storedRememberMe));
                const storedDarkMode = await AsyncStorage.getItem('darkMode');
                if (storedDarkMode !== null) dispatch(setDarkMode(JSON.parse(storedDarkMode)));
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
        getStatus().then(r => r);
        dispatch(setEvents({}));
    }, []);

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).mainText}>Hello!</Text>
            <TextInputContainers inputContainers={inputContainers} timeContainers={[]}/>
            <RememberMeButton rememberMe={rememberMe} onPress={async () => {
                setRememberMe(!rememberMe);
                await AsyncStorage.setItem('rememberMe', JSON.stringify(!rememberMe));
            }}/>
            <TouchableOpacity style={styles(mode).button} onPress={() => {
                if (username !== "" && password !== "") XHRRequest(dispatch, '/connect', {
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
            }}>
                <Text style={styles(mode).textStyle}>Log In</Text>
            </TouchableOpacity>
            <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                           errorText={"One of the fields is incomplete. Please fill them out."}/>
        </View>
    );
}