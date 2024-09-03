import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';
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
    const [model, setModel] = useState<use.UniversalSentenceEncoder>();

    useEffect(() => {
        // Load the Universal Sentence Encoder model
        use.load().then(setModel);
    }, []);

    useEffect(() => {
        if (!model || searchInput === '') return;

        const calculateBestMatches = async () => {
            const flattenedItems = Object.entries(events).flatMap(([group, entries]) =>
                entries.map(entry => ({
                    ...entry,
                    group,
                }))
            );

            // Get the embeddings for the search input and all items in one batch
            const searchEmbedding = (await model.embed([searchInput])).arraySync()[0];
            const titles = flattenedItems.map(item => parseEventString(item.name.split('\0')[0]).title);
            const itemEmbeddings = (await model.embed(titles)).arraySync();

            const searchTensor = tf.tensor1d(searchEmbedding);

            // Calculate similarity for each item
            const matches = itemEmbeddings.map((embedding, index) => {
                const itemTensor = tf.tensor1d(embedding);

                const dotProduct = tf.dot(searchTensor, itemTensor);
                const normSearch = searchTensor.norm();
                const normItem = itemTensor.norm();
                const similarity = dotProduct.div(normSearch.mul(normItem)).dataSync()[0];

                return {
                    item: flattenedItems[index],
                    similarity,
                };
            });

            const bestMatches = matches.filter(result => result.similarity >= 0.3)
                .sort((a, b) => b.similarity - a.similarity);

            setBestEvents(bestMatches.map(match => match.item));
        };

        calculateBestMatches();
    }, [searchInput, events, model]);

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