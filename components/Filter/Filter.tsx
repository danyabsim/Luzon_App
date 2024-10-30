import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {XHR} from "../../utils/XHR";
import {useTranslation} from "react-i18next";
import {ButtonApp} from "../ButtonApp/ButtonApp";
import {FilterModal} from "./FilterModal/FilterModal";

export default function Filter() {
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const buttonWidth = Dimensions.get('window').width * 0.4; // Adjust the percentage as needed
    const mode = useSelector((state: RootState) => state.theme.mode);
    const filteredOption = useSelector((state: RootState) => state.events.filteredOption);

    const [filterModalVisible, setFilterModalVisible] = useState(false);

    useEffect(() => {
        const getAllUserNames = async () => {
            await XHR(dispatch, '/getAllUserNames', {});
        }
        getAllUserNames();
    }, []);

    return (
        <View>
            <View style={styles(mode).container}>
                <Text style={styles(mode).menuText}>{t('CurrentCalendar')}:</Text>
                <ButtonApp onPress={() => setFilterModalVisible(true)}
                           label={filteredOption ? filteredOption : t('All')}
                           buttonStyle={[styles(mode).menuButton, {width: buttonWidth}, styles(mode).elliptical]}
                           labelStyle={styles(mode).menuText}/>
            </View>
            <FilterModal modalVisible={filterModalVisible} setModalVisible={setFilterModalVisible}/>
        </View>
    );
}