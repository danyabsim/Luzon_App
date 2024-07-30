import {ImageSourcePropType} from "react-native";

export interface IUserReduceState {
    username: string,
    password: string,
    image: ImageSourcePropType,
    isAdmin: boolean,
    token: string
}