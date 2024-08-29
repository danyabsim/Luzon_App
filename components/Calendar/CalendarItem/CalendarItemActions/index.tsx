import React, {useState} from "react";
import {Image, Pressable, View} from "react-native";
import {styles} from "./styles";
import {styleByTime} from "../../../../utils/AppStyles";
import {rgbIntToHex} from "../../../../utils/AppConverts";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {ICalendarItemProps} from "../ICalendarItemProps";

export function CalendarItemActions({item, onDeleteItem, onEditItem}: ICalendarItemProps) {
    const [areActionsOpen, setActionsOpen] = useState(false);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const selected = useSelector((state: RootState) => state.events.selected);

    return (
        <View style={styles.container}>
            <Pressable
                style={[{borderRadius: 60, backgroundColor: rgbIntToHex(item.height), width: 30, height: 30}]}
                onPress={() => setActionsOpen(!areActionsOpen)}
            />
            {areActionsOpen &&
                <View style={styles.buttonContainer}>
                    {onDeleteItem &&
                        <Pressable style={[styles.elliptical, styles.button]} onPress={onDeleteItem}>
                            <Image
                                style={styles.image}
                                source={styleByTime(require('../../../../assets/deleteItem (black).png'), require('../../../../assets/deleteItem (white).png'), mode)}
                            />
                        </Pressable>
                    }
                    {onEditItem && selected && new Date(selected).getDay() >= new Date().getDay() && new Date(selected).getMonth() >= new Date().getMonth() &&
                        <Pressable style={[styles.elliptical, styles.button]} onPress={onEditItem}>
                            <Image
                                style={styles.image}
                                source={styleByTime(require('../../../../assets/editItem (black).png'), require('../../../../assets/editItem (white).png'), mode)}
                            />
                        </Pressable>
                    }
                </View>
            }
        </View>
    );
}