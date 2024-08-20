import {Dispatch, SetStateAction} from "react";

export interface ITextInputContainersProps {
    inputContainers: {label: string, state: string, setState: Dispatch<SetStateAction<string>>}[];
    timeContainers: {label: string, state: string | Date, setState: Dispatch<SetStateAction<string | Date>>}[];
}