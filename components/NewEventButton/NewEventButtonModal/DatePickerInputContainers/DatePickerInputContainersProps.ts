import {Dispatch, SetStateAction} from "react";

export interface DatePickerInputContainersProps {
    timeContainers: {label: string, state: string | Date, setState: Dispatch<SetStateAction<string | Date>>}[];
}