import levenshtein from 'js-levenshtein';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import React, {useEffect, useState} from "react";
import {FlatList, Text, TextInput, View} from "react-native";
import {styles} from "./styles";
import {useTranslation} from "react-i18next";
import {parseEventString} from "../../utils/AppConverts";
import {CalendarItem} from "../../components/CalendarItem/CalendarItem";

export function SearchScreen() {
    const [bestEvents, setBestEvents] = useState<{ group: string, name: string, height: number, day: string }[]>();
    const [searchInput, setSearchInput] = useState('');
    const events = useSelector((state: RootState) => state.events.events);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t} = useTranslation();

    useEffect(() => {
        if (!searchInput || !events) return;

        const calculateBestMatches = () => {
            const flattenedItems = Object.entries(events).flatMap(([group, entries]) =>
                entries.map(entry => ({
                    ...entry,
                    group,
                }))
            );

            const searchInputLower = searchInput.toLowerCase();
            const searchLength = searchInputLower.length;

            const matches = flattenedItems
                .map(item => {
                    const parsedTitle = parseEventString(item.name.split('\0')[0]).title.toLowerCase();
                    let minDistance = Infinity;

                    // Iterate over all possible substrings of the same length as searchInput
                    for (let i = 0; i < parsedTitle.length; i++) {
                        const substring = parsedTitle.substring(i, Math.min(i + searchLength, parsedTitle.length));
                        const distance = levenshtein(searchInputLower, substring);
                        minDistance = Math.min(minDistance, distance);
                    }

                    const parsedNotes = (item.name.split('\0')[1]).toLowerCase();
                    // Iterate over all possible substrings of the same length as searchInput
                    for (let i = 0; i < parsedNotes.length; i++) {
                        const substring = parsedNotes.substring(i, Math.min(i + searchLength, parsedNotes.length));
                        const distance = levenshtein(searchInputLower, substring);
                        minDistance = Math.min(minDistance, distance);
                    }

                    return {item, distance: minDistance};
                })
                .filter(result => result.distance < Math.min(searchInputLower.length, 3)) // Filter out items that have no match
                .sort((a, b) => a.distance - b.distance); // Sort by distance ascending

            setBestEvents(matches.map(match => match.item)); // Set the best matches
        };

        calculateBestMatches();
    }, [searchInput, events]);

    return (
        <View style={styles(mode).container}>
            <TextInput
                placeholder={t('Search')} value={searchInput} onChangeText={setSearchInput}
                style={[styles(mode).modalText, styles(mode).input]}
            />
            {searchInput !== '' && bestEvents && bestEvents.length === 0 && <Text>{t('NoResult')}</Text>}
            {searchInput !== '' && bestEvents && bestEvents.length > 0 && (
                <FlatList
                    data={bestEvents}
                    keyExtractor={(item, index) => `${item.group}-${index}`}
                    renderItem={({item}) => (
                        <View style={styles(mode).resultItem}>
                            <CalendarItem item={item} areActionsOn={true}/>
                        </View>
                    )}
                />
            )}
        </View>
    );
}