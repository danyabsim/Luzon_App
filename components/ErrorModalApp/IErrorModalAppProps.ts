import {Dispatch, SetStateAction} from "react";

export interface IErrorModalAppProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    errorText: string;
}