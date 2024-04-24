import React from 'react';
import {Alert, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Agenda, AgendaSchedule, DateData} from 'react-native-calendars';

export default function App() {
    const currentDate = new Date();
    const [selected, setSelected] = React.useState(currentDate.toISOString().split('T')[0]);
    const [events, setEvents] = React.useState<AgendaSchedule>();
    const [modalVisible, setModalVisible] = React.useState(false);
    const [sureModalVisible, setSureModalVisible] = React.useState(false);

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

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.modalView}>
                    {inputContainers.map((input, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <Text style={styles.modalText}>{input.label}</Text>
                            <TextInput
                                style={[styles.modalText, styles.input]}
                                onChangeText={input.setState}
                                value={input.state}
                            />
                        </View>
                    ))}
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                const newEvent = { name: title, height: 10, day: selected };
                                setEvents((prevEvents) => {
                                    const updatedEvents = { ...prevEvents };
                                    if (updatedEvents[selected]) updatedEvents[selected].push(newEvent);
                                    else updatedEvents[selected] = [newEvent];
                                    return updatedEvents;
                                });

                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={styles.textStyle}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Text style={styles.mainText}>לו"ז מדור פיתוח</Text>
            <Agenda
                items={events} selected={selected} collapsable={true} enableSwipeMonths={true} scrollEnabled={true}
                onDayPress={(day: DateData) => setSelected(day.dateString)}
                renderItem={(item, isFirst) => (
                    <TouchableOpacity style={styles.item} onLongPress={() => setSureModalVisible(true)}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={sureModalVisible}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                                setSureModalVisible(false);
                            }}>
                            <View style={styles.modalView}>
                                <Text>Are You Sure?</Text>
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => setSureModalVisible(false)}>
                                        <Text style={styles.textStyle}>No</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => {
                                            setEvents(prevEvents => {
                                                const updatedEvents = { ...prevEvents };
                                                if (updatedEvents[selected]) {
                                                    const indexToRemove = updatedEvents[selected].findIndex(event => event.name === item.name);
                                                    if (indexToRemove !== -1) {
                                                        updatedEvents[selected].splice(indexToRemove, 1);
                                                        if (updatedEvents[selected].length === 0) updatedEvents[selected] = null;
                                                    }
                                                }
                                                return updatedEvents;
                                            });
                                            setSureModalVisible(false);
                                        }}>
                                        <Text style={styles.textStyle}>Yes</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.addEventButton}>Add new Event</Text>
            </TouchableOpacity>
        </View>
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
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    addEventButton: {
        padding: 20,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: 'lightblue'
    },
    // centeredView: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     marginTop: 22,
    // },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        marginLeft: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginHorizontal: 5
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20
    },
});