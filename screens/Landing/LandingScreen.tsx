import {useCallback, useMemo, useState} from "react";
import {BottomNavigation} from "react-native-paper";
import {SearchScreen} from "../Search/SearchScreen";
import CalendarScreen from "../Calendar/CalendarScreen";
import {useFocusEffect} from "@react-navigation/native";
import {BackHandler, Image, View} from "react-native";
import {styleByTime} from "../../utils/AppStyles";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";

export default function LandingScreen() {
    const [index, setIndex] = useState(0);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t, i18n} = useTranslation();

    const routes = useMemo(() => [
        {key: 'Calendar', title: t('Calendar')},
        {key: 'Search', title: t('Search')},
    ], [i18n.language]); // Recompute routes when language changes

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => true;
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const getIcon = (routeKey: string, isActive: boolean) => {
        const iconStyle = {width: 24, height: 24, tintColor: isActive ? "#7265e3" : "gray"};
        switch (routeKey) {
            case "Calendar":
                return (
                    <Image
                        source={styleByTime(require('../../assets/calendar (black).png'), require('../../assets/calendar (white).png'), mode)}
                        style={iconStyle}
                    />
                );
            case "Search":
                return (
                    <Image
                        source={styleByTime(require('../../assets/search (black).png'), require('../../assets/search (white).png'), mode)}
                        style={iconStyle}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <BottomNavigation
            barStyle={{backgroundColor: styleByTime("white", "#373737", mode)}}
            activeColor="#7265e3" activeIndicatorStyle={{backgroundColor: "transparent"}}
            inactiveColor={styleByTime("gray", "white", mode)}
            navigationState={{index, routes}} onIndexChange={setIndex}
            renderScene={({route}) => {
                switch (route.key) {
                    case "Calendar":
                        return <CalendarScreen/>;
                    case "Search":
                        return <SearchScreen/>;
                    default:
                        return null;
                }
            }}
            renderIcon={({route}) => (
                <View style={{alignItems: "center"}}>{getIcon(route.key, route.key === routes[index].key)}</View>
            )}
            shifting={false} labeled={true} sceneAnimationEnabled={true}
        />
    );
}