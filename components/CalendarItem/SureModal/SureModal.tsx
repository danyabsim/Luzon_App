import {Text, View} from "react-native";
import {styles} from "./styles";
import React from "react";
import {ISureModalProps} from "./ISureModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../../ButtonApp/ButtonApp";
import {CalendarItem} from "../CalendarItem";

export function SureModal(props: ISureModalProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <ModalApp modalVisible={props.visible} setModalVisible={props.setVisible}>
            <Text style={styles(mode).modalText}>{t('SureQuestion')}</Text>
            {props.item && <CalendarItem item={props.item} areActionsOn={false}/>}
            <View style={styles(mode).inputContainer}>
                <ButtonApp onPress={props.onPressNo} label={t('No')}/>
                <ButtonApp onPress={props.onPressYes} label={t('Yes')}/>
            </View>
        </ModalApp>
    );
}