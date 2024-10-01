import {View} from 'react-native';
import MenuButton from "./MenuButton/MenuButton";
import {styles} from "./styles";
import {styleByTime} from "../../utils/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";

export function DrawerContainer({navigation}: any) {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    const menuItems = [
        {
            titleKey: "Home", target: "Calendar",
            icon: styleByTime(require('../../assets/home (black).png'), require('../../assets/home (white).png'), mode)
        },
        {
            titleKey: "Settings", target: "Settings",
            icon: styleByTime(require('../../assets/settings (black).png'), require('../../assets/settings (white).png'), mode)
        },
        {
            titleKey: "Logout", target: "Home",
            icon: styleByTime(require('../../assets/logout (black).png'), require('../../assets/logout (white).png'), mode)
        }
    ];

    const renderMenuButton = (item: { titleKey: string; target: string; icon: any }) => (
        <MenuButton
            title={t(item.titleKey)}
            source={item.icon}
            key={item.target}
            onPress={() => {
                navigation.navigate(item.target);
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