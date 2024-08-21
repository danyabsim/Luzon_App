import HomeScreen from "../screens/Home/HomeScreen";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import {styles} from "./styles";
import MenuImage from "../components/MenuImage/MenuImage";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useTranslation} from "react-i18next";
import {RefreshImage} from "../components/RefreshImage/RefreshImage";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {i18n} = useTranslation();

    const headerOptions = (navigation: any) => {
        return {
            title: "",
            headerStyle: styles(mode).headerStyle,
            headerLeft: () => i18n.language == 'en' ? <MenuImage onPress={() => {
                navigation.openDrawer()
            }}/> : <RefreshImage/>,
            headerRight: () => i18n.language == 'he' ? <MenuImage onPress={() => {
                navigation.openDrawer()
            }}/> : <RefreshImage/>
        };
    }

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
            <Stack.Screen
                name="Calendar" component={CalendarScreen} options={({navigation}) => headerOptions(navigation)}
            />
            <Stack.Screen
                name="Profile" component={ProfileScreen} options={({navigation}) => headerOptions(navigation)}
            />
            <Stack.Screen
                name="Settings" component={SettingsScreen} options={({navigation}) => headerOptions(navigation)}
            />
        </Stack.Navigator>
    );
};
