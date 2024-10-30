import {styles} from "./styles";
import React from "react";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IOptionItemsProps} from "./IOptionItemsProps";
import {View, Text} from "react-native";
import {useTranslation} from "react-i18next";

export function OptionItems(props: IOptionItemsProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <View>
            <Text style={styles(mode).optionItemsSelectionTitle}>{t('OptionItemsSelection')}</Text>
            {props.valueList.map(optionItem => (
                <ButtonApp
                    onPress={() => props.changeValue(optionItem)}
                    key={props.valueList.indexOf(optionItem)}
                    label={props.labelList[props.valueList.indexOf(optionItem)]}
                    buttonStyle={[styles(mode).optionItem, styles(mode).elliptical, {
                        backgroundColor: optionItem == props.value ? '#7265e3' : 'grey',
                    }]}
                />
            ))}
        </View>
    );
}