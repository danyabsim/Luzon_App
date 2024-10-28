import {useCallback, useState} from "react";
import {BottomNavigation} from "react-native-paper";
import {SearchScreen} from "../Search/SearchScreen";
import CalendarScreen from "../Calendar/CalendarScreen";
import {useFocusEffect} from "@react-navigation/native";
import {BackHandler} from "react-native";
import {styleByTime} from "../../utils/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";

export default function LandingScreen() {
    const [index, setIndex] = useState(0);
    const mode = useSelector((state: RootState) => state.theme.mode);

    const [routes] = useState([
        {
            key: 'Calendar',
            title: 'Calendar',
            icon: styleByTime(require('../../assets/search (black).png'), require('../../assets/search (white).png'), mode)
        },
        {
            key: 'Search',
            title: 'Search',
            icon: styleByTime(require('../../assets/home (black).png'), require('../../assets/home (white).png'), mode)
        },
    ]);

    useFocusEffect(
        useCallback(() => {
            // Handler to disable the back button
            const onBackPress = () => {
                return true; // Returning true disables the default back button behavior
            };

            // Add the event listener when the screen is focused
            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            // Remove the event listener when the screen is unfocused or unmounted
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    return (
        <BottomNavigation
            barStyle={{backgroundColor: 'white'}}
            navigationState={{index, routes}}
            onIndexChange={setIndex}
            renderScene={({route}) => {
                switch (route.key) {
                    case 'Calendar':
                        return <CalendarScreen/>;
                    case 'Search':
                        return <SearchScreen/>;
                }
            }}
        />
    );
}