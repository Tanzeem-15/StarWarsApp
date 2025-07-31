import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlanetListItem({ planet }) {
    const pop = planet.population === 'unknown' ? 0 : parseInt(planet.population, 10);
    const fontSize = 14 + Math.log10(pop || 1) * 4;
    return (
        <View style={styles.item}>
            <Text style={[styles.name, { fontSize }]}>{planet.name}</Text>
            <Text style={styles.pop}>
                {planet.population === 'unknown'
                    ? 'Population: unknown'
                    : `Population: ${pop.toLocaleString()}`}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 12,
        borderBottomWidth: 1
    },
    name: {
        fontWeight: 'bold'
    },
    pop: {
        marginTop: 4
    }
});
