import {createStackNavigator} from '@react-navigation/stack';
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import HomeScreen from "../screens/Home/HomeScreen";

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