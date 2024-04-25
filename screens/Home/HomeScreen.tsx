import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../../navigation/AppNavigation";
import {styles} from "./styles";
import {RootState} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/User/userSlice";
import {initialUserState} from "../../redux/User/initialUserState";

type Props = StackScreenProps<MainStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
    const [username, setUsername] = React.useState(useSelector((state: RootState) => state.user.name));
    const [password, setPassword] = React.useState(useSelector((state: RootState) => state.user.pass));
    const dispatch = useDispatch();

    const inputContainers = [
        {label: 'Username:', state: username, setState: setUsername},
        {label: 'Password:', state: password, setState: setPassword}
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>Hello!</Text>
            {inputContainers.map((input, index) => (
                <View key={index} style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>{input.label}</Text>
                    <TextInput style={styles.input}
                               onChangeText={input.setState} value={input.state}
                               secureTextEntry={input.label === 'Password:'} // Hide password
                    />
                </View>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => {
                if (username === 'admin' && password === 'admin') {
                    navigation.navigate('Calendar');
                    dispatch(setUser({name: username, pass: password}));
                    setUsername(initialUserState.name);
                    setPassword(initialUserState.pass);
                }
            }}>
                <Text style={styles.textStyle}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}