import {Dispatch, SetStateAction} from "react";

export interface ColorPickerInputContainersProps {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
}