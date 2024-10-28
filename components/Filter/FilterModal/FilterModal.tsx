import {IFilterModalProps} from "./IFilterModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {Text, View} from "react-native";
import {styles} from "./styles";
import {useTranslation} from "react-i18next";
import {OptionItems} from "../../OptionItems/OptionItems";
import {ButtonApp} from "../../ButtonApp/ButtonApp";
import React, {useCallback, useMemo} from "react";
import {setFilteredOption} from "../../../redux/Events/eventsSlice";
import {useFocusEffect} from "@react-navigation/native";

export function FilterModal(props: IFilterModalProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const usernames = useSelector((state: RootState) => state.events.usernames);
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch();

    const options = useMemo(() => [t('All'), ...usernames], [i18n.language, usernames]); // Recompute options when language changes

    useFocusEffect(
        useCallback(() => {
            // Set selected option and dispatch action every time the component is focused
            props.setSelectedOption(t('All'));
            dispatch(setFilteredOption('All'));

            // Optional cleanup (if needed when unfocusing)
            return () => {
                // Code to run when component loses focus (if necessary)
            };
        }, [dispatch, props]) // Add dependencies to ensure proper memoization
    );

    const handleSelect = (item: string) => {
        props.setSelectedOption(item);
        dispatch(setFilteredOption(item));
        props.setModalVisible(false);
    };

    return (
        <ModalApp modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}>
            <View style={styles(mode).container}>
                <Text style={styles(mode).title}>{t('SelectCalendar')}</Text>
                <OptionItems
                    valueList={options}
                    labelList={options}
                    value={props.selectedOption} changeValue={handleSelect}
                />
                <ButtonApp label={t('Close')} onPress={() => props.setModalVisible(false)}/>
            </View>
        </ModalApp>
    );
}