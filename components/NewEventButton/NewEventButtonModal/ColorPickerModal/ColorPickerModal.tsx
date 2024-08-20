import {ModalApp} from "../../../ModalApp/ModalApp";
import {ColorPickerModalProps} from "./ColorPickerModalProps";
import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {styles} from "./styles";
import ColorPicker from "react-native-wheel-color-picker";

export function ColorPickerModal(props: ColorPickerModalProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    const closeModal = () => {
        props.setModalVisible(!props.modalVisible);
    }

    return (
        <ModalApp
            onClose={closeModal} modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}
            children={
                <View style={styles(mode).container}>
                    <Text style={styles(mode).title}>{t('ColorPicker')}</Text>
                    <View style={styles(mode).sectionContainer}>
                        <View>
                            <ColorPicker color={props.color} onColorChange={(color) => props.setColor(color)}
                                         thumbSize={50} sliderSize={50} row={false} palette={[]}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles(mode).button} onPress={closeModal}>
                        <Text style={styles(mode).textStyle}>{t('Close')}</Text>
                    </TouchableOpacity>
                </View>
            }
        />
    );
}