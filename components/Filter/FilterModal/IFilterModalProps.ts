import {Dispatch, SetStateAction} from "react";

export interface IFilterModalProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
}