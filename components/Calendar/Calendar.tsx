import {Agenda, AgendaEntry} from "react-native-calendars";
import {Alert, Modal, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setEvents, setReduxSelected} from "../../redux/Events/eventsSlice";
import {ErrorBoundary} from "react-error-boundary";
import {XHRRequest} from "../../UserServerIntegration/XHR";
import {styleByTime} from "../../constants/AppStyles";

export default function Calendar() {
    const [sureModalVisible, setSureModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState(useSelector((state: RootState) => state.events.selected));
    const events = useSelector((state: RootState) => state.events.events);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [itemToRemove, setItemToRemove] = React.useState<AgendaEntry>();

    // @ts-ignore
    return (
        <ErrorBoundary fallback={<Text style={styles.itemText}>Something went wrong</Text>}>
            <View style={styles.container}>
                <Agenda
                    theme={{
                        calendarBackground: styleByTime('white', 'black'),
                        textSectionTitleColor: '#b6c1cd',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: 'blue',
                        indicatorColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
                    }}
                    items={events} selected={selected} collapsable={true} enableSwipeMonths={true} scrollEnabled={true}
                    showOnlySelectedDayItems={true}

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
                        <Text style={styles.modalText}>Are You Sure?</Text>
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
                                    dispatch(setEvents({}));
                                    XHRRequest(dispatch, '/removeEvent', {...user, ...itemToRemove});
                                    setItemToRemove(null);
                                    setSureModalVisible(false);
                                }}>
                                <Text style={styles.textStyle}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ErrorBoundary>
    );
}