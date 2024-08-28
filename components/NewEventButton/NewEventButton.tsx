import {View} from "react-native";
import React, {useState} from "react";
import {NewEventButtonModal} from "./NewEventButtonModal/NewEventButtonModal";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function NewEventButton() {
    const [modalVisible, setModalVisible] = useState(false);
    const {t} = useTranslation();
    const selected = useSelector((state: RootState) => state.events.selected);

    return (
        <View>
            <NewEventButtonModal modalVisible={modalVisible} setModalVisible={setModalVisible}/>
            {selected && new Date(selected).getDay() >= new Date().getDay() && new Date(selected).getMonth() >= new Date().getMonth() && <ButtonApp label={t('AddNewEvent')} onPress={() => setModalVisible(true)}/>}
        </View>
    );
}