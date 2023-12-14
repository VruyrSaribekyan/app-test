import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    const { isLoggedIn } = useAuth();

    return (
        <Stack.Navigator initialRouteName={isLoggedIn() ? 'Home' : 'Login'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
};

export default AuthStack;
