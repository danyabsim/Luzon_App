import React from 'react';
import {RefreshControl, ScrollView, Text} from 'react-native';
import Calendar from "../../components/Calendar/Calendar";
import NewEventButton from "../../components/NewEventButton/NewEventButton";
import {styles} from './styles';
import {useDispatch, useSelector} from "react-redux";
import {XHRRequest} from "../../UserServerIntegration/XHR";
import {RootState} from "../../redux/store";
import {setEvents} from "../../redux/Events/eventsSlice";
import Filter from "../../components/Filter/Filter";

export default function CalendarScreen() {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const user = useSelector((state: RootState) => state.user);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(setEvents({}));
        XHRRequest(dispatch, '/connect', {...user}, () => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
            <Text style={styles.mainText}>לו"ז מדור פיתוח</Text>
            {user.isAdmin && <Filter/>}
            <Calendar/>
            <NewEventButton/>
        </ScrollView>
    );
}