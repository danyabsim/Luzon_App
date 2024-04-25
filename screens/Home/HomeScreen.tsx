import React from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../../navigation/AppNavigation";
import {styles} from "./styles";

type Props = StackScreenProps<MainStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

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
                    setUsername('');
                    setPassword('');
                }
            }}>
                <Text style={styles.textStyle}>Log In</Text>
            </TouchableOpacity>
        </View>
    );
}