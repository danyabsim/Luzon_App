import {SafeAreaView, View} from "react-native";
import {styles} from "./styles";
import ColorPicker from "react-native-wheel-color-picker";
import React from "react";
import {ColorPickerInputContainersProps} from "./ColorPickerInputContainersProps";

export function ColorPickerInputContainers({color, setColor}: ColorPickerInputContainersProps) {
    return (
        <SafeAreaView style={styles.sectionContainer}>
            <View>
                <ColorPicker color={color} onColorChange={(color) => setColor(color)} thumbSize={50}
                             sliderSize={50} row={false} palette={[]}
                />
            </View>
        </SafeAreaView>
    );
}