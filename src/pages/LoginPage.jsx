import React from 'react';
import LoginForm from '../components/LoginForm';
import { View } from 'react-native';
import LoginHeader from '../components/LoginHeader';

export default function LoginPage({ navigation }) {
    return (
        <View style={{ flex: 1 }}>
            <LoginHeader />
            <LoginForm navigation={navigation} />
        </View>
    );
}
