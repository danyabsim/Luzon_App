import {SafeAreaView, View} from "react-native";
import {styles} from "./styles";
import ColorPicker from "react-native-wheel-color-picker";
import React from "react";
import {ColorPickerInputContainersProps} from "./ColorPickerInputContainersProps";

export function ColorPickerInputContainers({color, setColor}: ColorPickerInputContainersProps) {
    return (
        <SafeAreaView>
            <View style={styles.sectionContainer}>
                <ColorPicker color={color} onColorChange={(color) => setColor(color)} thumbSize={50}
                             sliderSize={50} noSnap={true} row={false} gapSize={30} palette={[]}/>
            </View>
        </SafeAreaView>
    );
}