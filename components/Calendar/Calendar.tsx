import {Text, View} from "react-native";
import {Agenda, AgendaSchedule} from "react-native-calendars";
import React, {useState} from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setReduxSelected} from "../../redux/Events/eventsSlice";
import {ErrorBoundary} from "react-error-boundary";
import {calendarTheme} from "./calendarTheme";
import {CalendarItem} from "../CalendarItem/CalendarItem";
import {useTranslation} from "react-i18next";

export default function Calendar() {
    const [selected, setSelected] = useState(useSelector((state: RootState) => state.events.selected));
    const events = useSelector((state: RootState) => state.events.events);
    const filteredOption = useSelector((state: RootState) => state.events.filteredOption);
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    const FilteredItems = (): AgendaSchedule => {
        if (filteredOption == t('All')) return events;
        if (filteredOption == t('None')) return {};
        return Object.fromEntries(
            Object.entries(events).map(([key, value]) => [key, value.filter(item => item.name.includes(`(${filteredOption})`) || item.name.includes(`(All Users)`))])
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
                        dispatch(setReduxSelected(day.dateString));
                    }}
                    renderItem={(item) => (
                        <CalendarItem item={item} isOnCalendar={true}/>
                    )}
                />
            </View>
        </ErrorBoundary>
    );
}