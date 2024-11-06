import {View} from 'react-native';
import MenuButton from "./MenuButton/MenuButton";
import {styles} from "./styles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";
import {CommonActions} from "@react-navigation/native";

export function DrawerContainer({navigation}: any) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    const menuItems = [
        {titleKey: "Home", target: "Landing", icon: require('../../assets/home.png')},
        {titleKey: "Settings", target: "Settings", icon: require('../../assets/settings.png')},
        {titleKey: "Logout", target: "Home", icon: require('../../assets/logout.png')}
    ];

    const renderMenuButton = (item: { titleKey: string; target: string; icon: any }) => (
        <MenuButton
            title={t(item.titleKey)}
            source={item.icon}
            key={item.target}
            onPress={() => {
                if (item.target === "Home") {
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0, // The index of the active route
                            routes: [{name: 'Home'}], // The screen you want to navigate to
                        })
                    );
                } else {
                    navigation.navigate(item.target);
                }
                navigation.closeDrawer();
            }}
        />
    );

    return (
        <View style={[styles(mode).content]}>
            <View style={[styles(mode).container]}>
                {menuItems.map(item => renderMenuButton(item))}
            </View>
        </View>
    );
}