import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export default function HomeScreen({ navigation }) {

    return (

        <View style={styles.home} >
            <Text>Home123sss2</Text>
            <Button mode="contained" onPress={() => navigation.navigate('Login')}>
                Press me
            </Button>
        </View>
    );
}


const styles = StyleSheet.create({
    home: {
        fontSize: "10px",
    },
});