import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import Swiper from 'react-native-swiper';
import { SelectList } from 'react-native-dropdown-select-list'
import { Slider, Icon } from '@rneui/themed';
export const Survey = ({ navigation }) => {
  const swiperRef = useRef(null);
  const handleSkip = () => {
    navigation.navigate('Homes');
  };
  const [inputDate, setInputDate] = React.useState(undefined)
  const handleDone = () => {
    navigation.navigate('Homes');
    // Handle done logic
  };
  const SliderComponent = () => {
    const [selected, setSelected] = React.useState("");
    const [value, setValue] = useState(0);
    const selectData = [
      { key: '1', value: 'Mobiles' },
      { key: '2', value: 'Appliances' },
      { key: '3', value: 'Cameras' },
      { key: '4', value: 'Computers' },
      { key: '5', value: 'Vegetables' },
      { key: '6', value: 'Diary Products' },
      { key: '7', value: 'Drinks' },
    ]


    return (
      <View style={styles.wrapper}>
        <Swiper
          ref={swiperRef}
          showsButtons={true}
          showsPagination={true}
          loop={false}
          nextButton={<Text style={styles.swiperButton}>Next</Text>}
          prevButton={<Text style={styles.swiperButton}>Prev</Text>}
          buttonWrapperStyle={{ alignItems: 'flex-end', paddingBottom: 30 }}
          paginationStyle={{ bottom: 40 }}
          activeDotStyle={{ backgroundColor: 'grey', width: 30 }}
        >
          {/* .............................................................................................................. */}
          
            <View style={styles.slide}>
            <ScrollView contentContainerStyle={{justifyContent: 'center', gap: 20, marginTop: 100}}>
              <View>
                <Text style={{ fontSize: 32 }}>Help us understand you by answering few question</Text>
              </View>
              <View>
                <Text style={styles.quizText}>Do you have and experience with pet ?</Text>
                <View style={{ flexDirection: 'row', gap: 50, alignItems: "center" }}>
                  <Button style={styles.customButton}>Yes</Button>
                  <Button style={styles.customButton}>No</Button>
                </View>
              </View>
              <View>
                <Text style={styles.quizText}>Give some photo of your pet</Text>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/ImgInput.jpg')}
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.quizText}>What your pet's name</Text>
                <TextInput
                  placeholder='Dongo'
                  style={styles.textInputStyle}
                  underlineColor="transparent"
                ></TextInput>
              </View>
              <View>
                <Text style={styles.quizText}>What your pet's date of birth</Text>
                <DatePickerInput
                  onChange={(d) => setInputDate(d)}
                  value={inputDate}>
                </DatePickerInput>
              </View>
              </ScrollView>

            </View>
          

          {/* .............................................................................................................. */}
          
            <View style={styles.slide}>
              <View>
                <Text style={{ fontSize: 32 }}>Help us understand you by answering few question</Text>
              </View>
              <View>
                <Text style={styles.quizText}>Select your pet breed</Text>
                <SelectList
                  setSelected={(val) => setSelected(val)}
                  data={selectData}
                  save="value" />
              </View>
              <View>
                <Text style={styles.quizText}>Choose gender of your pet</Text>
                <View style={{ flexDirection: 'row', gap: 50, alignItems: "center" }}>
                  <Button style={styles.customButton}>Male</Button>
                  <Button style={styles.customButton}>Female</Button>
                </View>
              </View>
              <View>
                <Slider
                  value={value}
                  onValueChange={setValue}
                  maximumValue={2}
                  minimumValue={0}
                  step={1}
                  allowTouchTrack
                  trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                  thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                  thumbProps={{
                    children: (
                      <Icon
                        name="paw"
                        type="font-awesome"
                        size={15}
                        reverse
                        containerStyle={{ bottom: 20, right: 20 }}
                        color="#f50"
                      />
                    ),
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', gap: 70, justifyContent: 'center' }}>
                <Text>Up to 4 moth</Text>
                <Text>Up to a year</Text>
                <Text>More than a year</Text>
              </View>
              <View>
                <Text style={styles.quizText}>What your pet's weight</Text>
                <TextInput
                  style={styles.textInputStyle}
                  underlineColor="transparent"
                ></TextInput>
              </View>

            </View>
          
          {/* .............................................................................................................. */}         
            <View style={styles.slide}>
              <View>
                <Text style={{ fontSize: 32 }}>Help us understand you by answering few question</Text>
              </View>
              <View>
                <Text style={styles.quizText}>What kind of your pet chracter ?</Text>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                  <Button style={styles.customButton}>Active</Button>
                  <Button style={styles.customButton}>Friendly</Button>
                  <Button style={styles.customButton}>Playful</Button>
                  <Button style={styles.customButton}>Calm</Button>
                </View>
              </View>
              <View>
                <Text style={styles.quizText}>Vaccinated your pet </Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Button style={styles.customButton}>Yes</Button>
                  <Button style={styles.customButton}>No</Button>
                </View>
              </View>
              <View>
                <Text style={styles.quizText}>Pedigree of your pet</Text>
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Button style={styles.customButton}>Yes</Button>
                  <Button style={styles.customButton}>No</Button>
                </View>
              </View>
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
    backgroundColor: 'white',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    
    padding: 15,
    flexDirection: 'column',
    gap: 30
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
    borderWidth: 1,
    borderColor: 'black',
    width: 90,
    height: 40,
    backgroundColor: 'white',

  },
  quizText: {
    fontSize: 18,
    fontWeight: '600'
  },
  textInputStyle: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderRadius: 10
  }
});
