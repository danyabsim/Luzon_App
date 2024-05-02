export function styleByTime(daySetting: string, nightSetting: string): string {
    const currentHour = new Date().getHours();
    return (currentHour > 18 && currentHour < 6) ? nightSetting : daySetting;
}