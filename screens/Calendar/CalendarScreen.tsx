import React, {useState} from 'react';
import {RefreshControl, ScrollView, Text, TouchableWithoutFeedback} from 'react-native';
import Calendar from "../../components/Calendar/Calendar";
import NewEventButton from "../../components/NewEventButton/NewEventButton";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {XHRRequest} from "../../utils/XHR";
import {RootState} from "../../redux/store";
import {setEvents} from "../../redux/Events/eventsSlice";
import Filter from "../../components/Filter/Filter";

export default function CalendarScreen() {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const lastUpdated = useSelector((state: RootState) => state.events.lastUpdated);
    const [isMenuOpen, setMenuOpen] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(setEvents({}));
        XHRRequest(dispatch, '/connect', {...user}, () => setRefreshing(false));
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => isMenuOpen && setMenuOpen(false)}>
            <ScrollView
                contentContainerStyle={styles(mode).container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }>
                <Text style={[styles(mode).mainText, styles(mode).plainText]}>לו"ז מדור פיתוח</Text>
                {user.isAdmin && <Filter isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}/>}
                <Text style={styles(mode).plainText}>The events data was last updated
                    on {new Date(lastUpdated).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}</Text>
                <Calendar/>
                <NewEventButton/>
            </ScrollView>
        </TouchableWithoutFeedback>

    );
}