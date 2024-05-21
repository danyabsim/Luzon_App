import {Alert, Text, View} from "react-native";
import {Agenda, AgendaEntry, AgendaSchedule} from "react-native-calendars";
import React from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setEvents, setReduxSelected} from "../../redux/Events/eventsSlice";
import {ErrorBoundary} from "react-error-boundary";
import {XHRRequest} from "../../UserServerIntegration/XHR";
import {calendarTheme} from "./calendarTheme";
import {CalendarItem} from "./CalendarItem/CalendarItem";
import {SureModal} from "./SureModal/SureModal";
import {TimeOutDelay} from "../../constants/TimeOutDelay";

export default function Calendar() {
    const [sureModalVisible, setSureModalVisible] = React.useState(false);
    const [selected, setSelected] = React.useState(useSelector((state: RootState) => state.events.selected));
    const events = useSelector((state: RootState) => state.events.events);
    const user = useSelector((state: RootState) => state.user);
    const filteredOption = useSelector((state: RootState) => state.events.filteredOption);
    const dispatch = useDispatch();
    const [itemToRemove, setItemToRemove] = React.useState<AgendaEntry>();
    const mode = useSelector((state: RootState) => state.theme.mode);

    const FilteredItems = (): AgendaSchedule => {
        if (filteredOption == 'All') return events;
        if (filteredOption == 'None') return {};
        return Object.fromEntries(
            Object.entries(events).map(([key, value]) => [key, value.filter(item => item.name.includes(`(${filteredOption})`))])
        );
    }

    return (
        <ErrorBoundary fallback={<Text style={styles(mode).itemText}>Something went wrong</Text>}>
            <View style={styles(mode).container}>
                <Agenda
                    theme={calendarTheme(mode)} items={FilteredItems()} selected={selected} collapsable={true}
                    enableSwipeMonths={true} scrollEnabled={true} showOnlySelectedDayItems={true}
                    onDayPress={(day) => {
                        setSelected(day.dateString);
                        dispatch(setReduxSelected(day));
                    }}
                    renderItem={(item) => (
                        <CalendarItem item={item} onLongPressItem={() => {
                            setItemToRemove(item);
                            setSureModalVisible(true);
                        }}/>
                    )}
                />
                <SureModal visible={sureModalVisible} setVisible={setSureModalVisible} onRequestCloseModal={() => {
                    Alert.alert('Modal has been closed.');
                    setSureModalVisible(false);
                }} onPressNo={() => {
                    setItemToRemove(null);
                    setSureModalVisible(false);
                }} onPressYes={async () => {
                    dispatch(setEvents({}));
                    XHRRequest(dispatch, '/removeEvent', {...user, ...itemToRemove});
                    await TimeOutDelay(300);
                    XHRRequest(dispatch, '/connect', {...user});
                    setItemToRemove(null);
                    setSureModalVisible(false);
                }}/>
            </View>
        </ErrorBoundary>
    );
}