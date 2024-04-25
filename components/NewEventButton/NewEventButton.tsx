import {Alert, Modal, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {useDispatch} from "react-redux";
import {addNewEvent} from "../../redux/Events/eventsSlice";

export default function NewEventButton() {
    const [modalVisible, setModalVisible] = React.useState(false);

    const [title, setTitle] = React.useState("");
    const [color, setColor] = React.useState("");
    const [hours, setHours] = React.useState("");
    const [notes, setNotes] = React.useState("");

    const inputContainers = [
        {label: 'Title:', state: title, setState: setTitle},
        {label: 'Color:', state: color, setState: setColor},
        {label: 'Hours:', state: hours, setState: setHours},
        {label: 'Notes:', state: notes, setState: setNotes}
    ];
    const dispatch = useDispatch();

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
                            <Text style={styles.modalText}>{input.label}</Text> {/* Removed styles.container */}
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
                                              dispatch(addNewEvent(title));
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