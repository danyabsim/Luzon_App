import HomeScreen from "../screens/Home/HomeScreen";
import CalendarScreen from "../screens/Calendar/CalendarScreen";
import {styles} from "./styles";
import SettingsScreen from "../screens/Settings/SettingsScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {useTranslation} from "react-i18next";
import {HeaderImage} from "../components/HeaderImage/HeaderImage";
import {styleByTime} from "../utils/AppStyles";
import {setEvents} from "../redux/Events/eventsSlice";
import {XHR} from "../utils/XHR";
import {View} from "react-native";
import {SearchScreen} from "../screens/Search/SearchScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {i18n} = useTranslation();

    const headerOptions = (navigation: any) => {
        const MenuImage = (<HeaderImage
            onPress={() => {
                navigation.openDrawer()
            }}
            source={styleByTime(require('../assets/menu (black).png'), require('../assets/menu (white).png'), mode)}
        />);

        const RefreshImage = (<HeaderImage
            onPress={() => {
                dispatch(setEvents({}));
                XHR(dispatch, '/connect', {...user});
            }}
            source={styleByTime(require('../assets/refresh (black).png'), require('../assets/refresh (white).png'), mode)}
        />);

        const SearchImage = (<HeaderImage
            onPress={() => {
                const currentRoute = navigation.getState().routes[navigation.getState().index].name;
                if (currentRoute !== 'Search') navigation.navigate('Search');
                else navigation.goBack();
            }}
            source={styleByTime(require('../assets/search (black).png'), require('../assets/search (white).png'), mode)}
        />);

        return {
            title: "",
            headerStyle: styles(mode).headerStyle,
            headerLeft: () => i18n.language == 'en' ? MenuImage :
                <View style={styles(mode).inputContainer}>{SearchImage} {RefreshImage}</View>,
            headerRight: () => i18n.language == 'he' ? MenuImage :
                <View style={styles(mode).inputContainer}>{SearchImage} {RefreshImage}</View>
        };
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
                name={"Search"} component={SearchScreen} options={({navigation}) => headerOptions(navigation)}
            />
        </Stack.Navigator>
    );
};
