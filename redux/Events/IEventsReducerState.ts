import {AgendaSchedule} from "react-native-calendars";

export interface IEventsReducerState {
    events: AgendaSchedule,
    selected: string
}