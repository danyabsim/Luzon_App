import {UnknownAction} from "@reduxjs/toolkit";
import {Dispatch} from "react";
import {setEvents, setUsernames} from "../redux/Events/eventsSlice";
import {setIsAdmin} from "../redux/User/userSlice";

export async function XHR(dispatch: Dispatch<UnknownAction>, urlFunction: string, itemToSend: any, extraCode?: () => void) {
    const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'http://localhost:3000' + urlFunction); // to run only on the computer
    xhr.open('POST', 'http://192.168.187.215:3000' + urlFunction); // to run with the phone and the computer.
    // The final version will have the ip address of the AWS server which is not running yet...
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                if (urlFunction === '/connect') {
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
                } else if (urlFunction === '/getAllUserNames') {
                    dispatch(setUsernames(response));
                }
            } else {
                console.error('Error sending message:', xhr.statusText);
            }
        }
    };
    xhr.send(JSON.stringify(itemToSend));
}