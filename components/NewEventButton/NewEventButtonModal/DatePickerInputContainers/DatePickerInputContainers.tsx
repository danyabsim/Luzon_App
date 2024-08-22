import {styleByOS} from "../../../../utils/AppStyles";
import {View} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import {IDatePickerInputContainersProps} from "./IDatePickerInputContainersProps";
import {formatDateAndTime} from "../../../../utils/DateFunctions";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../../../ButtonApp/ButtonApp";

export function DatePickerInputContainers(props: IDatePickerInputContainersProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const {i18n} = useTranslation();

    return (
        <View>
            {styleByOS() &&
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
                        date={new Date()} isVisible={isDatePickerVisible} mode={props.isEnabled ? "date" : "datetime"}
                        isDarkModeEnabled={true}
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