import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {useEffect, useRef} from 'react';
import {Platform} from 'react-native';
import Constants from 'expo-constants';
import {useDispatch} from 'react-redux';
import {setToken} from '../redux/User/userSlice';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function NotificationNetwork() {
    const dispatch = useDispatch();
    const notificationListener = useRef<Notifications.Subscription | null>(null);
    const responseListener = useRef<Notifications.Subscription | null>(null);

    useEffect(() => {
        async function registerForPushNotificationsAsync() {
            let token: string;

            try {
                if (Platform.OS === 'android') {
                    await Notifications.setNotificationChannelAsync('default', {
                        name: 'default',
                        importance: Notifications.AndroidImportance.DEFAULT,
                    });
                }

                if (Device.isDevice) {
                    const {status: existingStatus} = await Notifications.getPermissionsAsync();
                    let finalStatus = existingStatus;
                    if (existingStatus !== 'granted') {
                        const {status} = await Notifications.requestPermissionsAsync();
                        finalStatus = status;
                    }

                    if (finalStatus !== 'granted') {
                        //Alert.alert('Failed to get push token for push notification!');
                        return;
                    }

                    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
                    if (!projectId) {
                        //Alert.alert('Project ID not found');
                        return;
                    }

                    token = (await Notifications.getExpoPushTokenAsync({projectId})).data;
                    console.log(token);
                } else {
                    //Alert.alert('Must use physical device for Push Notifications');
                }
            } catch (error) {
                console.error(error);
                //Alert.alert('An error occurred while getting the push token');
            }

            return token;
        }

        registerForPushNotificationsAsync().then(token => {
            if (token) {
                dispatch(setToken(token));
            }
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            console.log(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(notificationListener.current);
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(responseListener.current);
            }
        };
    }, [dispatch]);

    return null;
}