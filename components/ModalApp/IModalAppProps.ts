import {Dispatch, SetStateAction} from "react";

export interface IModalAppProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    children: JSX.Element;
    onClose?: () => void;
}