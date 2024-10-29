import {Dispatch, SetStateAction} from "react";

export interface IPasswordCheckProps {
    password: string;
    setPassedCheck: Dispatch<SetStateAction<boolean>>;
}