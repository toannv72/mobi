import { StyleSheet, View, Text } from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import ComBar from '../Components/Bar';
import { useState } from 'react';

export default function HomeScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    return (

        <View style={styles.home} >
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />

        </View>
    );
}


const styles = StyleSheet.create({
    home: {
        fontSize: "10px",
        paddingTop: 28,
        paddingHorizontal: 18,
    },
});