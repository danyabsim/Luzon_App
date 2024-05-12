import {styleByTime} from "../../constants/AppStyles";// @ts-ignore
import {Theme} from "react-native-calendars";

export const calendarTheme: Theme= {
    calendarBackground: styleByTime('white', 'black'),// @ts-ignore
    reservationsBackgroundColor: styleByTime('#f2F4f5', 'black'),
    agendaKnobColor: styleByTime('#f2F4f5', 'white'),
    selectedDayBackgroundColor: styleByTime('#00adf5', 'white'),
    selectedDayTextColor: styleByTime('white', 'black'),
    todayTextColor: '#00adf5',
    dayTextColor: styleByTime('#2d4150', 'white'),
    textDisabledColor: styleByTime('#d9e1e8', 'white'),
    dotColor: styleByTime('#00adf5', 'white'),
    indicatorColor: styleByTime('blue', 'white'),
    monthTextColor: styleByTime('blue', 'white'),
    selectedDotColor: styleByTime('white', 'black'),
    agendaDayTextColor: styleByTime('#7A92A5', 'white'),
    agendaDayNumColor: styleByTime('#7A92A5', 'white'),
    textDayFontWeight: '300',
    textMonthFontWeight: 'bold',
    textDayHeaderFontWeight: '300',
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
}