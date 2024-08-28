import {AgendaEntry} from "react-native-calendars";

export interface ICalendarItemProps {
    item: AgendaEntry;
    onDeleteItem: () => void;
}