import {Dispatch, SetStateAction} from "react";

export interface INewEventButtonModalProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}