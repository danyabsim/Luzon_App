import {Dispatch, SetStateAction} from "react";
import {AgendaEntry} from "react-native-calendars";

export interface IEventModalProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    item?: AgendaEntry;
}