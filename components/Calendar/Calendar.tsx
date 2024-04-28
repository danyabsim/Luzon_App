import {Agenda} from "react-native-calendars";
import {Alert, Modal, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {removeEvent, setReduxSelected} from "../../redux/Events/eventsSlice";
import {ErrorBoundary} from "react-error-boundary";

export default function Calendar() {
    const [sureModalVisible, setSureModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState(useSelector((state: RootState) => state.events.selected));
    const events = useSelector((state: RootState) => state.events.events);
    const dispatch = useDispatch();

    return (
        <ErrorBoundary fallback={<Text>Something went wrong</Text>}>
            <Agenda
                items={events} selected={selected} collapsable={true} enableSwipeMonths={true} scrollEnabled={true}
                onDayPress={(day) => {
                    setSelected(day.dateString);
                    dispatch(setReduxSelected(day));
                }}
                renderItem={(item) => (
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
                                            dispatch(removeEvent(item));
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
        </ErrorBoundary>
    );
}