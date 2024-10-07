import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {setFilteredOption} from "../../redux/Events/eventsSlice";
import {RootState} from "../../redux/store";
import {XHR} from "../../utils/XHR";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {FilterModal} from "./FilterModal/FilterModal";

export default function Filter() {
    const [selectedOption, setSelectedOption] = useState<string>();
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const dispatch = useDispatch();
    const {t} = useTranslation();

    const buttonWidth = Dimensions.get('window').width * 0.4; // Adjust the percentage as needed
    const mode = useSelector((state: RootState) => state.theme.mode);

    useEffect(() => {
        XHR(dispatch, '/getAllUserNames', {});
    }, []);

    const handleSelect = (item: string) => {
        setSelectedOption(item);
        dispatch(setFilteredOption(item));
        setFilterModalVisible(false);
    };

    return (
        <View>
            <View style={styles(mode).container}>
                <Text style={styles(mode).menuText}>{t('SelectCalendar')}:</Text>
                <ButtonApp onPress={() => setFilterModalVisible(true)}
                           label={selectedOption ? selectedOption : t('All')}
                           buttonStyle={[styles(mode).menuButton, {width: buttonWidth}, styles(mode).elliptical]}
                           labelStyle={styles(mode).menuText}/>
            </View>
            <FilterModal selectedOption={selectedOption} setSelectedOption={setSelectedOption}
                         modalVisible={filterModalVisible} setModalVisible={setFilterModalVisible}/>
        </View>
    );
}