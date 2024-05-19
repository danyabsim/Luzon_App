export function formatDateAndTime(dateString: Date | string) {
    let dateObj: Date;
    if (dateString.toString().includes('GMT')) {
        // Format: "Mon May 29 2024 12:00:00 GMT+0300"
        dateObj = new Date(dateString);
    } else {
        // Format: "2024-05-29 12:00"
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