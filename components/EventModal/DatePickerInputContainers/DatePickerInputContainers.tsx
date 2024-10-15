import {isPhoneOS} from "../../../utils/AppStyles";
import {View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, {useEffect, useState} from "react";
import {IDatePickerInputContainersProps} from "./IDatePickerInputContainersProps";
import {formatDateAndTime} from "../../../utils/DateFunctions";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../../ButtonApp/ButtonApp";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/store";

export function DatePickerInputContainers(props: IDatePickerInputContainersProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const selected = useSelector((state: RootState) => state.events.selected);
    const {i18n} = useTranslation();

    const [pastDate, setPastDate] = useState(new Date(selected));
    const [futureDate, setFutureDate] = useState(new Date(selected));

    useEffect(() => {
        pastDate.setFullYear(pastDate.getFullYear() - 1);
        if (pastDate < new Date()) setPastDate(new Date());
        futureDate.setFullYear(futureDate.getFullYear() + 1);
        const maximumFutureDate = new Date();
        maximumFutureDate.setFullYear(maximumFutureDate.getFullYear() + 2);
        if (futureDate > maximumFutureDate) setFutureDate(maximumFutureDate);
    }, [selected]);

    return (
        <View>
            {isPhoneOS() &&
                <View style={{
                    flexDirection: 'row',
                    marginLeft: i18n.language == 'en' ? 20 : 0,
                    marginRight: i18n.language == 'he' ? 20 : 0
                }}>
                    {props.timeContainers.map((time, index) => (
                        <View key={index}>
                            <ButtonApp
                                onPress={() => {
                                    setDatePickerVisibility(true);
                                    setCurrentIndex(index);
                                }}
                                label={time.label + "" + (time.state !== undefined ? `\n${formatDateAndTime(time.state).date}\n(${formatDateAndTime(time.state).time})` : "")}
                            />
                        </View>
                    ))}
                    <DateTimePickerModal
                        date={new Date()} isDarkModeEnabled={true} isVisible={isDatePickerVisible}
                        mode={props.isEnabled ? "date" : "datetime"}
                        minimumDate={(currentIndex == 1 && props.timeContainers[0].state) ? props.timeContainers[0].state : pastDate}
                        maximumDate={(currentIndex == 0 && props.timeContainers[1].state) ? props.timeContainers[1].state : futureDate}
                        onConfirm={(date) => {
                            if (props.isEnabled) {
                                date.setHours(currentIndex == 0 ? 0 : 23);
                                date.setMinutes(currentIndex == 0 ? 0 : 59);
                            }
                            props.timeContainers[currentIndex].setState(date);
                            setDatePickerVisibility(false);
                        }}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </View>
            }
        </View>
    );
}