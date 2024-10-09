import {styles} from "./styles";
import {Alert, Text, View} from "react-native";
import React, {useState} from "react";
import {ICalendarItemProps} from "./ICalendarItemProps";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {useTranslation} from "react-i18next";
import {CalendarItemActions} from "./CalendarItemActions/CalendarItemActions";
import {setEvents} from "../../redux/Events/eventsSlice";
import {XHR} from "../../utils/XHR";
import {SureDeleteModal} from "./SureDeleteModal/SureDeleteModal";
import {EventModal} from "../EventModal/EventModal";

export function CalendarItem({item, areActionsOn}: ICalendarItemProps) {
    const [sureModalVisible, setSureModalVisible] = useState(false);
    const [eventModalVisible, setEventModalVisible] = useState(false);
    const dispatch = useDispatch();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const user = useSelector((state: RootState) => state.user);
    const {t} = useTranslation();

    return (
        <View>
            <View style={styles(mode).item}>
                {areActionsOn ?
                    <CalendarItemActions item={item} onDeleteItem={() => setSureModalVisible(true)}
                                         onEditItem={() => setEventModalVisible(true)}/>
                    :
                    <CalendarItemActions item={item}/>
                }
                <Text style={styles(mode).itemText}>{item.name.split('\0')[0]}</Text>
                <Text style={styles(mode).itemText}>{t('Notes')}: {item.name.split('\0')[1]}</Text>
            </View>
            {areActionsOn &&
                <View>
                    <SureDeleteModal
                        visible={sureModalVisible} setVisible={setSureModalVisible} item={item}
                        onRequestCloseModal={() => {
                            Alert.alert(t('ModalClosed'));
                            setSureModalVisible(false);
                        }}
                        onPressNo={() => setSureModalVisible(false)}
                        onPressYes={async () => {
                            dispatch(setEvents({}));
                            await XHR(dispatch, '/removeEvent', {...item});
                            await XHR(dispatch, '/connect', {...user});
                            setSureModalVisible(false);
                        }}
                    />
                    <EventModal modalVisible={eventModalVisible} setModalVisible={setEventModalVisible} item={item}/>
                </View>
            }
        </View>
    );
}