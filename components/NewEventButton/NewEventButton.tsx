import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {NewEventButtonModal} from "./NewEventButtonModal/NewEventButtonModal";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function NewEventButton() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <View>
            <NewEventButtonModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <TouchableOpacity style={styles(mode).button} onPress={() => setModalVisible(true)}>
                <Text style={styles(mode).textStyle}>Add new Event</Text>
            </TouchableOpacity>
        </View>
    );
}