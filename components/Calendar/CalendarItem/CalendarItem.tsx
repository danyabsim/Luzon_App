import {styles} from "./styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {rgbIntToHex} from "../../../utils/AppConverts";
import React from "react";
import {ICalendarItemProps} from "./ICalendarItemProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useTranslation} from "react-i18next";
import {styleByTime} from "../../../utils/AppStyles";
import {ButtonApp} from "../../ButtonApp/ButtonApp";

export function CalendarItem({item, onDeleteItem}: ICalendarItemProps) {
    const [isExpanded, setExpanded] = React.useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    const onEditItem = () => {};

    return (
        <TouchableOpacity style={styles(mode).item}>
            <Text>Hello</Text>
            <View style={styles(mode).buttons}>
                <TouchableOpacity onPress={onDeleteItem}>
                    <Image
                        source={styleByTime(require('../../../assets/deleteItem (black).png'), require('../../../assets/deleteItem (white).png'), mode)}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={onEditItem}>
                    <Image
                        source={styleByTime(require('../../../assets/editItem (black).png'), require('../../../assets/editItem (white).png'), mode)}
                    />
                </TouchableOpacity>
            </View>
            <View style={{borderRadius: 50, backgroundColor: rgbIntToHex(item.height), width: 25, height: 25}}/>
            <Text style={styles(mode).itemText}>{item.name.split('\0')[0]}</Text>
            <ButtonApp onPress={() => setExpanded(!isExpanded)} label={t(isExpanded ? 'Expand' : 'Collapse')}/>
            {isExpanded && <Text style={styles(mode).itemText}>{t('Notes')}: {item.name.split('\0')[1]}</Text>}
        </TouchableOpacity>
    );
}