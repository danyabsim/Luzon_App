import {IPasswordCheckProps} from "./IPasswordCheckProps";
import {View, Text} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";
import {useEffect} from "react";

export function PasswordCheck(props: IPasswordCheckProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);

    function checkCharacters() {
        return props.password.length < 8;
    }

    function checkEnglishLetter() {
        return !/[a-zA-Z]/.test(props.password);
    }

    function checkNumber() {
        return !/\d/.test(props.password);
    }

    useEffect(() => {
        props.setPassedCheck(!checkCharacters() && !checkEnglishLetter() && !checkNumber());
    }, [props.password]);

    return (
        <View>
            <View style={styles(mode).rowContainer}>
                <View style={checkCharacters() ? styles(mode).emptyBox : styles(mode).fullBox}/>
                <Text style={styles(mode).conditionText}>8+ characters</Text>
            </View>
            <View style={styles(mode).rowContainer}>
                <View style={checkEnglishLetter() ? styles(mode).emptyBox : styles(mode).fullBox}/>
                <Text style={styles(mode).conditionText}>At least 1 English letter</Text>
            </View>
            <View style={styles(mode).rowContainer}>
                <View style={checkNumber() ? styles(mode).emptyBox : styles(mode).fullBox}/>
                <Text style={styles(mode).conditionText}>At least 1 number</Text>
            </View>
        </View>
    );
}