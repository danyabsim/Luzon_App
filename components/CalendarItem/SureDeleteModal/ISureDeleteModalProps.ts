import {Dispatch, SetStateAction} from "react";
import {AgendaEntry} from "react-native-calendars";

export interface ISureDeleteModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    onRequestCloseModal: () => void;
    onPressNo: () => void;
    onPressYes: () => void;
    item: AgendaEntry;
}