import { ButtonGroup } from '@rneui/themed';
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import Swiper from 'react-native-swiper';

export const Survey = ({ navigation }) => {
  const swiperRef = useRef(null);


  const handleSkip = () => {
    navigation.navigate('Homes');
  };

  const handleDone = () => {
    navigation.navigate('Homes');
    // Handle done logic
  };
  const SliderComponent = () => {
    return (
      <View style={styles.wrapper}>
        <Swiper
          ref={swiperRef}
          showsButtons={true}
          loop={false}
          nextButton={<Text style={styles.swiperButton}>Next</Text>}
          prevButton={<Text style={styles.swiperButton}>Prev</Text>}
          buttonWrapperStyle={{ alignItems: 'flex-end', paddingBottom: 30 }}
          paginationStyle={{ bottom: 40 }}
          activeDotStyle={{ backgroundColor: 'white', width: 30 }}
        >
          <View style={styles.slide}>
            <View>
              <Text>Help us understand you by answering few question</Text>
            </View>
            <View>
              <Text>Do you have and experience with pet ?</Text>
              <View>
                <Button>Yes</Button>
                <Button>No</Button>
              </View>
            </View>
            <View>
              <Text>Give some photo of your pet</Text>

            </View>
            <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>Slide 2</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>Slide 3</Text>
            <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Swiper>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SliderComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    position: 'absolute',
    top: "10%",
    padding: 5,
  },
  wrapper: {
    position: 'relative',
    backgroundColor: 'gray',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  skipButton: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 30,
    left: 10,
    padding: 5,

  },
  doneButton: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 30,
    right: 10,
    padding: 5,
  },
  swiperButton: {
    fontSize: 20,
    fontWeight: 'bold',
    bottom: 0,
    padding: 5,
  },
  customButton: {
    borderRadius: 40,
    backgroundColor: 'red',
    width: '30%'
  }
});
