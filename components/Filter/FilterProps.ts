import {Dispatch, SetStateAction} from "react";

export interface FilterProps {
    isMenuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}