import {Dispatch, SetStateAction} from "react";

export interface IFilterProps {
    isMenuOpen: boolean;
    setMenuOpen: Dispatch<SetStateAction<boolean>>;
}