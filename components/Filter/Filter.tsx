import React, {useRef, useState} from 'react';
import {Dimensions, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {setFilteredOption} from "../../redux/Events/eventsSlice";
import {RootState} from "../../redux/store";
import {XHRRequest} from "../../UserServerIntegration/XHR";

export default function Filter() {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const buttonRef = useRef(null);
    const dispatch = useDispatch();
    const usernames = useSelector((state: RootState) => state.filter.usernames);
    const options = usernames.map((user, index) => ({ id: index + 2, label: user }));
    options.unshift({ id: 0, label: 'All' }, { id: 1, label: 'None' });

    const buttonWidth = Dimensions.get('window').width * 0.4; // Adjust the percentage as needed

    React.useEffect(() => {
        XHRRequest(dispatch, '/getAllUserNames', {});
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.menuText}>Select Calendar:</Text>
            <TouchableOpacity onPress={() => setMenuOpen(!isMenuOpen)} style={[styles.menuButton, {width: buttonWidth}]}
                              ref={buttonRef}>
                <Text style={styles.menuText}>{selectedOption ? selectedOption.label : 'All'}</Text>
            </TouchableOpacity>
            {isMenuOpen && (
                <View
                    style={[
                        styles.menuContainer,
                        {
                            top: buttonRef.current ? buttonRef.current.offsetTop + buttonRef.current.offsetHeight : 0,
                            width: buttonWidth,
                        },
                    ]}
                >
                    <ScrollView style={styles.optionList} contentContainerStyle={styles.optionListContent}>
                        {options.map((option) => (
                            <TouchableOpacity
                                key={option.id} style={styles.optionItem}
                                onPress={() => {
                                    setSelectedOption(option);
                                    dispatch(setFilteredOption(option.label));
                                    setMenuOpen(false);
                                }}>
                                <Text style={styles.menuText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            )}
        </View>
    );
}