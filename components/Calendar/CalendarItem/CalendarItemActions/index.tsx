import React, {useEffect, useState} from "react";
import {Image, Pressable, View} from "react-native";
import {styles} from "./styles";
import {styleByTime} from "../../../../utils/AppStyles";
import {parseEventString, rgbIntToHex} from "../../../../utils/AppConverts";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {ICalendarItemActionsProps} from "./ICalendarItemActionsProps";

export function CalendarItemActions({item, onDeleteItem, onEditItem}: ICalendarItemActionsProps) {
    const [areActionsOpen, setActionsOpen] = useState(false);
    const userNameItem = parseEventString(item.name.split('\0')[0]).username;
    const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const selected = useSelector((state: RootState) => state.events.selected);

    return (
        <View style={styles(mode).container}>
            <Pressable
                style={[styles(mode).colorButton, {backgroundColor: rgbIntToHex(item.height)}]}
                onPress={() => setActionsOpen(!areActionsOpen)}
            />
            {areActionsOpen && (userNameItem !== "All Users" || (isAdmin && userNameItem === "All Users")) &&
                <View style={styles(mode).buttonContainer}>
                    {onDeleteItem &&
                        <Pressable style={[styles(mode).elliptical, styles(mode).button]} onPress={onDeleteItem}>
                            <Image
                                style={styles(mode).image}
                                source={styleByTime(require('../../../../assets/deleteItem (black).png'), require('../../../../assets/deleteItem (white).png'), mode)}
                            />
                        </Pressable>
                    }
                    {onEditItem && selected && new Date(selected).getDay() >= new Date().getDay() && new Date(selected).getMonth() >= new Date().getMonth() &&
                        <Pressable style={[styles(mode).elliptical, styles(mode).button]} onPress={onEditItem}>
                            <Image
                                style={styles(mode).image}
                                source={styleByTime(require('../../../../assets/editItem (black).png'), require('../../../../assets/editItem (white).png'), mode)}
                            />
                        </Pressable>
                    }
                </View>
            }
        </View>
    );
}