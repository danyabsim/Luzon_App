import {AgendaEntry} from "react-native-calendars";

export interface ICalendarItemActionsProps {
    item: AgendaEntry;
    onDeleteItem?: () => void;
    onEditItem?: () => void;
}