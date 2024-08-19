import {ModalApp} from "../../../ModalApp/ModalApp";
import {ColorPickerModalProps} from "./ColorPickerModalProps";
import React from "react";
import {ColorPickerInputContainers} from "./ColorPickerInputContainers/ColorPickerInputContainers";

export function ColorPickerModal(props: ColorPickerModalProps) {
    const closeModal = () => {
        props.setModalVisible(!props.modalVisible);
    }

    return (
        <ModalApp
            onClose={closeModal} modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}
            children={
                <ColorPickerInputContainers color={props.color} setColor={props.setColor}/>
            }
        />
    );
}