import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Button1 from '../Button';

export default function ProfileScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const windowWidth = Dimensions.get('window').width;

    return (
        <View style={styles.container}>
            <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('SingUp')}>bấm vô đây</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        padding: 16,
    },
});
