import {Dispatch, SetStateAction} from "react";

export interface IOptionSwitchProps {
    isEnabled: boolean;
    setIsEnabled: Dispatch<SetStateAction<boolean>>;
    label: string;
}