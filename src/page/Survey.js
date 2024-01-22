import React from 'react';
import { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
const SliderComponent = ({ onSkip, onNext, onPrev, onDone }) => {
    const swiperRef = useRef(null);
  
    const handleSkip = () => {
      if (swiperRef.current) {
        swiperRef.current.scrollBy(2); // Skip to the last slide
      }
    };
  
    return (
      <View style={styles.wrapper}>
        <Swiper
          ref={swiperRef}
          style={styles.wrapper}
          showsButtons={true}
          loop={false}
          nextButton={<Text style={styles.buttonText}>Next</Text>}
          prevButton={<Text style={styles.buttonText}>Prev</Text>}
        >
          <View style={styles.slide}>
            <Text style={styles.text}>Slide 1</Text>
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>Slide 2</Text>
          </View>
          <View style={styles.slide}>
            <Text style={styles.text}>Slide 3</Text>
            <TouchableOpacity onPress={onDone}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Swiper>
      </View>
    );
  };
  
export const Survey = ({ navigation }) => {
  const handleSkip = () => {
    // Handle skip logic
  };

  const handleNext = () => {
    // Handle next logic
  };

  const handlePrev = () => {
    // Handle previous logic
  };

  const handleDone = () => {
    // Handle done logic
  };

  return (
    <View style={styles.container}>
      <SliderComponent onSkip={handleSkip} onNext={handleNext} onPrev={handlePrev} onDone={handleDone} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});