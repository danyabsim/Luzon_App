import {Agenda, AgendaEntry, AgendaSchedule} from "react-native-calendars";
import {Alert, Modal, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setEvents, setReduxSelected} from "../../redux/Events/eventsSlice";
import {ErrorBoundary} from "react-error-boundary";
import {XHRRequest} from "../../UserServerIntegration/XHR";
import {rgbIntToHex, styleByTime} from "../../constants/AppStyles";

export default function Calendar() {
    const [sureModalVisible, setSureModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState(useSelector((state: RootState) => state.events.selected));
    const events = useSelector((state: RootState) => state.events.events);
    const user = useSelector((state: RootState) => state.user);
    const filteredOption = useSelector((state: RootState) => state.events.filteredOption);
    const dispatch = useDispatch();
    const [itemToRemove, setItemToRemove] = React.useState<AgendaEntry>();

    const FilteredItems = () : AgendaSchedule => {
        if (filteredOption == 'All') return events;
        if (filteredOption == 'None') return {};
        return Object.fromEntries(
            Object.entries(events).map(([key, value]) => [key, value.filter(item => item.name.includes(`(${filteredOption})`))])
        );
        // run on all the users and filter it.
    }
    return (
        <ErrorBoundary fallback={<Text style={styles.itemText}>Something went wrong</Text>}>
            <View style={styles.container}>
                <Agenda
                    contentContainerStyle={{backgroundColor: 'black'}}
                    theme={{
                        calendarBackground: styleByTime('white', 'black'),// @ts-ignore
                        reservationsBackgroundColor: styleByTime('#f2F4f5', 'black'),
                        agendaKnobColor: styleByTime('#f2F4f5', 'white'),
                        selectedDayBackgroundColor: styleByTime('#00adf5', 'white'),
                        selectedDayTextColor: styleByTime('white', 'black'),
                        todayTextColor: '#00adf5',
                        dayTextColor: styleByTime('#2d4150', 'white'),
                        textDisabledColor: styleByTime('#d9e1e8', 'white'),
                        dotColor: styleByTime('#00adf5', 'white'),
                        indicatorColor: styleByTime('blue', 'white'),
                        monthTextColor: styleByTime('blue', 'white'),
                        selectedDotColor: styleByTime('white', 'black'),
                        agendaDayTextColor: styleByTime('#7A92A5', 'white'),
                        agendaDayNumColor: styleByTime('#7A92A5', 'white'),
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16,
                    }}
                    items={FilteredItems()}
                    selected={selected} collapsable={true} enableSwipeMonths={true} scrollEnabled={true}
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
                            <View style={{ borderRadius: 50, backgroundColor: rgbIntToHex(item.height), width: 30, height: 30 }} />
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
                                    XHRRequest(dispatch, '/connect', {...user});
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