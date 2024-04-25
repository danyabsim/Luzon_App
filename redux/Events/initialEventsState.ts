import {IEventsReducerState} from "./IEventsReducerState";

export const initialEventsState: IEventsReducerState = {
    events: {},
    selected: new Date().toISOString().split('T')[0]
};