import {View} from "react-native";
import {styles} from "./styles";
import {setEvents} from "../../../redux/Events/eventsSlice";
import {XHRRequest} from "../../../utils/XHR";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../redux/store";
import {NewEventButtonModalProps} from "./NewEventButtonModalProps";
import {TextInputContainers} from "../../TextInputContainers/TextInputContainers";
import {DatePickerInputContainers} from "./DatePickerInputContainers/DatePickerInputContainers";
import {ColorPickerInputContainers} from "./ColorPickerInputContainers/ColorPickerInputContainers";
import {CancelButton} from "./CancelButton/CancelButton";
import {SaveButton} from "./SaveButton/SaveButton";
import {ModalApp} from "../../ModalApp/ModalApp";
import {hexToRgbInt} from "../../../constants/AppConverts";
import {formatDateAndTime, getDatesBetween} from "../../../constants/DateFunctions";
import {TimeOutDelay} from "../../../constants/TimeOutDelay";
import {ErrorModalApp} from "../../ErrorModalApp/ErrorModalApp";
import {useTranslation} from "react-i18next";

export function NewEventButtonModal(props: NewEventButtonModalProps) {
    const [title, setTitle] = React.useState("");
    const [startDate, setStartDate] = React.useState<string | Date>(undefined);
    const [endDate, setEndDate] = React.useState<string | Date>(undefined);
    const [notes, setNotes] = React.useState('');
    const [color, setColor] = React.useState('');
    const [isErrorModalVisible, setErrorModalVisible] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    const {t} = useTranslation();

    const inputContainers = [
        {label: t('Title'), state: title, setState: setTitle}, {label: t('Notes'), state: notes, setState: setNotes},
    ];
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

    return (
        <ModalApp onClose={closeModal} modalVisible={props.modalVisible} setModalVisible={props.setModalVisible}
                  children={
                      <View>
                          <TextInputContainers inputContainers={inputContainers} timeContainers={timeContainers}/>
                          <DatePickerInputContainers timeContainers={timeContainers}/>
                          <ColorPickerInputContainers color={color} setColor={setColor}/>
                          <View style={styles.inputContainer}>
                              <CancelButton closeModal={closeModal}/>
                              <SaveButton onPress={() => {
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
                          <ErrorModalApp modalVisible={isErrorModalVisible} setModalVisible={setErrorModalVisible}
                                         errorText={t('IncompleteFields')}/>
                      </View>
                  }/>
    );
}