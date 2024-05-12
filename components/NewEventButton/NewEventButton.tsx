import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {NewEventButtonModal} from "./NewEventButtonModal/NewEventButtonModal";

export default function NewEventButton() {
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View>
            <NewEventButtonModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Add new Event</Text>
            </TouchableOpacity>
        </View>
    );
}