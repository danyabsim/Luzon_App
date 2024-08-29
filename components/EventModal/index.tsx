import {Pressable, Text, TextInput, View} from "react-native";
import {styles} from "./styles";
import {setEvents} from "../../redux/Events/eventsSlice";
import {XHR} from "../../utils/XHR";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {IEventModalProps} from "./IEventModalProps";
import {ModalApp} from "../ModalApp";
import {hexToRgbInt, parseEventString, rgbIntToHex} from "../../utils/AppConverts";
import {formatDateAndTime, getDatesBetween} from "../../utils/DateFunctions";
import {TimeOutDelay} from "../../utils/TimeOutDelay";
import {ErrorModalApp} from "../ErrorModalApp";
import {useTranslation} from "react-i18next";
import {DatePickerInputContainers} from "./DatePickerInputContainers";
import {ColorPickerModal} from "./ColorPickerModal";
import {AllDayOptionSwitch} from "./AllDayOptionSwitch";
import {ButtonApp} from "../ButtonApp";
import {styleByOS} from "../../utils/AppStyles";

export function EventModal(props: IEventModalProps) {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState<Date>(undefined);
    const [endDate, setEndDate] = useState<Date>(undefined);
    const [notes, setNotes] = useState('');
    const [color, setColor] = useState('');
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [isColorPickerModalVisible, setColorPickerModalVisible] = useState(false);
    const [isAllDayEnabled, setIsAllDayEnabled] = useState(false);
    const [itemUsername, setItemUserName] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t, i18n} = useTranslation();

    const timeContainers = [
        {label: t('StartDate'), state: startDate, setState: setStartDate},
        {label: t('EndDate'), state: endDate, setState: setEndDate},
    ];

    const [textualStartDate, setTextualStartDate] = useState('');
    const [textualEndDate, setTextualEndDate] = useState('');

    const closeModal = () => {
        props.setModalVisible(!props.modalVisible);
        if (props.item !== undefined) return;
        setTitle('');
        setColor('');
        setNotes('');
        setStartDate(undefined);
        setEndDate(undefined);
        setTextualStartDate('');
        setTextualEndDate('');
    }

    const marginPerLanguage = {
        marginLeft: i18n.language == 'he' ? 20 : 0,
        marginRight: i18n.language == 'en' ? 20 : 0
    };

    const ColorButton = <Pressable
        onPress={() => setColorPickerModalVisible(true)}
        style={[styles(mode).button, {backgroundColor: color}]}
    />;

    useEffect(() => {
        if (props.item === undefined) return;
        const result = parseEventString(props.item.name.split('\0')[0]);
        setTitle(result.title);
        setStartDate(new Date(result.startDate));
        setEndDate(new Date(result.endDate));
        setTextualStartDate(result.startDate);
        setTextualEndDate(result.endDate);
        setItemUserName(result.username);
        setColor(rgbIntToHex(props.item.height));
        setNotes(props.item.name.split('\0')[1]);
    }, [props.item]);

    return (
        <ModalApp
            onClose={closeModal} modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}
            children={
                <View>
                    <View style={{alignItems: 'center'}}>
                        <View style={[styles(mode).inputContainer]}>
                            {i18n.language == 'he' && ColorButton}
                            <Text
                                style={[styles(mode).title, marginPerLanguage]}>{props.item ? t('EditEvent') : t('AddNewEvent')}</Text>
                            {i18n.language == 'en' && ColorButton}
                        </View>
                        <TextInput placeholder={t('Title')} value={title} onChangeText={setTitle}
                                   style={[styles(mode).modalText, styles(mode).input, marginPerLanguage]}/>
                        {!styleByOS() &&
                            <View>
                                <TextInput placeholder={t('StartDate').replace(/\n/g, ' ')} value={textualStartDate}
                                           onChangeText={setTextualStartDate}
                                           style={[styles(mode).modalText, styles(mode).input, marginPerLanguage]}/>
                                <TextInput placeholder={t('EndDate').replace(/\n/g, ' ')} value={textualEndDate}
                                           onChangeText={setTextualEndDate}
                                           style={[styles(mode).modalText, styles(mode).input, marginPerLanguage]}/>
                            </View>
                        }
                        <View style={marginPerLanguage}>
                            <AllDayOptionSwitch isEnabled={isAllDayEnabled} setIsEnabled={setIsAllDayEnabled}/>
                            <DatePickerInputContainers timeContainers={timeContainers} isEnabled={isAllDayEnabled}/>
                        </View>
                        <TextInput placeholder={t('Notes')} multiline={true} value={notes} onChangeText={setNotes}
                                   style={[styles(mode).modalText, styles(mode).input, marginPerLanguage]}/>
                    </View>
                    <View style={[styles(mode).inputContainer]}>
                        <ButtonApp onPress={closeModal} label={t('Cancel')}/>
                        <ButtonApp label={t('Save')} onPress={async () => {
                            if ((startDate === undefined && textualStartDate === '') || (endDate === undefined && textualEndDate === '') || color === '' || title === '') {
                                setErrorModalVisible(true);
                                return;
                            }
                            if (props.item) {
                                XHR(dispatch, '/removeEvent', {...props.item});
                                await TimeOutDelay(300);
                            }
                            const startDateAndTime = formatDateAndTime(textualStartDate === '' ? startDate : textualStartDate);
                            const endDateAndTime = formatDateAndTime(textualEndDate === '' ? endDate : textualEndDate);
                            const dates = getDatesBetween(startDateAndTime.date, endDateAndTime.date);
                            const XHRTitle = `${startDateAndTime.date} (${startDateAndTime.time}) – ${endDateAndTime.date} (${endDateAndTime.time}): ${title} (${props.item === undefined ? user.username : itemUsername})\0${notes}`;
                            if (dates !== null) {
                                dates.map(async (day) => {
                                    dispatch(setEvents({}));
                                    XHR(dispatch, '/addEvent', {
                                        name: XHRTitle,
                                        height: hexToRgbInt(color),
                                        day: formatDateAndTime(day).date
                                    });
                                    await TimeOutDelay(300);
                                    XHR(dispatch, '/connect', {...user});
                                })
                                closeModal();
                            }
                        }}/>
                    </View>
                    <ColorPickerModal color={color} setColor={setColor} modalVisible={isColorPickerModalVisible}
                                      setModalVisible={setColorPickerModalVisible}/>
                    <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                                   errorText={t('IncompleteFields')}/>
                </View>
            }
        />
    );
}