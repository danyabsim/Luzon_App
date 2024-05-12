import {DrawerContainer} from "../components/DrawerContainer/DrawerContainer";
import {AppNavigator} from "./AppNavigator";
import {createDrawerNavigator} from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

export const DrawerStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="App"
            drawerContent={({navigation}) => {
                return <DrawerContainer navigation={navigation}/>;
            }}
        >
            <Drawer.Screen options={{headerShown: false}} name="App" component={AppNavigator}/>
        </Drawer.Navigator>
    );
};