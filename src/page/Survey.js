import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import Swiper from 'react-native-swiper';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { firebaseImg } from '../api/firebaseImg';
export const Survey = ({ navigation }) => {
  const swiperRef = useRef(null);
<<<<<<< HEAD
  const [inputDate, setInputDate] = React.useState("")
  const [selectedValue, setSelectedValue] = useState(0);
  const [selected, setSelected] = React.useState("");
  const [petName, setPetName] = React.useState("");
  const [petWeight, setPetWeight] = React.useState("");
  const [screenCompletetion, setScreenCompletetion] = React.useState(false, false, false);
  const selectData = [
    { key: '1', selectedValue: 'Mobiles' },
    { key: '2', selectedValue: 'Appliances' },
    { key: '3', selectedValue: 'Cameras' },
    { key: '4', selectedValue: 'Computers' },
    { key: '5', selectedValue: 'Vegetables' },
    { key: '6', selectedValue: 'Diary Products' },
    { key: '7', selectedValue: 'Drinks' },
  ]
=======
>>>>>>> 181dfa1221df6a72606cd08bab231011bb5a8ddb
  const handleDone = () => {
    navigation.navigate('Homes');
    // Handle done logic
  };
  const handleNextButtonPress = () => {
    const currentScreenComplete = checkCurrentScreenComplete();
    if ()
  }
  const SliderComponent = () => {
<<<<<<< HEAD
=======
    const [hasExperience, setHasExperience] = useState(null);
    const [selected, setSelected] = React.useState("");
    const selectData = [
      { key: '1', value: 'Mobiles' },
      { key: '2', value: 'Appliances' },
      { key: '3', value: 'Cameras' },
      { key: '4', value: 'Computers' },
      { key: '5', value: 'Vegetables' },
      { key: '6', value: 'Diary Products' },
      { key: '7', value: 'Drinks' },
    ]
    const [dob, setDob] = useState("2000-2-1T20:35:52.184Z");
    console.log(dob)
    const [showDatePicker, setShowDatePicker] = useState(false);
    const displayDatePicker = () => {
      setShowDatePicker(true);
    };

    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || dob;
      setShowDatePicker(false);
      setDob(currentDate);
    };
    const [petAvatar,setPetAvatar] = useState(null);
    console.log(dob);
    const handleChoosePhoto = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });


      if (!result.canceled) {
        const response = await firebaseImg(result)
        setPetAvatar(response);
      }

    };
>>>>>>> 181dfa1221df6a72606cd08bab231011bb5a8ddb
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
            <ScrollView
              contentContainerStyle={{ marginTop: 50 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View>
                <Text style={{ fontSize: 32 }}>Help us understand you by answering few question</Text>
              </View>
              <View>
                <Text style={styles.quizText}>Do you have and experience with pet ?</Text>
                <View style={{ flexDirection: 'row', gap: 50, alignItems: 'center', marginLeft: 50 }}>
              <Button
                style={hasExperience === true ? styles.optionhightlight : styles.option}
                onPress={() => setHasExperience(true)}
              >
                <Text style={{ color: hasExperience === true ? '#F6F6F6' : 'black' }}>Yes</Text>
              </Button>
              <Button
                style={hasExperience === false ? styles.optionhightlight : styles.option}
                onPress={() => setHasExperience(false)}
              >
                <Text style={{ color: hasExperience === false ? '#F6F6F6' : 'black' }}>No</Text>
              </Button>
            </View>
              </View>
              <View>
                <Text style={styles.quizText}>Give some photo of your pet</Text>
                <TouchableOpacity
                  onPress={handleChoosePhoto}>
                  {petAvatar ? (
                    <Image 
                    // source={{ uri: petAvatar?.assets ? petAvatar.assets[0].uri: 'https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b' }}
                    style = {styles.image}/>
                  ):(
                  <Image
                    source={require('../../assets/ImgInput.jpg')}
                    style={styles.image}

                  />
                  )}
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
                <TouchableOpacity onPress={displayDatePicker}>
                  <TextInput
                    mode="outlined"
                    style={{
                      ...styles.input,
                      backgroundColor: "#E9E7E7",
                    }}
                    onFocus={displayDatePicker}
                    value={dob ? new Date(new Date(dob).getTime() - 7 * 60 * 60 * 1000).toLocaleDateString() : ""}
                    placeholder="Select date..."
                    placeholderTextColor="#24252B"
                    editable={false}
                    left={
                      <TextInput.Icon
                        icon="calendar"
                        size={35}
                        style={{ marginTop: 5 }}
                      />
                    }
                  />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={dob ? new Date(new Date(dob).getTime() - 7 * 60 * 60 * 1000) : new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <View style={{ height: 100 }}></View>
            </ScrollView>

          </View>


          {/* .............................................................................................................. */}
          <View style={styles.slide}>
            <ScrollView contentContainerStyle={{ marginTop: 50 }}>
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
              </View>
              <View style={{ flexDirection: 'row', gap: 40, justifyContent: 'center', padding: 20 }}>
                <Text style={styles.buttonText}>Up to 4 moth</Text>
                <Text style={styles.buttonText}>Up to a year</Text>
                <Text style={styles.buttonText}>More than a year</Text>
              </View>
              <View>
                <Text style={styles.quizText}>What your pet's weight</Text>
                <TextInput
                  style={styles.textInputStyle}
                  underlineColor="transparent"
                ></TextInput>
              </View>
              <View style={{ height: 150 }}></View>

            </ScrollView>
          </View>
          {/* .............................................................................................................. */}
          <View style={styles.slide}>

            <View>
              <Text style={{ fontSize: 32 }}>Help us understand you by answering few question</Text>
            </View>
            <View>
              <Text style={styles.quizText}>What kind of your pet chracter ?</Text>
              <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                <TouchableOpacity style={styles.customButton}>
                  <Text style={styles.buttonText}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton}>
                  <Text style={styles.buttonText}>Friendly</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton}>
                  <Text style={styles.buttonText}>Playful</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton}>
                  <Text style={styles.buttonText}>Calm</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.quizText}>Vaccinated your pet </Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={styles.customButton}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.quizText}>Pedigree of your pet</Text>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <TouchableOpacity style={styles.customButton}>
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.customButton}>
                  <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
              <Text style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}>Done</Text>
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
    justifyContent: 'center',
    alignItems: 'center',

  },
  quizText: {
    fontSize: 18,
    fontWeight: '600',
    padding: 10,
  },
  textInputStyle: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    borderRadius: 10
  },
  optionhightlight: {
    borderWidth: 2,
    borderColor: '#8C8EA3',
    backgroundColor: '#8C8EA3',

  },
  option: {
    borderWidth: 2,
    borderColor: '#8C8EA3',

  },
});
