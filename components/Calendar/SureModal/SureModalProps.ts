import {Dispatch, SetStateAction} from "react";

export interface SureModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    onRequestCloseModal: () => void;
    onPressNo: () => void;
    onPressYes: () => void;
}