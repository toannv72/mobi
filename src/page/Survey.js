import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import Swiper from 'react-native-swiper';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { firebaseImg } from '../api/firebaseImg';

import axios from 'axios';
import { postData } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Survey = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [species, setPetspecies] = React.useState("");
  const [gender, setgender] = useState("");
  const [image, setImage] = useState(null);
  const [hasExperience, setHasExperience] = useState("");
  const [name, setName] = useState("");
  const [petAvatar, setPetAvatar] = useState(null);
  const [weight, setweight] = useState('');
  const [dob, setDob] = useState("2000-2-1T20:35:52.184Z");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const nameInputRef = useRef(null);
  const speciesInputRef = useRef("Select option");
  const birthDateInputRef = useRef(null);
  const genderInputRef = useRef(null);
  const weightInputRef = useRef(null);
  const [userData, setUserData] = useState({});
  const [userId, setUserId] = useState(null);



  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");

      if (data !== null) {
        const userData = JSON.parse(data);
        const id = userData[0].id;
        // Cập nhật trạng thái userData
        setUserId(userData[0].data.data.id)
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    // Gọi hàm getStoredUserId khi component được tạo ra
    getStoredUserId();
  }, []);

  const handleDone = () => {
    if (!name) {
      Alert.alert("Error", "Please enter your pet name.");
      nameInputRef.current;
      return;
    }

    postData(`pets/CreatePet/${userId}`, {
      "name": name,
      "species": species,
      "imagePet": petAvatar,
      "birthDate": dob,
      "gender": gender ? 1 : 0,
      "weight": weight
    })
      .then((e) => {
        console.log(e.data);

        navigation.navigate('Homes')

      })
      .catch((e) => {
        console.log(e);

      })

  }

  const SliderComponent = () => {

    const onNameChanged = useCallback((text) => {
      let newName = '';
      let allowedCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ ';
      for (let i = 0; i < text.length; i++) {
        if (allowedCharacters.indexOf(text[i]) > -1) {
          newName = newName + text[i];
        } else {
          // Your callback function
          Alert.alert('Error', 'Please enter letters only');
        }
      }
      setName(newName);
    }, []); // empty dependency array since there are no external dependencies

    const speciesData = [
      { key: '1', value: 'Mobiles' },
      { key: '2', value: 'Appliances' },
      { key: '3', value: 'Cameras' },
      { key: '4', value: 'Computers' },
      { key: '5', value: 'Vegetables' },
      { key: '6', value: 'Diary Products' },
      { key: '7', value: 'Drinks' },
    ]

    const displayDatePicker = () => {
      setShowDatePicker(true);
    };
    const handleDateChange = (event, selectedDate) => {
      const currentDate = selectedDate || dob;
      setShowDatePicker(false);
      setDob(currentDate);
    };
    console.log(hasExperience);
    console.log(name);
    console.log(image);
    console.log(gender);
    console.log(weight);
    console.log(species);
    console.log(dob);
    const onweightChanged = (text) => {
      let newWeight = '';
      let numbers = '0123456789';

      for (let i = 0; i < text.length; i++) {
        if (numbers.indexOf(text[i]) > -1) {
          newWeight = newWeight + text[i];
        } else {
          // Your callback function
          Alert.alert('Error', 'Please enter numbers only');
        }
      }

      setweight(newWeight);
    };

    const handleChoosePhoto = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 4],
        quality: 1,
      });
      setImage(result.assets[0].uri);
      if (!result.canceled) {
        // Upload image to Firebase Storage
        // gọi thằng firebaseImg để đẩy ảnh lên xong rồi lấy đường dẫn của ảnh đó 
        const response = await firebaseImg(result);
        setPetAvatar(response)
      }
    };
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
                <View style={styles.container}>
                  <TouchableOpacity onPress={handleChoosePhoto}>
                    {image ?
                      <Image source={{ uri: image }} style={styles.image} />
                      :
                      <Image source={require('../../assets/ImgInput.jpg')} style={styles.image} />
                    }
                  </TouchableOpacity>
                  {!image && (
                    <Button title="Choose Photo" onPress={handleChoosePhoto} />
                  )}
                </View>
              </View>
              <View>
                <Text style={styles.quizText}>What your pet's name</Text>
                <TextInput
                  placeholder='Dongo'
                  style={styles.textInputStyle}
                  underlineColor="transparent"
                  value={name}
                  onChangeText={onNameChanged}
                  maxLength={20}
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
                <Text style={styles.quizText}>Select your pet species</Text>
                <SelectList
                  setSelected={(val) => setPetspecies(val)}
                  data={speciesData}
                  save="value"
                />
              </View>
              <View>
                <Text style={styles.quizText}>Choose gender of your pet</Text>
              </View>
              <View style={{ flexDirection: 'row', gap: 50, alignItems: 'center', marginLeft: 50 }}>
                <Button
                  style={gender === true ? styles.optionhightlight : styles.option}
                  onPress={() => setgender(true)}
                >
                  <Text style={{ color: gender === true ? '#F6F6F6' : 'black' }}>Male</Text>
                </Button>
                <Button
                  style={gender === false ? styles.optionhightlight : styles.option}
                  onPress={() => setgender(false)}
                >
                  <Text style={{ color: gender === false ? '#F6F6F6' : 'black' }}>Female</Text>
                </Button>
              </View>
              <View>
                <Text style={styles.quizText}>What your pet's weight</Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10 }}
                  placeholder="Enter pet weight (numbers only)"
                  onChangeText={onweightChanged}
                  value={weight}
                  keyboardType="numeric"
                  maxLength={2}
                />
              </View>
              <View style={{ height: 150 }}></View>

            </ScrollView>
            <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
              <Text style={{
                color: 'black',
                fontSize: 20,
                fontWeight: 'bold',
              }}>Done</Text>
            </TouchableOpacity>
          </View>
          {/* ..............................................................................................................
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

          </View> */}


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
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  }
});









