import {IUserReduceState} from "../redux/User/IUserReduceState";
import {AgendaEntry} from "react-native-calendars";
import {UnknownAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {setEvents} from "../redux/Events/eventsSlice";
import {setIsAdmin} from "../redux/User/userSlice";

export function XHRRequest(dispatch: Dispatch<UnknownAction>/*, setEvents: ActionCreatorWithPayload<any, "events/setEvents">*/, urlFunction: string, itemToSend: IUserReduceState & AgendaEntry, extraCode?: () => void) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000' + urlFunction);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                const {isAdmin, userHistory} = response;
                dispatch(setIsAdmin(isAdmin));
                // Ensure that response is an array
                if (Array.isArray(userHistory)) {
                    const eventsByDay = {};
                    // Organize events by day
                    userHistory.forEach(event => {
                        if (!eventsByDay[event.day]) eventsByDay[event.day] = [];
                        eventsByDay[event.day].push(event);
                    });
                    // Sort events within each day by their name
                    for (const day in eventsByDay) eventsByDay[day].sort((a, b) => a.name.localeCompare(b.name));
                    dispatch(setEvents(eventsByDay));
                    if (extraCode) extraCode();
                } else {
                    console.error('Invalid response format: expected an array.');
                }
            } else {
                console.error('Error sending message:', xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(itemToSend));
}