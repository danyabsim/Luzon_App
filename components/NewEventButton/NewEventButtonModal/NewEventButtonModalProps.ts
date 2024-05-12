import {Dispatch, SetStateAction} from "react";

export interface NewEventButtonModalProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}