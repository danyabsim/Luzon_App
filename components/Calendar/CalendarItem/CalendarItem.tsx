import {styles} from "./styles";
import {Text, View} from "react-native";
import React, {useState} from "react";
import {ICalendarItemProps} from "./ICalendarItemProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../../ButtonApp/ButtonApp";
import {CalendarItemActions} from "./CalendarItemActions/CalendarItemActions";

export function CalendarItem({item, onDeleteItem, onEditItem}: ICalendarItemProps) {
    const [isExpanded, setExpanded] = useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    return (
        <View style={styles(mode).item}>
            <CalendarItemActions item={item} onDeleteItem={onDeleteItem} onEditItem={onEditItem}/>
            <Text style={styles(mode).itemText}>{item.name.split('\0')[0]}</Text>
            <ButtonApp onPress={() => setExpanded(!isExpanded)} label={t(isExpanded ? 'Collapse' : 'Expand')}/>
            {isExpanded && <Text style={styles(mode).itemText}>{t('Notes')}: {item.name.split('\0')[1]}</Text>}
        </View>
    );
}