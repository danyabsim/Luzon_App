import {AgendaEntry} from "react-native-calendars";

export interface CalendarItemProps {
    item: AgendaEntry;
    onLongPressItem: () => void;
}