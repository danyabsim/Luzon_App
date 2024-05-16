import React from 'react';
import {Provider} from "react-redux";
import store from "./redux/store";
import {AppContainer} from "./navigation/AppContainer";
import {enableScreens} from "react-native-screens";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function App() {
    enableScreens();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </GestureHandlerRootView>
    );
}