import {IEventsReducerState} from "./IEventsReducerState";

export const initialEventsState: IEventsReducerState = {
    events: {},
    selected: '2024-04-28' //new Date().toISOString().split('T')[0]
};