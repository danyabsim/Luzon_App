import {ActivityIndicator, Image, Pressable} from "react-native";
import styles from "./styles";
import React from "react";
import {IHeaderImageProps} from "./IHeaderImageProps";
import {styleByTime} from "../../utils/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export function HeaderImage(props: IHeaderImageProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    return (
        <Pressable style={styles.headerButtonContainer} onPress={props.onPress} disabled={props.disabled}>
            {props.disabled && <ActivityIndicator size="large" color={styleByTime('#000000', '#ffffff', mode)}/>}
            {!props.disabled &&
                <Image
                    style={styles.headerButtonImage}
                    source={props.source}
                />
            }
        </Pressable>
    );
}