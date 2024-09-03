import levenshtein from 'js-levenshtein';
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import React, {useEffect, useState} from "react";
import {FlatList, Text, TextInput, View} from "react-native";
import {styles} from "./styles";
import {useTranslation} from "react-i18next";
import {StackScreenProps} from "@react-navigation/stack";
import {MainStackParamList} from "../../navigation/MainStackParamList";
import {parseEventString} from "../../utils/AppConverts";

type Props = StackScreenProps<MainStackParamList, 'Search'>;

export function SearchScreen({navigation}: Props) {
    const [bestEvents, setBestEvents] = useState<{ group: string, name: string, height: number, day: string }[]>();
    const [searchInput, setSearchInput] = useState('');
    const events = useSelector((state: RootState) => state.events.events);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const {t, i18n} = useTranslation();

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
                    for (let i = 0; i <= parsedTitle.length - searchLength; i++) {
                        const substring = parsedTitle.substring(i, i + searchLength);
                        if (substring.length !== searchInputLower.length) continue;
                        const distance = levenshtein(searchInputLower, substring);

                        if (distance < minDistance) {
                            minDistance = distance;
                        }
                    }

                    return {
                        item,
                        distance: minDistance,
                    };
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
                placeholder={t('Search')}
                value={searchInput}
                onChangeText={setSearchInput}
                style={[styles(mode).modalText, styles(mode).input]}
            />
            {searchInput !== '' && bestEvents && bestEvents.length === 0 && <Text>{t('NoResult')}</Text>}
            {searchInput !== '' && bestEvents && bestEvents.length > 0 && (
                <FlatList
                    data={bestEvents}
                    keyExtractor={(item, index) => `${item.group}-${index}`}
                    renderItem={({item}) => (
                        <View style={styles(mode).resultItem}>
                            <Text style={styles(mode).itemText}>{item.name}</Text>
                            <Text style={styles(mode).itemText}>{item.day}</Text>
                            <Text style={styles(mode).itemText}>{item.height}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}