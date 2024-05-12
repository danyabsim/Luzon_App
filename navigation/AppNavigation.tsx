import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from "@react-navigation/drawer";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import {StyleSheet} from "react-native";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import MenuImage from "../components/MenuImage/MenuImage";
import {DrawerContainer} from "../components/DrawerContainer/DrawerContainer";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export type MainStackParamList = {
    Home: undefined;
    Calendar: undefined;
    Profile: undefined;
    Settings: undefined;
};

export const AppNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                options={{headerShown: false}}
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                options={({navigation}) => {
                    return {
                        title: "",
                        headerStyle: styles.headerStyle,
                        headerLeft: () => <MenuImage onPress={() => {
                            navigation.openDrawer()
                        }}/>
                    };
                }}
                name="Calendar" component={CalendarScreen}
            />
            <Stack.Screen
                options={({navigation}) => {
                    return {
                        title: "",
                        headerStyle: styles.headerStyle,
                        headerLeft: () => <MenuImage onPress={() => {
                            navigation.openDrawer()
                        }}/>
                    };
                }}
                name="Profile" component={ProfileScreen}
            />
            <Stack.Screen
                options={({navigation}) => {
                    return {
                        title: "",
                        headerStyle: styles.headerStyle,
                        headerLeft: () => <MenuImage onPress={() => {
                            navigation.openDrawer()
                        }}/>
                    };
                }}
                name="Settings" component={SettingsScreen}
            />
        </Stack.Navigator>
    );
};

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            //drawerPosition="left"
            initialRouteName="App"
            //drawerWidth={250}
            drawerContent={({navigation}) => {
                return <DrawerContainer navigation={navigation}/>;
            }}
        >
            <Drawer.Screen options={{headerShown: false}} name="App" component={AppNavigator}/>
        </Drawer.Navigator>
    );
};

export const AppContainer = () => {
    return (
        <NavigationContainer>
            {/*<AppNavigator />*/}
            <DrawerStack/>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'white',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        marginVertical: 0,
    }
});