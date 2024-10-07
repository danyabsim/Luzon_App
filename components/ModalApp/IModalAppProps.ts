import {Dispatch, SetStateAction} from "react";
import * as React from "react";

export interface IModalAppProps {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
    onClose?: () => void;
}