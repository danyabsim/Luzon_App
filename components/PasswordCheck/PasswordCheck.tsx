import {IPasswordCheckProps} from "./IPasswordCheckProps";
import {Text, View} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {styles} from "./styles";
import {useEffect, useMemo} from "react";
import {useTranslation} from "react-i18next";

export function PasswordCheck({password, setPassedCheck}: IPasswordCheckProps) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t, i18n} = useTranslation();

    const checks = useMemo(() => ({
        length: password.length >= 8,
        letter: /[a-zA-Z]/.test(password),
        number: /\d/.test(password)
    }), [password]);

    useEffect(() => {
        setPassedCheck(Object.values(checks).every(Boolean));
    }, [checks]);

    return (
        <View>
            {[
                {check: checks.length, label: t('PasswordCheckLength')},
                {check: checks.letter, label: t('PasswordCheckLetter')},
                {check: checks.number, label: t('PasswordCheckNumber')}
            ].map(({check, label}, index) => (
                <View key={index} style={styles(mode).rowContainer}>
                    {i18n.language == 'he' && <Text style={styles(mode).conditionText}>{label}</Text>}
                    <View style={check ? styles(mode).fullBox : styles(mode).emptyBox}/>
                    {i18n.language == 'en' && <Text style={styles(mode).conditionText}>{label}</Text>}
                </View>
            ))}
        </View>
    );
}