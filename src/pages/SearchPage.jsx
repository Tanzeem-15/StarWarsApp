// src/pages/SearchPage.js
import React, { useEffect } from 'react';
import {
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
    StyleSheet
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlanets, setQuery } from '../store/planetsSlice';
import PlanetListItem from '../components/PlanetListItem';

export default function SearchPage() {
    const dispatch = useDispatch();
    const { list, next, status, query } = useSelector(state => state.planets);

    useEffect(() => {
        dispatch(loadPlanets({ query, nextUrl: query === '' ? 'https://swapi.py4e.com/api/planets/' : undefined }));
    }, [query]);

    const handleSearch = text => {
        dispatch(setQuery(text));
    };

    const loadMore = () => {
        if (next && status !== 'loading') {
            dispatch(loadPlanets({ nextUrl: next }));
        }
    };

    const renderFooter = () =>
        status === 'loading'
            ? <ActivityIndicator style={styles.loader} />
            : null;

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search planets..."
                placeholderTextColor={"grey"}
                value={query}
                onChangeText={handleSearch}
                style={styles.input}
            />

            <FlatList
                data={list}
                keyExtractor={(item, index) => item.name + index}
                renderItem={({ item }) => <PlanetListItem planet={item} />}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginBottom: 12,
        color: 'black'
    },
    loader: {
        marginVertical: 16
    }
});
