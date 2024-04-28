import {Alert, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {addNewEvent} from "../../redux/Events/eventsSlice";
import {RootState} from "../../redux/store";

export default function NewEventButton() {
    const [modalVisible, setModalVisible] = React.useState(false);

    const [title, setTitle] = React.useState("");
    const [hours, setHours] = React.useState("");

    const inputContainers = [
        {label: 'Title:', state: title, setState: setTitle},
        {label: 'Hours:', state: hours, setState: setHours},
    ];
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    return (
        <View>
            <Modal
                animationType="slide" transparent={true} visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalView}>
                    {inputContainers.map((input, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <Text style={styles.modalText}>{input.label}</Text>
                            <TextInput style={[styles.modalText, styles.input]}
                                       onChangeText={input.setState} value={input.state}
                            />
                        </View>
                    ))}
                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}
                                          onPress={() => {
                                              dispatch(addNewEvent(hours + " – " + title + " (" + user.name + ")"));
                                              setModalVisible(!modalVisible);
                                          }}>
                            <Text style={styles.textStyle}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Add new Event</Text>
            </TouchableOpacity>
        </View>
    );
}