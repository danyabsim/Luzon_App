import {Dispatch, SetStateAction} from "react";

export interface IAllDayOptionSwitchProps {
    isEnabled: boolean;
    setIsEnabled:  Dispatch<SetStateAction<boolean>>;
}