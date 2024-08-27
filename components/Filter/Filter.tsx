import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {setFilteredOption} from "../../redux/Events/eventsSlice";
import {RootState} from "../../redux/store";
import {XHR} from "../../utils/XHR";
import {IFilterProps} from "./IFilterProps";
import {useTranslation} from "react-i18next";
import {OptionItem} from "./OptionItem/OptionItem";
import {ButtonApp} from "../ButtonApp/ButtonApp";

export default function Filter({isMenuOpen, setMenuOpen}: IFilterProps) {
    const [selectedOption, setSelectedOption] = useState(null);
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const usernames = useSelector((state: RootState) => state.filter.usernames);
    const options = usernames.map((user, index) => ({id: index + 2, label: user}));
    options.unshift({id: 0, label: t('All')}, {id: 1, label: t('None')});

    const buttonWidth = Dimensions.get('window').width * 0.4; // Adjust the percentage as needed
    const mode = useSelector((state: RootState) => state.theme.mode);

    React.useEffect(() => {
        XHR(dispatch, '/getAllUserNames', {});
    }, []);

    const handleSelect = (item: { id: number, label: string }) => {
        setSelectedOption(item);
        dispatch(setFilteredOption(item.label));
        setMenuOpen(false);
    };

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).menuText}>{t('SelectCalendar')}:</Text>
            <View ref={buttonRef}>
                <ButtonApp onPress={() => setMenuOpen(!isMenuOpen)}
                           label={selectedOption ? selectedOption.label : t('All')}
                           buttonStyle={[styles(mode).menuButton, {width: buttonWidth}, styles(mode).elliptical]}
                           labelStyle={styles(mode).menuText}/>
            </View>
            {isMenuOpen && (
                <View
                    style={[
                        styles(mode).menuContainer, styles(mode).elliptical,
                        {
                            top: buttonRef.current ? (buttonRef.current.offsetTop + buttonRef.current.offsetHeight || 0) : 0,
                            width: buttonWidth || 0, // Ensure buttonWidth is defined
                        },
                    ]}
                >
                    <FlatList
                        data={options}
                        renderItem={({item}) => (
                            <OptionItem item={item} mode={mode} onSelect={handleSelect}/>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        style={styles(mode).optionList}
                        contentContainerStyle={styles(mode).optionListContent}
                    />
                </View>
            )}
        </View>
    );
}