import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import {setEvents} from "../../../redux/Events/eventsSlice";
import {XHR} from "../../../utils/XHR";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {INewEventButtonModalProps} from "./INewEventButtonModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {hexToRgbInt} from "../../../utils/AppConverts";
import {formatDateAndTime, getDatesBetween} from "../../../utils/DateFunctions";
import {TimeOutDelay} from "../../../utils/TimeOutDelay";
import {ErrorModalApp} from "../../ErrorModalApp/ErrorModalApp";
import {useTranslation} from "react-i18next";
import {DatePickerInputContainers} from "./DatePickerInputContainers/DatePickerInputContainers";
import {ColorPickerModal} from "./ColorPickerModal/ColorPickerModal";
import {AllDayOptionSwitch} from "./AllDayOptionSwitch/AllDayOptionSwitch";
import {ButtonApp} from "../../ButtonApp/ButtonApp";
import {styleByOS} from "../../../utils/AppStyles";

export function NewEventButtonModal(props: INewEventButtonModalProps) {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState<Date>(undefined);
    const [endDate, setEndDate] = useState<Date>(undefined);
    const [notes, setNotes] = useState('');
    const [color, setColor] = useState('');
    const [isErrorModalVisible, setErrorModalVisible] = useState(false);
    const [isColorPickerModalVisible, setColorPickerModalVisible] = useState(false);
    const [isAllDayEnabled, setIsAllDayEnabled] = useState(false);
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
        setTitle('');
        setColor('');
        setNotes('');
        setStartDate(undefined);
        setEndDate(undefined);
        setTextualStartDate('');
        setTextualEndDate('');
        props.setModalVisible(!props.modalVisible);
    }

    const marginPerLanguage = {
        marginLeft: i18n.language == 'he' ? 20 : 0,
        marginRight: i18n.language == 'en' ? 20 : 0
    };

    const ColorButton = <TouchableOpacity
        onPress={() => setColorPickerModalVisible(true)}
        style={[styles(mode).button, {backgroundColor: color}]}
    />;

    return (
        <ModalApp
            onClose={closeModal} modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}
            children={
                <View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles(mode).title}>{t('AddNewEvent')}</Text>
                        <View style={[styles(mode).inputContainer]}>
                            {i18n.language == 'he' && ColorButton}
                            <TextInput placeholder={t('Title')} value={title} onChangeText={setTitle}
                                       style={[styles(mode).modalText, styles(mode).input, marginPerLanguage]}/>
                            {i18n.language == 'en' && ColorButton}
                        </View>
                        {!styleByOS() &&
                            <View>
                                <TextInput placeholder={t('StartDate')} value={textualStartDate}
                                           onChangeText={setTextualStartDate}
                                           style={[styles(mode).modalText, styles(mode).input, marginPerLanguage]}/>
                                <TextInput placeholder={t('EndDate')} value={textualEndDate}
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
                        <ButtonApp label={t('Save')} onPress={() => {
                            if ((startDate === undefined && textualStartDate === '') || (endDate === undefined && textualEndDate === '') || color === '' || title === '') {
                                setErrorModalVisible(true);
                                return;
                            }
                            const startDateAndTime = formatDateAndTime(textualStartDate === '' ? startDate : textualStartDate);
                            const endDateAndTime = formatDateAndTime(textualEndDate === '' ? endDate : textualEndDate);
                            const dates = getDatesBetween(startDateAndTime.date, endDateAndTime.date);
                            const XHRTitle = `${startDateAndTime.date} (${startDateAndTime.time}) – ${endDateAndTime.date} (${endDateAndTime.time}): ${title} (${user.username})\0${notes}`;
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