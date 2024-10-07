import {IFilterModalProps} from "./IFilterModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {View, Text} from "react-native";
import {styles} from "./styles";
import {useTranslation} from "react-i18next";
import {OptionItems} from "../../OptionItems/OptionItems";
import {ButtonApp} from "../../ButtonApp/ButtonApp";
import React from "react";
import {setFilteredOption} from "../../../redux/Events/eventsSlice";

export function FilterModal(props: IFilterModalProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const usernames = useSelector((state: RootState) => state.filter.usernames);
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const options = [t('All'), t('None'), ...usernames];

    const handleSelect = (item: string) => {
        props.setSelectedOption(item);
        dispatch(setFilteredOption(item));
        props.setModalVisible(false);
    };

    return (
        <ModalApp modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}>
            <View style={styles(mode).container}>
                <View style={[styles(mode).menuContainer, styles(mode).elliptical]}>
                    <OptionItems
                        valueList={options.map(item => item)}
                        labelList={options.map(item => item)}
                        value={props.selectedOption} changeValue={handleSelect}
                    />
                    <Text>{props.selectedOption}</Text>
                    <ButtonApp label={t('Close')} onPress={() => props.setModalVisible(false)}/>
                </View>
            </View>
        </ModalApp>
    );
}