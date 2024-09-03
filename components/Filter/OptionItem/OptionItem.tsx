import {styles} from "./styles";
import React from "react";
import {ButtonApp} from "../../ButtonApp/ButtonApp";

interface IOptionItemProps {
    item: {
        id: number;
        label: string;
    };
    mode: "dark" | "light";
    onSelect: (item: { id: number; label: string }) => void;
}

export const OptionItem: React.FC<IOptionItemProps> = React.memo(({item, mode, onSelect}) => (
    <ButtonApp onPress={() => onSelect(item)} label={item.label} labelStyle={styles(mode).menuText}
               buttonStyle={[styles(mode).optionItem, styles(mode).elliptical]}/>
));