import {TextInput, TouchableOpacity, View} from "react-native";
import {styles} from "./styles";
import {setEvents} from "../../../redux/Events/eventsSlice";
import {XHRRequest} from "../../../utils/XHR";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {INewEventButtonModalProps} from "./INewEventButtonModalProps";
import {ModalApp} from "../../ModalApp/ModalApp";
import {hexToRgbInt} from "../../../constants/AppConverts";
import {formatDateAndTime, getDatesBetween} from "../../../constants/DateFunctions";
import {TimeOutDelay} from "../../../constants/TimeOutDelay";
import {ErrorModalApp} from "../../ErrorModalApp/ErrorModalApp";
import {useTranslation} from "react-i18next";
import {DatePickerInputContainers} from "./DatePickerInputContainers/DatePickerInputContainers";
import {ColorPickerModal} from "./ColorPickerModal/ColorPickerModal";
import {AllDayOptionSwitch} from "./AllDayOptionSwitch/AllDayOptionSwitch";
import {ButtonApp} from "../../ButtonApp/ButtonApp";

export function NewEventButtonModal(props: INewEventButtonModalProps) {
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState<string | Date>(undefined);
    const [endDate, setEndDate] = useState<string | Date>(undefined);
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

    const closeModal = () => {
        setTitle('');
        setColor('');
        setNotes('');
        setStartDate(undefined);
        setEndDate(undefined);
        props.setModalVisible(!props.modalVisible);
    }

    const marginPerLanguage = {
        marginLeft: i18n.language == 'en' ? 20 : 0,
        marginRight: i18n.language == 'he' ? 20 : 0
    };

    const ColorButton = <TouchableOpacity
        onPress={() => setColorPickerModalVisible(true)}
        style={[styles(mode).button, {backgroundColor: color}, marginPerLanguage]}
    />;

    return (
        <ModalApp
            onClose={closeModal} modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}
            children={
                <View>
                    <View style={{alignItems: i18n.language == 'en' ? 'flex-start' : "flex-end"}}>
                        <View style={{flexDirection: 'row'}}>
                            {i18n.language == 'he' && ColorButton}
                            <TextInput placeholder={t('Title')} value={title} onChangeText={setTitle}
                                       style={[styles(mode).modalText, styles(mode).input]}/>
                            {i18n.language == 'en' && ColorButton}
                        </View>
                        <AllDayOptionSwitch isEnabled={isAllDayEnabled} setIsEnabled={setIsAllDayEnabled}/>
                        <DatePickerInputContainers timeContainers={timeContainers} isEnabled={isAllDayEnabled}/>
                        <TextInput placeholder={t('Notes')} multiline={true} value={notes} onChangeText={setNotes}
                                   style={[styles(mode).modalText, styles(mode).input]}/>
                        <View style={[styles(mode).inputContainer, marginPerLanguage]}>
                            <ButtonApp onPress={closeModal} label={t('Cancel')}/>
                            <ButtonApp label={t('Save')} onPress={() => {
                                if (startDate === undefined || endDate === undefined || color === '' || title === '') {
                                    setErrorModalVisible(true);
                                    return;
                                }
                                const startDateAndTime = formatDateAndTime(startDate);
                                const endDateAndTime = formatDateAndTime(endDate);
                                const dates = getDatesBetween(startDateAndTime.date, endDateAndTime.date);
                                const XHRTitle = `${startDateAndTime.date} (${startDateAndTime.time}) – ${endDateAndTime.date} (${endDateAndTime.time}): ${title} (${user.username})\0${notes}`;
                                if (dates !== null) {
                                    dates.map(async (day) => {
                                        dispatch(setEvents({}));
                                        XHRRequest(dispatch, '/addEvent', {
                                            name: XHRTitle,
                                            height: hexToRgbInt(color),
                                            day: formatDateAndTime(day).date
                                        });
                                        await TimeOutDelay(300);
                                        XHRRequest(dispatch, '/connect', {...user});
                                    })
                                    closeModal();
                                }
                            }}/>
                        </View>
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