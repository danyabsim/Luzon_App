export interface IOptionItemsProps {
    valueList: string[];
    labelList: string[];
    value: string;
    changeValue: (item: string) => void;
}