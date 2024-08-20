import {styles} from "./styles";
import {Text, TouchableOpacity, View} from "react-native";
import {rgbIntToHex} from "../../../constants/AppConverts";
import React from "react";
import {ICalendarItemProps} from "./ICalendarItemProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useTranslation} from "react-i18next";

export function CalendarItem({item, onLongPressItem}: ICalendarItemProps) {
    const [isExpanded, setExpanded] = React.useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <TouchableOpacity
            style={styles(mode).item} onPress={() => setExpanded(!isExpanded)} onLongPress={onLongPressItem}
        >
            <View style={{borderRadius: 50, backgroundColor: rgbIntToHex(item.height), width: 30, height: 30}}/>
            <Text style={styles(mode).itemText}>{item.name.split('\0')[0]}</Text>
            {isExpanded && <Text style={styles(mode).itemText}>{t('Notes')}: {item.name.split('\0')[1]}</Text>}
        </TouchableOpacity>
    );
}