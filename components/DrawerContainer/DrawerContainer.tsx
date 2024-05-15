import {View} from 'react-native';
import MenuButton from "./MenuButton/MenuButton";
import {styles} from "./styles";
import {styleByTime} from "../../constants/AppStyles";
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../../redux/User/userSlice";
import {RootState} from "../../redux/store";

export function DrawerContainer({navigation}: any) {
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.darkMode.mode);

    return (
        <View style={styles(mode).content}>
            <View style={styles(mode).container}>
                <MenuButton
                    title="Home"
                    source={styleByTime(require('../../assets/home (black).png'), require('../../assets/home (white).png'), mode)}
                    onPress={() => {
                        navigation.navigate('Calendar');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title="Profile"
                    source={styleByTime(require('../../assets/user (black).png'), require('../../assets/user (white).png'), mode)}
                    onPress={() => {
                        navigation.navigate('Profile');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title="Settings"
                    source={styleByTime(require('../../assets/settings (black).png'), require('../../assets/settings (white).png'), mode)}
                    onPress={() => {
                        navigation.navigate('Settings');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title="Logout"
                    source={styleByTime(require('../../assets/logout (black).png'), require('../../assets/logout (white).png'), mode)}
                    onPress={() => {
                        dispatch(setUser({username: '', password: ''}));
                        navigation.navigate('Home');
                        navigation.closeDrawer();
                    }}
                />
            </View>
        </View>
    );
}