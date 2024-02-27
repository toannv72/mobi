import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import Swiper from 'react-native-swiper';
import { SelectList } from 'react-native-dropdown-select-list'
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { firebaseImg } from '../api/firebaseImg';
import { postData } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Slide1 = ({ name, handleChoosePhoto, image, setName,dob, setDob}) => {
  const [selectedDate, setSelectedDate] = useState(dob);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setSelectedDate(selectedDate);
      setDob(selectedDate); // Update the parent component's state with the selected date
    }
  };
  const displayDatePicker = () => {
    setShowDatePicker(true);
  };
  return (
    <View style={styles.slide}>
      <ScrollView contentContainerStyle={{ marginTop: 50 }}>
        <View>
          <Text style={{ fontSize: 32 }}>Help us understand you by answering few questions</Text>
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
            style={styles.textInputStyle}
            value={name}
            onChangeText={setName}
            maxLength={20}
          />
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
                    value={selectedDate ? selectedDate.toDateString() : ""}
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
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
              </View>

              <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
};

const Slide2 = ({ species, setSpecies, gender, setGender, weight, setWeight, handleDone }) => {
  const speciesData = [
    { key: '1', value: 'Mobiles' },
    { key: '2', value: 'Appliances' },
    { key: '3', value: 'Cameras' },
    { key: '4', value: 'Computers' },
    { key: '5', value: 'Vegetables' },
    { key: '6', value: 'Diary Products' },
    { key: '7', value: 'Drinks' },
  ];

  return (
    <View style={styles.slide}>
      <ScrollView contentContainerStyle={{ marginTop: 50 }}>
        <View>
          <Text style={{ fontSize: 32 }}>Help us understand you by answering few questions</Text>
        </View>
        <View>
          <Text style={styles.quizText}>Select your pet species</Text>
          <SelectList
            setSelected={(val) => setSpecies(val)}
            data={speciesData}
            save="value"
          />
        </View>
        <View>
          <Text style={styles.quizText}>Choose gender of your pet</Text>
          <View style={{ flexDirection: 'row', gap: 50, alignItems: 'center', marginLeft: 50 }}>
            <Button
              style={gender === true ? styles.optionhightlight : styles.option}
              onPress={() => setGender(true)}
            >
              <Text style={{ color: gender === true ? '#F6F6F6' : 'black' }}>Male</Text>
            </Button>
            <Button
              style={gender === false ? styles.optionhightlight : styles.option}
              onPress={() => setGender(false)}
            >
              <Text style={{ color: gender === false ? '#F6F6F6' : 'black' }}>Female</Text>
            </Button>
          </View>
        </View>
        <View>
          <Text style={styles.quizText}>What your pet's weight</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter pet weight (numbers only)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            maxLength={2}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export const Survey = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [species, setPetspecies] = useState("");
  const [gender, setgender] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [petAvatar, setPetAvatar] = useState(null);
  const [weight, setweight] = useState('');
  const [dob, setDob] = useState("2000-2-1T20:35:52.184Z");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const nameInputRef = useRef(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getStoredUserId();
  }, []);

  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");
      if (data !== null) {
        const userData = JSON.parse(data);
        const id = userData[0].id;
        setUserId(userData[0].data.data.id)
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

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
  console.log(name);
  console.log(dob);
  console.log(species);
  console.log(gender);
  console.log(weight);
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
    <View style={styles.container}>
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
        <Slide1
          handleChoosePhoto={handleChoosePhoto}
          image={image}
          setName={setName}
          setDob={setDob}
          showDatePicker={showDatePicker}
        />
        <Slide2
          species={species}
          setSpecies={setPetspecies}
          gender={gender}
          setGender={setgender}
          weight={weight}
          setWeight={setweight}
          handleDone={handleDone}
        />
      </Swiper>
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









