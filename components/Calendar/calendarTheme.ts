import {styleByTime} from "../../constants/AppStyles";// @ts-ignore
import {Theme} from "react-native-calendars";

export function calendarTheme(mode: 'dark' | 'light' | 'auto'): Theme {
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




export function calendarTheme2(mode: 'dark' | 'light' | 'auto'): Theme {
    return styleByTime({
        calendarBackground: 'white',// @ts-ignore
        reservationsBackgroundColor: '#f2F4f5',
        agendaKnobColor: '#f2F4f5',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: 'white',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        indicatorColor: 'blue',
        monthTextColor: 'blue',
        selectedDotColor: 'white',
        agendaDayTextColor: '#7A92A5',
        agendaDayNumColor: '#7A92A5',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
        todayButtonFontWeight: '300'
    },{
        calendarBackground: 'black',// @ts-ignore
        reservationsBackgroundColor: 'black',
        agendaKnobColor: 'white',
        selectedDayBackgroundColor: 'white',
        selectedDayTextColor: 'black',
        todayTextColor: '#00adf5',
        dayTextColor: 'white',
        textDisabledColor: 'white',
        dotColor: 'white',
        indicatorColor: 'white',
        monthTextColor: 'white',
        selectedDotColor: 'black',
        agendaDayTextColor: 'white',
        agendaDayNumColor: 'white',
        textDayFontWeight: '300',
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '300',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16,
        todayButtonFontWeight: '300'
    }, mode);
}
