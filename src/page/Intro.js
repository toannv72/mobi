
import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ImageBackground } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

export const IntroSlider = ({ navigation }) => {
    const [showSlider, setShowSlider] = useState(true);


    const slides = [
        {
            key: '1',
            title: 'Discover clinics nearby',
            text: 'Browse your profile, photo, and descriptions to find clinics that match your cites',
            image: require('../../assets/1.jpg'),
            backgroundColor: '#59b2ab',
        },
        {
            key: '2',
            title: 'Back',
            text: 'Description for the second slide goes here.',
            image: require('../../assets/2.jpg'),
            backgroundColor: '#febe29',
        },
        {
            key: '3',
            title: 'Next',
            text: 'Description for the third slide goes here.',
            image: require('../../assets/3.jpg'),
            backgroundColor: '#22bcb5',
        },
    ];

    const renderSlide = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={item.image}
                >
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.text}</Text>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const handleDone = () => {
        // Handle logic when the user completes the intro
        setShowSlider(false);
    };

    const handleSkip = () => {
        // Handle logic when the user decides to skip the intro
        setShowSlider(false);
    };
    const renderPagination = (activeIndex) => (
        <View style={styles.paginationContainer}>
            <Text style={styles.paginationText}>{activeIndex + 1} / {slides.length}</Text>
        </View>
    );
    return (
        <View style={styles.introContainer}>
            {showSlider ? (
                <AppIntroSlider
                    data={slides}
                    renderItem={renderSlide}
                    onDone={handleDone}
                    showSkipButton={true}
                    onSkip={handleSkip}
                    showPrevButton={true}
                    renderPagination={renderPagination}
                />
            ) : (
                <View>
                    <Text>I am intro component</Text>
                </View>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    introContainer: {
        flex: 1,
    },
    slide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginHorizontal: 16,
        marginBottom: 16,
        color: 'white',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    textContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 60,
        flex: 1, // Added to make the container take full height of the image
    },
    paginationContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
});