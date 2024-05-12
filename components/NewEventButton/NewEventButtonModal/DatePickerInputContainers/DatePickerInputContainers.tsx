import {formatDateAndTime, styleByOS} from "../../../../constants/AppStyles";
import {Text, TouchableOpacity, View} from "react-native";
import {styles} from "../../styles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React from "react";
import {DatePickerInputContainersProps} from "./DatePickerInputContainersProps";

export function DatePickerInputContainers({timeContainers}: DatePickerInputContainersProps) {
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);

    return (
        <View>
            {styleByOS() &&
                timeContainers.map((time, index) => (
                    <View key={index}>
                        <TouchableOpacity style={styles.button} onPress={() => setDatePickerVisibility(true)}>
                            <Text style={styles.textStyle}>
                                {time.state === undefined ? `Select ${time.label}` : `You chose ${formatDateAndTime(time.state).date} (${formatDateAndTime(time.state).time})`}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            date={time.state as Date} isVisible={isDatePickerVisible} mode="datetime"
                            onConfirm={(date) => {
                                time.setState(date)
                                setDatePickerVisibility(false);
                            }}
                            onCancel={() => setDatePickerVisibility(false)}
                        />
                    </View>
                ))
            }
        </View>
    );
}