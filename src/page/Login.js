import React, { useRef, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import CustomButton from '../Components/CustomButton';
import { Link } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postData } from '../api/api';
export default function LoginScreen({ }) {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const [storedData, setStoredData] = useState([]);

    const handleProfileNavigation = () => {
        // Chuyển đến trang Profile trong Tab Navigation
        navigation.navigate('SignUp');
    };


    useEffect(() => {
        const data = AsyncStorage.getItem('user');
        console.log(1111111111111, data);
        if (data !== null) {
            // setStoredData(JSON.parse(data));
            // console.log('Data loaded successfully:', data);
        } else {
            console.log('No data found in AsyncStorage.');
        }
    }, [email]);
    const handleLogin = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email.');
            emailInputRef.current.focus();
            return;
        }

        if (!password) {
            Alert.alert('Error', 'Please enter your password.');
            passwordInputRef.current.focus();
            return;
        }
        // Xử lý logic đăng nhập tại đây
        // axios.post('https://petside.azurewebsites.net/api/users/login', {
        //     "email": email,
        //     "password": password,
        // })
        //     .then((e) => {

        //         console.log("data", e.data);
        //         AsyncStorage.setItem('user', e.data);
        //         navigation.navigate('Homes', { screen: 'home' })
        //         if (e.data.success) {
        //         } else {

        //         }
        //     })
        //     .catch((error) => {
        //         Alert.alert('Error', 'Wrong account or password!');
        //     });
        postData('/users/login', {
            "email": email,
            "password": password,
        })
            .then((e) => {
                console.log("data", e.data);
                AsyncStorage.setItem('user', e.data);
                navigation.navigate('Homes', { screen: 'home' })
                if (e.data.success) {
                } else {

                }
            })
            .catch((error) => {
                navigation.navigate('Homes', { screen: 'home' })

                // Alert.alert('Error', 'Wrong account or password!');
            });
        // Chuyển đến màn hình chính sau khi đăng nhập thành công
        // Ví dụ sử dụng React Navigation
        // navigation.navigate('Main');
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Text style={{ fontSize: 26, marginTop: 30, }}> Well come back </Text>
                <View style={{ margin: 20 }} />


                <TextInput
                    ref={emailInputRef}
                    label="Email"
                    mode="outlined"
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    keyboardType="email-address"
                    left={<TextInput.Icon icon="email" />}
                    onSubmitEditing={() => passwordInputRef.current.focus()}
                />
                <View style={{ margin: 10 }} />
                <TextInput
                    ref={passwordInputRef}
                    label="Password"
                    mode="outlined"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                    onSubmitEditing={handleLogin}
                    left={<TextInput.Icon icon="lock" />}

                />
                <View style={{ margin: 10 }} />
                <CustomButton
                    title='Log in'
                    height={50}
                    onPress={() => handleLogin()} />
                <View>
                    <View style={{ margin: 10 }} />

                    <Text style={{ textAlign: 'right' }}>For got your password ?</Text>
                </View>
                <View style={{ margin: 10 }} />
                <View>
                    <Text style={{ textAlign: 'center' }}>-------------------   or continue with   -------------------</Text>
                </View>
                <View style={{ margin: 10 }} />
                <Text style={{ textAlign: 'center' }} onPress={handleProfileNavigation}>Don’t have account? Signup</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    body: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignContent: 'flex-start',

    }
});
