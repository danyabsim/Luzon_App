import {styleByOS} from "../../../../constants/AppStyles";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import {DatePickerInputContainersProps} from "./DatePickerInputContainersProps";
import {formatDateAndTime} from "../../../../constants/DateFunctions";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";
import {useTranslation} from "react-i18next";

export function DatePickerInputContainers({timeContainers}: DatePickerInputContainersProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {i18n} = useTranslation();

    return (
        <View>
            {styleByOS() &&
                <View style={{
                    flexDirection: 'row',
                    marginLeft: i18n.language == 'en' ? 20 : 0,
                    marginRight: i18n.language == 'he' ? 20 : 0
                }}>
                    {timeContainers.map((time, index) => (
                        <View key={index}>
                            <TouchableOpacity style={styles(mode).button} onPress={() => {
                                setDatePickerVisibility(true);
                                setCurrentIndex(index);
                            }}>
                                <Text style={styles(mode).textStyle}>
                                    {time.label ? time.label : (time.state !== undefined && `${formatDateAndTime(time.state).date}\n(${formatDateAndTime(time.state).time})`)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                    <DateTimePickerModal
                        date={new Date()} isVisible={isDatePickerVisible} mode="datetime"
                        isDarkModeEnabled={true}
                        onConfirm={(date) => {
                            timeContainers[currentIndex].setState(date);
                            setDatePickerVisibility(false);
                        }}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </View>
            }
        </View>
    );
}