import {styles} from "./styles";
import {Text, TouchableOpacity, View} from "react-native";
import {rgbIntToHex} from "../../../constants/AppStyles";
import React from "react";
import {CalendarItemProps} from "./CalendarItemProps";

export function CalendarItem({item, onLongPressItem}: CalendarItemProps) {
    return (
        <TouchableOpacity style={styles.item} onLongPress={onLongPressItem}>
            <View style={{ borderRadius: 50, backgroundColor: rgbIntToHex(item.height), width: 30, height: 30 }} />
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );
}