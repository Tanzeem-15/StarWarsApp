import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/authSlice';

export default function LoginForm({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.auth);

    const handleSubmit = () => {
        dispatch(login({ username: username.trim(), password: password.trim() }))
            .unwrap()
            .then(() => navigation.replace('Search'))
            .catch(() => { });
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Character Name"
                placeholderTextColor={"grey"}
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Birth Year"
                placeholderTextColor={"grey"}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            {status === 'loading'
                ? <ActivityIndicator />
                : <Button title="Login" onPress={handleSubmit} />
            }
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        marginVertical: 8,
        padding: 8,
        color:"black"
    },
    error: {
        color: 'red',
        marginTop: 8
    }
});
