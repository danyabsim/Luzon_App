import {Platform} from "react-native";

export function styleByTime(daySetting: string, nightSetting: string): string {
    const currentHour = new Date().getHours();
    return (currentHour > 18 && currentHour < 6) ? nightSetting : daySetting;
}

export function styleByOS() {
    return (Platform.OS === "ios" || Platform.OS === "android");
}

export function formatDateAndTime(dateString: Date | string) {
    let dateObj: Date;
    if (dateString.toString().includes('GMT')) {
        // Format: "Mon May 29 2024 12:00:00 GMT+0300"
        dateObj = new Date(dateString);
    } else {
        // Format: "2024-05-01 12:00"
        const [datePart, timePart] = dateString.toString().split(' ');
        const [year, month, day] = datePart.split('-');
        const [hours, minutes] = timePart.split(':');
        dateObj = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
    }

    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return { date: formattedDate, time: formattedTime };
}

export function getDatesBetween(startDate: string, endDate: string) {
    let dates = [];
    let currentDate = new Date(startDate);
    const end = new Date(endDate);

    if (currentDate > end) return null;

    while (currentDate <= end) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}

export const hexToRgbInt = (hex) => {
    // Remove '#' if present
    hex = hex.replace(/^#/, '');

    // Parse hexadecimal values for each color component
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    // Combine components into a single integer
    return (red << 16) | (green << 8) | blue;
};

export const rgbIntToHex = (rgbInt) => {
    // Extract individual color components
    const red = (rgbInt >> 16) & 255;
    const green = (rgbInt >> 8) & 255;
    const blue = rgbInt & 255;

    // Convert each component to hexadecimal and concatenate
    return `#${(red << 16 | green << 8 | blue).toString(16).padStart(6, '0')}`;
};