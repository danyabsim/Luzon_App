import {styleByTime} from "../../utils/AppStyles";// @ts-ignore
import {Theme} from "react-native-calendars";

export function calendarTheme(mode: 'dark' | 'light'): Theme {
    return {
        calendarBackground: styleByTime('white', 'black', mode),// @ts-ignore
        reservationsBackgroundColor: styleByTime('#f2F4f5', 'black', mode),
        agendaKnobColor: styleByTime('#f2F4f5', 'white', mode),
        selectedDayBackgroundColor: styleByTime('#00adf5', 'white', mode),
        selectedDayTextColor: styleByTime('white', 'black', mode),
        todayTextColor: '#00adf5',
        dayTextColor: styleByTime('#2d4150', 'white', mode),
        textDisabledColor: styleByTime('#d9e1e8', 'white', mode),
        dotColor: styleByTime('#00adf5', 'white', mode),
        indicatorColor: styleByTime('blue', 'white', mode),
        monthTextColor: styleByTime('blue', 'white', mode),
        selectedDotColor: styleByTime('white', 'black', mode),
        agendaDayTextColor: styleByTime('#7A92A5', 'white', mode),
        agendaDayNumColor: styleByTime('#7A92A5', 'white', mode),
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
        todayButtonFontWeight: '300'
    }
}