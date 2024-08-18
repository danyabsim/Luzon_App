import {DrawerContainer} from "../components/DrawerContainer/DrawerContainer";
import {AppNavigator} from "./AppNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useTranslation} from "react-i18next";

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
    const {i18n} = useTranslation();

    return (
        <Drawer.Navigator
            initialRouteName="App"
            screenOptions={{
                drawerPosition: i18n.language == 'en' ? 'left' : 'right',
                swipeEdgeWidth: 100,
            }}
            drawerContent={({navigation}) => {
                return <DrawerContainer navigation={navigation}/>;
            }}
        >
            <Drawer.Screen options={{headerShown: false}} name="App" component={AppNavigator}/>
        </Drawer.Navigator>
    );
};