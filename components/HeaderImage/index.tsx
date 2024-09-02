import {Image, Pressable} from "react-native";
import styles from "./styles";
import React from "react";
import {IHeaderImageProps} from "./IHeaderImageProps";

export function HeaderImage(props: IHeaderImageProps) {
    return (
        <Pressable style={styles.headerButtonContainer} onPress={props.onPress}>
            <Image
                style={styles.headerButtonImage}
                source={props.source}
            />
        </Pressable>
    );
}