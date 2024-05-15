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
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <View>
            {styleByOS() &&
                timeContainers.map((time, index) => (
                    <View key={index}>
                        <TouchableOpacity style={styles(mode).button} onPress={() => setDatePickerVisibility(true)}>
                            <Text style={styles(mode).textStyle}>
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