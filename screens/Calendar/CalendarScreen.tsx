import React from 'react';
import {RefreshControl, ScrollView, Text, TouchableOpacity} from 'react-native';
import Calendar from "../../components/Calendar/Calendar";
import NewEventButton from "../../components/NewEventButton/NewEventButton";
import {styles} from './styles';
import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../../navigation/AppNavigation";
import {setUser} from "../../redux/User/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {XHRRequest} from "../../UserServerIntegration/XHR";
import {RootState} from "../../redux/store";
import {setEvents} from "../../redux/Events/eventsSlice";

type Props = StackScreenProps<MainStackParamList, 'Calendar'>;

export default function CalendarScreen({navigation}: Props) {
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const user = useSelector((state: RootState) => state.user);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        dispatch(setEvents({}));
        XHRRequest(dispatch,'/connect', {
            ...user, name: "", height: 10, day: ""
        }, () => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
            <Text style={styles.mainText}>לו"ז מדור פיתוח</Text>
            <Calendar/>
            <NewEventButton/>
            <TouchableOpacity style={styles.button} onPress={() => {
                dispatch(setUser({username: '', password: ''}));
                navigation.navigate('Home');
            }}>
                <Text style={styles.textStyle}>Exit</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}