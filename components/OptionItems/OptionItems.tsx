import {styles} from "./styles";
import React from "react";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IOptionItemsProps} from "./IOptionItemsProps";

export function OptionItems(props: IOptionItemsProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <>
            {props.valueList.map(optionItem => (
                <ButtonApp
                    onPress={() => props.changeValue(optionItem)}
                    key={props.valueList.indexOf(optionItem)}
                    label={props.labelList[props.valueList.indexOf(optionItem)]}
                    buttonStyle={[styles(mode).optionItem, styles(mode).elliptical, {
                        backgroundColor: optionItem == props.value ? '#7265e3' : '#373737',
                    }]}
                />
            ))}
        </>
    );
}