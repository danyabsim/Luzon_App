import {Alert, Text, View} from "react-native";
import {Agenda, AgendaEntry, AgendaSchedule} from "react-native-calendars";
import React, {useState} from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setEvents, setReduxSelected} from "../../redux/Events/eventsSlice";
import {ErrorBoundary} from "react-error-boundary";
import {XHR} from "../../utils/XHR";
import {calendarTheme} from "./calendarTheme";
import {CalendarItem} from "./CalendarItem/CalendarItem";
import {SureModal} from "./SureModal/SureModal";
import {TimeOutDelay} from "../../utils/TimeOutDelay";
import {useTranslation} from "react-i18next";

export default function Calendar() {
    const [sureModalVisible, setSureModalVisible] = useState(false);
    const [selected, setSelected] = useState(useSelector((state: RootState) => state.events.selected));
    const events = useSelector((state: RootState) => state.events.events);
    const user = useSelector((state: RootState) => state.user);
    const filteredOption = useSelector((state: RootState) => state.events.filteredOption);
    const dispatch = useDispatch();
    const [itemToRemove, setItemToRemove] = useState<AgendaEntry>();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    const FilteredItems = (): AgendaSchedule => {
        if (filteredOption == t('All')) return events;
        if (filteredOption == t('None')) return {};
        return Object.fromEntries(
            Object.entries(events).map(([key, value]) => [key, value.filter(item => item.name.includes(`(${filteredOption})`))])
        );
    }

    const onCloseModal = () => {
        setItemToRemove(undefined);
        setSureModalVisible(false);
    };

    return (
        <ErrorBoundary fallback={<Text style={styles(mode).itemText}>Something went wrong</Text>}>
            <View style={styles(mode).container}>
                <Agenda
                    theme={calendarTheme(mode)} items={FilteredItems()} selected={selected} collapsable={true}
                    enableSwipeMonths={true} scrollEnabled={true} showOnlySelectedDayItems={true}
                    onDayPress={(day) => {
                        setSelected(day.dateString);
                        dispatch(setReduxSelected(day.dateString));
                    }}
                    renderItem={(item) => (
                        <CalendarItem item={item} onDeleteItem={() => {
                            setItemToRemove(item);
                            setSureModalVisible(true);
                        }} onEditItem={() => {
                        }}/>
                    )}
                />
                <SureModal
                    visible={sureModalVisible} setVisible={setSureModalVisible} item={itemToRemove}
                    onRequestCloseModal={() => {
                        Alert.alert(t('ModalClosed'));
                        onCloseModal();
                    }}
                    onPressNo={onCloseModal}
                    onPressYes={async () => {
                        dispatch(setEvents({}));
                        XHR(dispatch, '/removeEvent', {...itemToRemove});
                        await TimeOutDelay(300);
                        XHR(dispatch, '/connect', {...user});
                        onCloseModal();
                    }}
                />
            </View>
        </ErrorBoundary>
    );
}