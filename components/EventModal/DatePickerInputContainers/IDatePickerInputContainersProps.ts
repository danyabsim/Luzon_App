import {Dispatch, SetStateAction} from "react";

export interface IDatePickerInputContainersProps {
    timeContainers: {label: string, state: Date, setState: Dispatch<SetStateAction<Date>>}[];
    isEnabled: boolean;
}