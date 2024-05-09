import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import MenuImage from "../components/MenuImage/MenuImage";

const Stack = createStackNavigator();

export type MainStackParamList = {
    Home: undefined;
    Calendar: undefined;
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
                options={{headerShown: false}}
                name="Calendar"
                component={CalendarScreen}
            />
        </Stack.Navigator>
    );
};

export type CalendarStackParamList = {
    Calendar: undefined;
    Profile: undefined;
    Settings: undefined;
};

export const CalendarNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignSelf: 'center'
                },
                headerRight: () => <View/>
            }}
        >
            <Stack.Screen
                options={({navigation}) => {
                    return {
                        headerStyle: styles.headerStyle,
                        headerLeft: () => (
                            <MenuImage onPress={() => {navigation.openDrawer()}}/>
                        )
                    };
                }}
                name="Calendar"
                component={CalendarScreen}
            />
            <Stack.Screen
                options={({navigation}) => {
                    return {
                        headerStyle: styles.headerStyle,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <Text>Hello</Text>
                            </TouchableOpacity>
                        )
                    };
                }}
                name="Profile"
                component={ProfileScreen}
            />
            <Stack.Screen
                options={({navigation}) => {
                    return {
                        headerStyle: styles.headerStyle,
                        headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                                <Text>Hello</Text>
                            </TouchableOpacity>
                        )
                    };
                }}
                name="Settings"
                component={SettingsScreen}
            />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#F4F6FA',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0,
    }
});