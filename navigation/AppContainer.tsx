import {NavigationContainer} from "@react-navigation/native";
import {DrawerStack} from "./DrawerStack";

export const AppContainer = () => {
    return (
        <NavigationContainer>
            <DrawerStack/>
        </NavigationContainer>
    );
};