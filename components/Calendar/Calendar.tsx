import {Agenda, AgendaEntry} from "react-native-calendars";
import {Alert, Modal, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setReduxSelected} from "../../redux/Events/eventsSlice";
import {ErrorBoundary} from "react-error-boundary";
import {XHRRequest} from "../../UserServerIntegration/XHR";

export default function Calendar() {
    const [sureModalVisible, setSureModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState(useSelector((state: RootState) => state.events.selected));
    const events = useSelector((state: RootState) => state.events.events);
    const dispatch = useDispatch();
    const [itemToRemove, setItemToRemove] = React.useState<AgendaEntry>();

    return (
        <ErrorBoundary fallback={<Text>Something went wrong</Text>}>
            <Agenda
                items={events} selected={selected} collapsable={true} enableSwipeMonths={true} scrollEnabled={true}
                onDayPress={(day) => {
                    setSelected(day.dateString);
                    dispatch(setReduxSelected(day));
                }}
                renderItem={(item) => (
                    <TouchableOpacity style={styles.item} onLongPress={() => {
                        setItemToRemove(item);
                        setSureModalVisible(true);
                    }}>
                        <Text style={styles.itemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <Modal
                animationType="slide" transparent={true} visible={sureModalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setSureModalVisible(false);
                }}
            >
                <View style={styles.modalView}>
                    <Text>Are You Sure?</Text>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                setItemToRemove(null);
                                setSureModalVisible(false);
                            }}>
                            <Text style={styles.textStyle}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                XHRRequest(dispatch, '/removeEvent', itemToRemove);
                                setItemToRemove(null);
                                setSureModalVisible(false);
                            }}>
                            <Text style={styles.textStyle}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ErrorBoundary>
    );
}