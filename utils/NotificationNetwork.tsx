import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {useEffect, useRef} from "react";
import {Platform} from "react-native";
import Constants from "expo-constants";
import {setToken} from "../redux/User/userSlice";
import {useDispatch} from "react-redux";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function NotificationNetwork() {
    const dispatch = useDispatch();
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        async function registerForPushNotificationsAsync() {
            let token;

            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.DEFAULT,
                });
            }

            if (Device.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Failed to get push token for push notification!');
                    return;
                }

                try {
                    const projectId =
                        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
                    if (!projectId) alert('Project ID not found');
                    token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
                    console.log(token);
                } catch (e) {
                    token = `${e}`;
                }
            } else alert('Must use physical device for Push Notifications');

            return token;
        }
        registerForPushNotificationsAsync().then(token => token && dispatch(setToken(token)));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);
}