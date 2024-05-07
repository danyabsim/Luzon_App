import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../../navigation/AppNavigation";
import {styles} from "./styles";
import {RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/User/userSlice";
import {XHRRequest} from "../../UserServerIntegration/XHR";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = StackScreenProps<MainStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
    const [username, setUsername] = React.useState(useSelector((state: RootState) => state.user.username));
    const [password, setPassword] = React.useState(useSelector((state: RootState) => state.user.password));
    const [rememberMe, setRememberMe] = React.useState(false);
    const dispatch = useDispatch();

    const inputContainers = [
        {label: 'Username:', state: username, setState: setUsername},
        {label: 'Password:', state: password, setState: setPassword}
    ];

    React.useEffect(() => {
        const getRememberMeStatus = async () => {
            try {
                const storedRememberMe = await AsyncStorage.getItem('rememberMe');
                if (storedRememberMe !== null) setRememberMe(JSON.parse(storedRememberMe));
                const storedUserName = await AsyncStorage.getItem('username');
                const storedPassword = await AsyncStorage.getItem('password');
                if (storedUserName !== null && storedPassword !== null) dispatch(setUser({username: JSON.parse(storedUserName), password: JSON.parse(storedPassword)}));
                setUsername(JSON.parse(storedUserName));
                setPassword(JSON.parse(storedPassword));
            } catch (error) {
                console.error('Error retrieving rememberMe status:', error);
            }
        };
        getRememberMeStatus().then(r => r);
    }, []);

    function logIn() {
        XHRRequest(dispatch, '/connect', {
            username: username, password: password, isAdmin: false, name: "", height: 10, day: ""
        }, async () => {
            dispatch(setUser({username: username, password: password}));
            await AsyncStorage.setItem('username', JSON.stringify(rememberMe ? username : ''));
            await AsyncStorage.setItem('password', JSON.stringify(rememberMe ? password : ''));
            navigation.navigate('Calendar');
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Hello!</Text>
            {inputContainers.map((input, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>{input.label}</Text>
                    <TextInput style={styles.input} onChangeText={input.setState} value={input.state}
                               secureTextEntry={input.label === 'Password:'} // Hide password
                    />
                </View>
            ))}
            <View style={styles.inputContainer}>
                <TouchableOpacity style={[styles.rememberMeButton, {backgroundColor: rememberMe ? 'green' : 'red'}]}
                                  onPress={async () => {
                                      setRememberMe(!rememberMe);
                                      await AsyncStorage.setItem('rememberMe', JSON.stringify(!rememberMe));
                                  }}/>
                <Text style={styles.rememberMeButtonText}>{rememberMe ? 'Forget Me' : 'Remember Me'}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={logIn}>
                <Text style={styles.textStyle}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}