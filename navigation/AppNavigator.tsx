import HomeScreen from "../screens/Home/HomeScreen";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import {styles} from "./styles";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import {createStackNavigator, StackNavigationOptions} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useTranslation} from "react-i18next";
import {HeaderImage} from "../components/HeaderImage/HeaderImage";
import {setEvents} from "../redux/Events/eventsSlice";
import {XHR} from "../utils/XHR";
import {SearchScreen} from "../screens/Search/SearchScreen";
import {useState} from "react";
import {TimeOutDelay} from "../utils/TimeOutDelay";
import LandingScreen from "../screens/Landing/LandingScreen";
import {ServerSubURL} from "../constants/ServerSubURL";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    const dispatch = useDispatch();
    const [isOnRefresh, setOnRefresh] = useState(false);
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {i18n} = useTranslation();

    const headerOptions = (navigation: any) => {
        const MenuImage = () => <HeaderImage
            onPress={() => navigation.openDrawer()}
            source={require('../assets/menu.png')}
        />;

        const RefreshImage = () => <HeaderImage
            onPress={async () => {
                setOnRefresh(true);
                await TimeOutDelay(300);
                dispatch(setEvents({}));
                await XHR(dispatch, ServerSubURL.Connect, {...user});
                setOnRefresh(false);
            }}
            disabled={isOnRefresh}
            source={require('../assets/refresh.png')}
        />;

        return {
            title: "",
            headerStyle: styles(mode).headerStyle,
            headerLeft: () => i18n.language == 'en' ? MenuImage() : RefreshImage(),
            headerRight: () => i18n.language == 'he' ? MenuImage() : RefreshImage()
        } as StackNavigationOptions;
    }

    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen}/>
            <Stack.Screen
                name="Calendar" component={CalendarScreen} options={({navigation}) => headerOptions(navigation)}
            />
            <Stack.Screen
                name="Settings" component={SettingsScreen} options={({navigation}) => headerOptions(navigation)}
            />
            <Stack.Screen
                name="Search" component={SearchScreen} options={({navigation}) => headerOptions(navigation)}
            />
            <Stack.Screen
                name="Landing" component={LandingScreen} options={({navigation}) => headerOptions(navigation)}
            />
        </Stack.Navigator>
    );
};
