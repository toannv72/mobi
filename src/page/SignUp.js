import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Card, MD3Colors, ProgressBar, Text, TextInput, TouchableRipple } from 'react-native-paper';
import CustomButton from '../Components/CustomButton';

export default function SingUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 26 }}> Well come back</Text>
            <View style={{ margin: 20 }} />

            <TextInput
                label="Full name"
                onChangeText={(text) => setEmail(text)}
                value={email}
                mode="outlined"
                left={<TextInput.Icon icon="account" />}
            />

            <View style={{ margin: 10 }} />
            <TextInput
                label="Email"
                mode="outlined"
                onChangeText={(text) => setEmail(text)}
                value={email}
                left={<TextInput.Icon icon="phone" />}
            />
            <View style={{ margin: 10 }} />
            <TextInput
                label="Email"
                mode="outlined"
                onChangeText={(text) => setEmail(text)}
                value={email}
                left={<TextInput.Icon icon="gmail" />}
            />
            <View style={{ margin: 10 }} />
            <TextInput
                label="Password"
                mode="outlined"
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry
                left={<TextInput.Icon icon="key" />}
            />

            <View style={{ margin: 10 }} />
            <CustomButton
                title='  Sign up'
                height={50}
                onPress={() => navigation.navigate('IntroSlider')} />


            <View>
                <View style={{ margin: 10 }} />

                <Text style={{ textAlign: 'right' }}>For got your password ?</Text>
            </View>
            <View style={{ margin: 10 }} />
            <View>
                <Text style={{ textAlign: 'center' }}>-------------------   or continue with   -------------------</Text>
            </View>
            <View style={{ margin: 10 }} />

            <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('Login')}>Don’t have account? Signup</Text>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: 'center',
        padding: 16,
    },
});
