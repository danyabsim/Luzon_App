export interface SureModalProps {
    visible: boolean;
    onRequestCloseModal: () => void;
    onPressNo: () => void;
    onPressYes: () => void;
}