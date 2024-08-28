import {styles} from "./styles";
import {Image, Pressable, Text, View} from "react-native";
import {rgbIntToHex} from "../../../utils/AppConverts";
import React, {useState} from "react";
import {ICalendarItemProps} from "./ICalendarItemProps";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {useTranslation} from "react-i18next";
import {styleByTime} from "../../../utils/AppStyles";
import {ButtonApp} from "../../ButtonApp/ButtonApp";

export function CalendarItem({item, onDeleteItem}: ICalendarItemProps) {
    const [isExpanded, setExpanded] = useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const selected = useSelector((state: RootState) => state.events.selected);
    const {t, i18n} = useTranslation();

    const onEditItem = () => {
    };

    return (
        <Pressable style={styles(mode).item}>
            <View style={[styles(mode).buttons, {alignItems: i18n.language == 'en' ? 'flex-start' : "flex-end"}]}>
                <Pressable onPress={onDeleteItem}>
                    <Image
                        style={styles(mode).image}
                        source={styleByTime(require('../../../assets/deleteItem (black).png'), require('../../../assets/deleteItem (white).png'), mode)}
                    />
                </Pressable>
                {selected && new Date(selected).getDay() >= new Date().getDay() && new Date(selected).getMonth() >= new Date().getMonth() &&
                    <Pressable onPress={onEditItem}>
                        <Image
                            style={styles(mode).image}
                            source={styleByTime(require('../../../assets/editItem (black).png'), require('../../../assets/editItem (white).png'), mode)}
                        />
                    </Pressable>
                }
            </View>
            <View style={{borderRadius: 50, backgroundColor: rgbIntToHex(item.height), width: 25, height: 25}}/>
            <Text style={styles(mode).itemText}>{item.name.split('\0')[0]}</Text>
            <ButtonApp onPress={() => setExpanded(!isExpanded)} label={t(isExpanded ? 'Collapse' : 'Expand')}/>
            {isExpanded && <Text style={styles(mode).itemText}>{t('Notes')}: {item.name.split('\0')[1]}</Text>}
        </Pressable>
    );
}