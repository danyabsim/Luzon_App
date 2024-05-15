import {AgendaEntry} from "react-native-calendars";
import {GestureResponderEvent} from "react-native";

export interface CalendarItemProps {
    item: AgendaEntry;
    onLongPressItem: (event: GestureResponderEvent) => void;
}