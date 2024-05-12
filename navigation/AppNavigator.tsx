import HomeScreen from "../screens/Home/HomeScreen";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import {styles} from "./styles";
import MenuImage from "../components/MenuImage/MenuImage";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
            <Stack.Screen
                name="Calendar" component={CalendarScreen}
                options={({navigation}) => {
                    return {
                        title: "",
                        headerStyle: styles.headerStyle,
                        headerLeft: () => <MenuImage onPress={() => {
                            navigation.openDrawer()
                        }}/>
                    };
                }}/>
            <Stack.Screen
                name="Profile" component={ProfileScreen}
                options={({navigation}) => {
                    return {
                        title: "",
                        headerStyle: styles.headerStyle,
                        headerLeft: () => <MenuImage onPress={() => {
                            navigation.openDrawer()
                        }}/>
                    };
                }}/>
            <Stack.Screen
                name="Settings" component={SettingsScreen}
                options={({navigation}) => {
                    return {
                        title: "",
                        headerStyle: styles.headerStyle,
                        headerLeft: () => <MenuImage onPress={() => {
                            navigation.openDrawer()
                        }}/>
                    };
                }}/>
        </Stack.Navigator>
    );
};
