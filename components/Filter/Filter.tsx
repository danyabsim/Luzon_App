import React, {useRef, useState} from 'react';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {setFilteredOption} from "../../redux/Events/eventsSlice";
import {RootState} from "../../redux/store";
import {XHRRequest} from "../../utils/XHR";
import {FilterProps} from "./FilterProps";
import {useTranslation} from "react-i18next";

export default function Filter({isMenuOpen, setMenuOpen}: FilterProps) {
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
        XHRRequest(dispatch, '/getAllUserNames', {});
    }, []);

    return (
        <View style={styles(mode).container}>
            <Text style={styles(mode).menuText}>{t('SelectCalendar')}:</Text>
            <TouchableOpacity
                onPress={() => setMenuOpen(!isMenuOpen)}
                style={[styles(mode).menuButton, {width: buttonWidth}]}
                ref={buttonRef}
            >
                <Text style={styles(mode).menuText}>{selectedOption ? selectedOption.label : t('All')}</Text>
            </TouchableOpacity>
            {isMenuOpen && (
                <View
                    style={[
                        styles(mode).menuContainer,
                        {
                            top: buttonRef.current ? (buttonRef.current.offsetTop + buttonRef.current.offsetHeight || 0) : 0,
                            width: buttonWidth || 0, // Ensure buttonWidth is defined
                        },
                    ]}
                >
                    <FlatList
                        data={options}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles(mode).optionItem}
                                onPress={() => {
                                    setSelectedOption(item);
                                    dispatch(setFilteredOption(item.label));
                                    setMenuOpen(false);
                                }}
                            >
                                <Text style={styles(mode).menuText}>{item.label}</Text>
                            </TouchableOpacity>
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