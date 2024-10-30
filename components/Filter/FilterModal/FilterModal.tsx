import {IFilterModalProps} from "./IFilterModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {Text, View} from "react-native";
import {styles} from "./styles";
import {useTranslation} from "react-i18next";
import {OptionItems} from "../../OptionItems/OptionItems";
import {ButtonApp} from "../../ButtonApp/ButtonApp";
import React, {useCallback, useMemo, useState} from "react";
import {setFilteredOption} from "../../../redux/Events/eventsSlice";
import {useFocusEffect} from "@react-navigation/native";

export function FilterModal(props: IFilterModalProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const usernames = useSelector((state: RootState) => state.events.usernames);
    const filteredOption = useSelector((state: RootState) => state.events.filteredOption);
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    const [tempFilteredOption, setTempFilteredOption] = useState(filteredOption);
    const options = useMemo(() => [t('All'), ...usernames], [i18n.language, usernames]); // Recompute options when language changes

    useFocusEffect(
        useCallback(() => {
            if (!options.includes(filteredOption)) dispatch(setFilteredOption(t('All')));
        }, [options, filteredOption, dispatch, i18n.language])
    );

    const handleSave = () => {
        dispatch(setFilteredOption(tempFilteredOption));
        props.setModalVisible(false);
    };

    const handleCancel = () => {
        setTempFilteredOption(filteredOption);
        props.setModalVisible(false);
    };

    return (
        <ModalApp modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}>
            <View style={styles(mode).container}>
                <Text style={styles(mode).title}>{t('SelectCalendar')}</Text>
                <OptionItems
                    valueList={options} labelList={options}
                    value={tempFilteredOption} changeValue={setTempFilteredOption}
                />
                <View style={styles(mode).inputContainer}>
                    <ButtonApp label={t('Save')} onPress={handleSave}/>
                    <ButtonApp label={t('Cancel')} onPress={handleCancel}/>
                </View>
            </View>
        </ModalApp>
    );
}