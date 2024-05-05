import {Alert, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {XHRRequest} from "../../UserServerIntegration/XHR";
import {setEvents} from "../../redux/Events/eventsSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {formatDateAndTime, getDatesBetween, hexToRgbInt, styleByOS} from "../../constants/AppStyles";
import ColorPicker from 'react-native-wheel-color-picker';

export default function NewEventButton() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [title, setTitle] = React.useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [startDate, setStartDate] = React.useState<string | Date>();
    const [endDate, setEndDate] = React.useState<string | Date>();
    const [color, setColor] = React.useState('');

    const inputContainers = [
        {label: 'Title', state: title, setState: setTitle},
    ];

    const timeContainers = [
        {label: 'Start Date', state: startDate, setState: setStartDate},
        {label: 'End Date', state: endDate, setState: setEndDate},
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
                    {(styleByOS() ? [...inputContainers] : [...inputContainers, ...timeContainers]).map((input, index) => (
                        <View key={index} style={styles.inputContainer}>
                            <Text style={styles.modalText}>{input.label}:</Text>
                            <TextInput style={[styles.modalText, styles.input]} onChangeText={input.setState}
                                       value={input.state as string}/>
                        </View>
                    ))}
                    {styleByOS() &&
                        timeContainers.map((time, index) => (
                            <View key={index}>
                                <TouchableOpacity style={styles.button}
                                                  onPress={() => setDatePickerVisibility(true)}>
                                    <Text style={styles.textStyle}>Show Date Picker</Text>
                                </TouchableOpacity>
                                <DateTimePickerModal
                                    date={time.state as Date}
                                    isVisible={isDatePickerVisible}
                                    mode="datetime"
                                    onConfirm={(date) => {
                                        time.setState(date)
                                        setDatePickerVisibility(false);
                                    }}
                                    onCancel={() => setDatePickerVisibility(false)}
                                />
                            </View>
                        ))
                    }
                    <SafeAreaView>
                    <View style={styles.sectionContainer}>
                        <ColorPicker
                            color={color}
                            onColorChange={(color) => setColor(color)}
                            thumbSize={50}
                            sliderSize={50}
                            noSnap={true}
                            row={false}
                        />
                    </View>
                    </SafeAreaView>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                const startDateAndTime = formatDateAndTime(startDate);
                                const endDateAndTime = formatDateAndTime(endDate);
                                const dates = getDatesBetween(startDateAndTime.date, endDateAndTime.date);
                                const XHRTitle = `${startDateAndTime.date} (${startDateAndTime.time}) – ${endDateAndTime.date} (${endDateAndTime.time}): ${title} (${user.username})`;
                                if (dates !== null) {
                                    dates.map((day) => {
                                        dispatch(setEvents({}));
                                        XHRRequest(dispatch, '/addEvent', {
                                            username: user.username, password: user.password,
                                            name: XHRTitle, height: hexToRgbInt(color), day: day
                                        });
                                    })
                                    setModalVisible(!modalVisible);
                                }
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