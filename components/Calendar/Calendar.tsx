import {Text, View} from "react-native";
import {Agenda} from "react-native-calendars";
import React, {useEffect, useState} from "react";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {setReduxSelected} from "../../redux/Events/eventsSlice";
import {ErrorBoundary} from "react-error-boundary";
import {calendarTheme} from "./calendarTheme";
import {CalendarItem} from "../CalendarItem/CalendarItem";
import {useTranslation} from "react-i18next";
import {TimeOutDelay} from "../../utils/TimeOutDelay";

export default function Calendar() {
    const [selected, setSelected] = useState(useSelector((state: RootState) => state.events.selected));
    const events = useSelector((state: RootState) => state.events.events);
    const filteredOption = useSelector((state: RootState) => state.events.filteredOption);
    const [filteredEvents, setFilteredEvents] = useState<typeof events>();

    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    useEffect(() => {
        const filterEvents = async () => {
            if (filteredOption == t('All')) setFilteredEvents(events);
            else {
                setFilteredEvents({});
                await TimeOutDelay(300);
                setFilteredEvents(Object.fromEntries(
                    Object.entries(events).map(([key, value]) => [key, value.filter(item => item.name.includes(`(${filteredOption})`) || item.name.includes(`(All Users)`))])
                ));
            }
        }
        filterEvents();
    }, [events, filteredOption]);


    return (
        <ErrorBoundary fallback={<Text style={styles(mode).itemText}>Something went wrong</Text>}>
            <View key={mode} style={styles(mode).container}>
                <Agenda
                    theme={calendarTheme(mode)} items={filteredEvents} selected={selected} collapsable={true}
                    enableSwipeMonths={true} scrollEnabled={true} showOnlySelectedDayItems={true}
                    onDayPress={(day) => {
                        setSelected(day.dateString);
                        dispatch(setReduxSelected(day.dateString));
                    }}
                    renderItem={(item) => (
                        <CalendarItem item={item} areActionsOn={true}/>
                    )}
                />
            </View>
        </ErrorBoundary>
    );
}