import {View} from 'react-native';
import MenuButton from "./MenuButton/MenuButton";
import {styles} from "./styles";
import {styleByTime} from "../../constants/AppStyles";
import {useDispatch} from "react-redux";
import {setUser} from "../../redux/User/userSlice";

export function DrawerContainer({navigation}: any) {
    const dispatch = useDispatch();

    return (
        <View style={styles.content}>
            <View style={styles.container}>
                <MenuButton
                    title="Home"
                    source={styleByTime(require('../../assets/home (black).png'), require('../../assets/home (white).png'))}
                    onPress={() => {
                        navigation.navigate('Calendar');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title="Profile"
                    source={styleByTime(require('../../assets/user (black).png'), require('../../assets/user (white).png'))}
                    onPress={() => {
                        navigation.navigate('Profile');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title="Settings"
                    source={styleByTime(require('../../assets/settings (black).png'), require('../../assets/settings (white).png'))}
                    onPress={() => {
                        navigation.navigate('Settings');
                        navigation.closeDrawer();
                    }}
                />
                <MenuButton
                    title="Logout"
                    source={styleByTime(require('../../assets/logout (black).png'), require('../../assets/logout (white).png'))}
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