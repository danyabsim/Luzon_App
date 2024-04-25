import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { StackScreenProps } from "@react-navigation/stack";
import { MainStackParamList } from "../../navigation/AppNavigation";
import { styles } from "./styles";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/User/userSlice";
import { initialUserState } from "../../redux/User/initialUserState";
import {setEvents} from "../../redux/Events/eventsSlice";

type Props = StackScreenProps<MainStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
    const [username, setUsername] = React.useState(useSelector((state: RootState) => state.user.name));
    const [password, setPassword] = React.useState(useSelector((state: RootState) => state.user.pass));
    const dispatch = useDispatch();

    const inputContainers = [
        { label: 'Username:', state: username, setState: setUsername },
        { label: 'Password:', state: password, setState: setPassword }
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
                const xhr = new XMLHttpRequest();
                xhr.open('POST', 'http://localhost:3000/connect');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            navigation.navigate('Calendar');
                            dispatch(setUser({ name: username, pass: password }));
                            dispatch(setEvents(JSON.parse(xhr.responseText)));
                            setUsername(initialUserState.name);
                            setPassword(initialUserState.pass);
                        } else {
                            console.error('Error sending message:', xhr.statusText);
                        }
                    }
                };
                xhr.send(JSON.stringify({ name: username, pass: password }));
            }}>
                <Text style={styles.textStyle}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}