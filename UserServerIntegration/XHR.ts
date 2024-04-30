import {setEvents} from "../redux/Events/eventsSlice";
import {useDispatch} from "react-redux";
import {IUserReduceState} from "../redux/User/IUserReduceState";
import {AgendaEntry} from "react-native-calendars";
import {UnknownAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";

export function XHRRequest(dispatch: Dispatch<UnknownAction>, urlFunction: string, itemToSend: IUserReduceState | AgendaEntry, extraCode?: () => void) {
    // const dispatch = useDispatch();
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000' + urlFunction);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                // Ensure that response is an array
                if (Array.isArray(response)) {
                    const eventsByDay = {};
                    // Organize events by day
                    response.forEach(event => {
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