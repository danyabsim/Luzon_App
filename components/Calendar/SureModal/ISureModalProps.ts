import {Dispatch, SetStateAction} from "react";

export interface ISureModalProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    onRequestCloseModal: () => void;
    onPressNo: () => void;
    onPressYes: () => void;
}