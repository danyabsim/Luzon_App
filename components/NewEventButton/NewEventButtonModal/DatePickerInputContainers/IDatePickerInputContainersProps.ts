import {Dispatch, SetStateAction} from "react";

export interface IDatePickerInputContainersProps {
    timeContainers: {label: string, state: string | Date, setState: Dispatch<SetStateAction<string | Date>>}[];
    isEnabled: boolean;
}