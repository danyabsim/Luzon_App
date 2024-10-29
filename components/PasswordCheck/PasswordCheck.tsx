import {IPasswordCheckProps} from "./IPasswordCheckProps";
import {View, Text} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

export function PasswordCheck(props: IPasswordCheckProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

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
                <Text style={styles(mode).conditionText}>{t('PasswordCheckLength')}</Text>
            </View>
            <View style={styles(mode).rowContainer}>
                <View style={checkEnglishLetter() ? styles(mode).emptyBox : styles(mode).fullBox}/>
                <Text style={styles(mode).conditionText}>{t('PasswordCheckLetter')}</Text>
            </View>
            <View style={styles(mode).rowContainer}>
                <View style={checkNumber() ? styles(mode).emptyBox : styles(mode).fullBox}/>
                <Text style={styles(mode).conditionText}>{t('PasswordCheckNumber')}</Text>
            </View>
        </View>
    );
}