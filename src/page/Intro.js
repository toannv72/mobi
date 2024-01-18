import React, { useState } from "react";
import {
    Button,
    TextInputs,
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    Dimensions
} from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider'


export const Intro = ({ navigation }) => {
    const [showSlider, setShowSlider] = useState(true);
    const slides = [{
        key: '1',
        title: 'Hello all',
        text: 'Say something cool',
        image: require('./assets/1.png'),
    },
    {
        key: '2',
        title: 'Hello all',
        text: 'Say something cool 2',
        image: require('./assets/2.png'),
    },
    {
        key: '3',
        title: 'Hello all',
        text: 'Say something cool 3',
        image: require('./assets/3.png'),
    }];
    const renderSlide = ({ item }) => {
        return <View style={styles.slide}>
            <Text>{item.title}</Text>
            <Image style={styles.imageStyle} source={item.image} />
            <Text style={styles.imageText}>{item.text}</Text>
        </View>
    }
    return (
        <ScrollView>
            <View style={styles.introContainer}>
                {
                    showSlider ? <AppIntroSlider
                        data={slides}
                        renderItem={renderSlide} /> : <View><Text> I am home component</Text></View>

                }
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    introContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slide: {
        backgroundColor: 'white',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    imageText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginTop: 30,
    }
});
