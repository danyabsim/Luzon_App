import {Alert, Modal, View} from "react-native";
import {styles} from "../styles";
import {formatDateAndTime, getDatesBetween, hexToRgbInt} from "../../../constants/AppStyles";
import {setEvents} from "../../../redux/Events/eventsSlice";
import {XHRRequest} from "../../../UserServerIntegration/XHR";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {NewEventButtonModalProps} from "./NewEventButtonModalProps";
import {TextInputContainers} from "./TextInputContainers/TextInputContainers";
import {DatePickerInputContainers} from "./DatePickerInputContainers/DatePickerInputContainers";
import {ColorPickerInputContainers} from "./ColorPickerInputContainers/ColorPickerInputContainers";
import {CloseButton} from "./CloseButton/CloseButton";
import {AddButton} from "./AddButton/AddButton";

export function NewEventButtonModal(props: NewEventButtonModalProps) {
    const [title, setTitle] = React.useState("");
    const [startDate, setStartDate] = React.useState<string | Date>(undefined);
    const [endDate, setEndDate] = React.useState<string | Date>(undefined);
    const [color, setColor] = React.useState('');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const closeModal = () => {
        setTitle('');
        setColor('');
        setStartDate(undefined);
        setEndDate(undefined);
        props.setModalVisible(!props.modalVisible);
    }

    const inputContainers = [
        {label: 'Title', state: title, setState: setTitle},
    ];

    const timeContainers = [
        {label: 'Start Date', state: startDate, setState: setStartDate},
        {label: 'End Date', state: endDate, setState: setEndDate},
    ];

    return (
        <Modal
            animationType="slide" transparent={true} visible={props.modalVisible} onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            props.setModalVisible(!props.modalVisible);
        }}>
            <View style={styles.modalView}>
                <TextInputContainers inputContainers={inputContainers} timeContainers={timeContainers}/>
                <DatePickerInputContainers timeContainers={timeContainers}/>
                <ColorPickerInputContainers color={color} setColor={setColor}/>
                <View style={styles.inputContainer}>
                    <CloseButton closeModal={closeModal}/>
                    <AddButton onPress={() => {
                        if (startDate === undefined || endDate === undefined || color === '' || title === '') return;
                        const startDateAndTime = formatDateAndTime(startDate);
                        const endDateAndTime = formatDateAndTime(endDate);
                        const dates = getDatesBetween(startDateAndTime.date, endDateAndTime.date);
                        const XHRTitle = `${startDateAndTime.date} (${startDateAndTime.time}) – ${endDateAndTime.date} (${endDateAndTime.time}): ${title} (${user.username})`;
                        if (dates !== null) {
                            dates.map((day) => {
                                dispatch(setEvents({}));
                                XHRRequest(dispatch, '/addEvent', {
                                    ...user,
                                    name: XHRTitle, height: hexToRgbInt(color), day: formatDateAndTime(day).date
                                });
                                XHRRequest(dispatch, '/connect', {...user});
                            })
                            closeModal();
                        }
                    }}/>
                </View>
            </View>
        </Modal>
    );
}