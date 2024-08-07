import {styleByOS} from "../../../../constants/AppStyles";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import {DatePickerInputContainersProps} from "./DatePickerInputContainersProps";
import {formatDateAndTime} from "../../../../constants/DateFunctions";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

export function DatePickerInputContainers({timeContainers}: DatePickerInputContainersProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <View>
            {styleByOS() &&
                <View>
                    {timeContainers.map((time, index) => (
                        <View key={index}>
                            <TouchableOpacity style={styles(mode).button} onPress={() => {
                                setDatePickerVisibility(true);
                                setCurrentIndex(index);
                            }}>
                                <Text style={styles(mode).textStyle}>
                                    Select {time.label}{time.state !== undefined && ` => ${formatDateAndTime(time.state).date} (${formatDateAndTime(time.state).time})`}
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