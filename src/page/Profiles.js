import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text, TextInput } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {
    const [storedData, setStoredData] = useState([]);
    let json = [{ key: '1', name: '2' }]

    useEffect(() => {
        // Load stored data when the component mounts
        loadStoredData();
    }, []);

    const saveData = () => {
        try {
            // Save data to AsyncStorage
            AsyncStorage.setItem('@myKey', JSON.stringify(json));
            console.log('Data saved successfully!');
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const loadStoredData = async () => {
        try {
            // Load data from AsyncStorage
            const data = await AsyncStorage.getItem('@myKey');
            console.log(data);
            if (data !== null) {
                setStoredData(JSON.parse(data));
                console.log('Data loaded successfully:', data);
            } else {
                console.log('No data found in AsyncStorage.');
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const clearData = () => {
        try {
            // Clear data from AsyncStorage
            AsyncStorage.removeItem('@myKey');
            console.log('Data cleared successfully!');
            setStoredData('');
        } catch (error) {
            console.error('Error clearing data:', error);
        }
    };


    return (
        <View style={styles.container}>


            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{
                    flexDirection: 'row', paddingBottom: 10
                }}>
                    <Card containerStyle={{
                        borderRadius: 15,
                        borderColor: '#8C8EA3',
                        shadowRadius: 4,
                        padding: 10,
                        height: 80,
                        width: 80,

                    }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>Sun</Card.Title>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>14</Card.Title>
                        </View>
                    </Card>
                    <Card containerStyle={{
                        borderRadius: 15,
                        borderColor: '#8C8EA3',
                        shadowRadius: 4,
                        padding: 10,
                        height: 80,
                        width: 80,

                    }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>Sun</Card.Title>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>14</Card.Title>
                        </View>
                    </Card>
                    <Card containerStyle={{
                        borderRadius: 15,
                        borderColor: '#8C8EA3',
                        shadowRadius: 4,
                        padding: 10,
                        height: 80,
                        width: 80,

                    }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>Sun</Card.Title>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>14</Card.Title>
                        </View>
                    </Card>
                    <Card containerStyle={{
                        borderRadius: 15,
                        borderColor: '#8C8EA3',
                        shadowRadius: 4,
                        padding: 10,
                        height: 80,
                        width: 80,

                    }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>Sun</Card.Title>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>14</Card.Title>
                        </View>
                    </Card>
                    <Card containerStyle={{
                        borderRadius: 15,
                        borderColor: '#8C8EA3',
                        shadowRadius: 4,
                        padding: 10,
                        height: 80,
                        width: 80,

                    }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>Sun</Card.Title>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>14</Card.Title>
                        </View>
                    </Card>
                    <Card containerStyle={{
                        borderRadius: 15,
                        borderColor: '#8C8EA3',
                        shadowRadius: 4,
                        padding: 10,
                        height: 80,
                        width: 80,

                    }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>Sun</Card.Title>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>14</Card.Title>
                        </View>
                    </Card>
                    <Card containerStyle={{
                        borderRadius: 15,
                        borderColor: '#8C8EA3',
                        shadowRadius: 4,
                        padding: 10,
                        height: 80,
                        width: 80,

                    }}>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>Sun</Card.Title>
                            <Card.Title style={{ fontSize: 20, color: '#000' }}>14</Card.Title>
                        </View>
                    </Card>
                </View>
            </ScrollView>
            <Text style={{ textAlign: 'center' }} onPress={() => navigation.navigate('Profile')}>bấm vô đây111</Text>
            <View>
                <Text>Stored Data: {storedData[0]?.name || "null"}</Text>
                <Button mode="contained" onPress={saveData}>
                    Save Data
                </Button>
                <Button mode="contained" onPress={loadStoredData}>
                    loadStoredData
                </Button>
                <Button mode="contained" onPress={clearData}>
                    clearData
                </Button>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {

        justifyContent: 'center',
        padding: 16,
    },
});
