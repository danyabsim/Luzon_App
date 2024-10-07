import {IFilterModalProps} from "./IFilterModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {View} from "react-native";
import {styles} from "./styles";
import {useTranslation} from "react-i18next";
import {OptionItems} from "../../OptionItems/OptionItems";
import {ButtonApp} from "../../ButtonApp/ButtonApp";
import React from "react";

export function FilterModal(props: IFilterModalProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const usernames = useSelector((state: RootState) => state.filter.usernames);
    const {t} = useTranslation();

    const options = [t('All'), t('None'), ...usernames];

    return (
        <ModalApp modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}>
            <View style={[styles(mode).menuContainer, styles(mode).elliptical]}>
                <OptionItems
                    valueList={options.map(item => item)}
                    labelList={options.map(item => item)}
                    value={props.selectedOption} changeValue={props.setSelectedOption}
                />
                <ButtonApp label={t('Close')} onPress={() => props.setModalVisible(false)}/>
            </View>
        </ModalApp>
    );
}