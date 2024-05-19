import {styles} from "./styles";
import {Text, TouchableOpacity, View} from "react-native";
import {rgbIntToHex} from "../../../constants/AppConverts";
import React from "react";
import {CalendarItemProps} from "./CalendarItemProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

export function CalendarItem({item, onLongPressItem}: CalendarItemProps) {
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <TouchableOpacity style={styles(mode).item} onLongPress={onLongPressItem}>
            <View style={{ borderRadius: 50, backgroundColor: rgbIntToHex(item.height), width: 30, height: 30 }} />
            <Text style={styles(mode).itemText}>{item.name.split(';')[0]}</Text>
            <Text style={styles(mode).itemText}>Notes: {item.name.split(';')[1]}</Text>
        </TouchableOpacity>
    );
}