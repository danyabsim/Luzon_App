import {View} from "react-native";
import React from "react";
import {NewEventButtonModal} from "./NewEventButtonModal/NewEventButtonModal";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../ButtonApp/ButtonApp";

export default function NewEventButton() {
    const [modalVisible, setModalVisible] = React.useState(false);
    const {t} = useTranslation();

    return (
        <View>
            <NewEventButtonModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            <ButtonApp label={t('AddNewEvent')} onPress={() => setModalVisible(true)}/>
        </View>
    );
}