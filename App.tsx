import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import {NavigationContainer} from "@react-navigation/native";
import {AppNavigator} from "./navigation/AppNavigation";
import { enableScreens } from "react-native-screens";

export default function App() {
    enableScreens();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppNavigator/>
            </NavigationContainer>
        </Provider>
    );
}