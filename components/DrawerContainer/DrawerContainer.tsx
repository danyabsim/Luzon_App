import {View} from 'react-native';
import MenuButton from "./MenuButton/MenuButton";
import {styles} from "./styles";
import {styleByTime} from "../../constants/AppStyles";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/User/userSlice";
import {RootState} from "../../redux/store";
import {XHRRequest} from "../../utils/XHR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTranslation} from "react-i18next";

export function DrawerContainer({navigation}: any) {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const image = useSelector((state: RootState) => state.user.image);
    const user = useSelector((state: RootState) => state.user);
    const {t, i18n} = useTranslation();

    return (
        <View style={styles(mode).content}>
            <View style={[styles(mode).container, {alignItems: i18n.language == 'en' ? 'flex-start' : "flex-end"}]}>
                <MenuButton
                    title={t("Home")}
                    source={styleByTime(require('../../assets/home (black).png'), require('../../assets/home (white).png'), mode)}
                    onPress={() => {
                        navigation.navigate('Calendar');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title={t("Profile")}
                    source={image ? image : styleByTime(require('../../assets/user (black).png'), require('../../assets/user (white).png'), mode)}
                    onPress={() => {
                        navigation.navigate('Profile');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title={t("Settings")}
                    source={styleByTime(require('../../assets/settings (black).png'), require('../../assets/settings (white).png'), mode)}
                    onPress={() => {
                        navigation.navigate('Settings');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title={t("Logout")}
                    source={styleByTime(require('../../assets/logout (black).png'), require('../../assets/logout (white).png'), mode)}
                    onPress={async () => {
                        const storedRememberMe = await AsyncStorage.getItem('rememberMe');
                        XHRRequest(dispatch, '/logout', {
                            username: user.username,
                            isRememberMeOn: storedRememberMe ? storedRememberMe : false
                        });
                        dispatch(setUser({username: '', password: ''}));
                        navigation.navigate('Home');
                        navigation.closeDrawer();
                    }}
                />
            </View>
        </View>
    );
}