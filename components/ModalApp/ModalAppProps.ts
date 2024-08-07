import {Dispatch, SetStateAction} from "react";

export interface ModalAppProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    children: JSX.Element;
    onClose?: () => void;
}