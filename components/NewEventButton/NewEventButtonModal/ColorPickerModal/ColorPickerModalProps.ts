import {Dispatch, SetStateAction} from "react";

export interface ColorPickerModalProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
}