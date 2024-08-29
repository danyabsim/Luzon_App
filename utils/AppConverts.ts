export function hexToRgbInt(hex: string) {
    // Remove '#' if present
    hex = hex.replace(/^#/, '');

    // Parse hexadecimal values for each color component
    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    // Combine components into a single integer
    return (red << 16) | (green << 8) | blue;
}

export function rgbIntToHex(rgbInt: number) {
    // Extract individual color components
    const red = (rgbInt >> 16) & 255;
    const green = (rgbInt >> 8) & 255;
    const blue = rgbInt & 255;

    // Convert each component to hexadecimal and concatenate
    return `#${(red << 16 | green << 8 | blue).toString(16).padStart(6, '0')}`;
}

export function parseEventString(eventString: string) {
    // Split the input string by ' – ' to get the date range part and the rest
    const [firstPart, secondPart] = eventString.split(' – ');

    // Extract the first date with time
    const firstDateTime = firstPart.replace('(', '').replace(')', '');

    // Separate the second date-time and the rest of the text
    const secondDateTimePart = secondPart.split(': ')[0].replace('(', '').replace(')', '');
    const textAfterColon = secondPart.split(': ').slice(1).join(': ').replace(/\(.*?\)/g, '').trim();

    return {
        startDate: firstDateTime,
        endDate: secondDateTimePart,
        title: textAfterColon
    };
}