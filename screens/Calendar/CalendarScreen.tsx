import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Calendar from "../../components/Calendar/Calendar";
import NewEventButton from "../../components/NewEventButton/NewEventButton";
import {styles} from './styles';
import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../../navigation/AppNavigation";

type Props = StackScreenProps<MainStackParamList, 'Calendar'>;

export default function CalendarScreen({navigation}: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.mainText}>לו"ז מדור פיתוח</Text>
            <Calendar/>
            <NewEventButton/>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('Home');
            }}>
                <Text style={styles.textStyle}>Exit</Text>
            </TouchableOpacity>
        </View>
    );
}