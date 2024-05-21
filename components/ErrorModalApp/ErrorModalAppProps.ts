import {Dispatch, SetStateAction} from "react";

export interface ErrorModalAppProps {
    modalVisible: boolean,
    setModalVisible: Dispatch<SetStateAction<boolean>>
    errorText: string
}