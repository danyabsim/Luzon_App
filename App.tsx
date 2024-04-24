import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Calendar from "./components/Calendar/Calendar";
import NewEventButton from "./components/NewEventButton/NewEventButton";
import {Provider} from "react-redux";
import store from "./redux/store";

export default function App() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <Text style={styles.mainText}>לו"ז מדור פיתוח</Text>
                <Calendar/>
                <NewEventButton/>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    mainText: {
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 24,
        paddingTop: 50,
        paddingBottom: 10
    }
});