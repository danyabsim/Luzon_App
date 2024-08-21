import {TouchableOpacity, Text} from "react-native";
import {styles} from "./styles";
import React from "react";

interface IOptionItemProps {
    item: {
        id: number;
        label: string;
    };
    mode: "dark" | "light";
    onSelect: (item: { id: number; label: string }) => void;
}

export const OptionItem: React.FC<IOptionItemProps> = React.memo(({ item, mode, onSelect }) => (
    <TouchableOpacity
        key={item.id}
        style={[styles(mode).optionItem, styles(mode).elliptical]}
        onPress={() => onSelect(item)}
    >
        <Text style={styles(mode).menuText}>{item.label}</Text>
    </TouchableOpacity>
));