import {Dispatch, SetStateAction} from "react";

export interface IEventModalProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}