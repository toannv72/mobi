import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, ScrollView, Alert, ImageBackground } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Swiper from 'react-native-swiper';
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { firebaseImg } from '../api/firebaseImg';
import { getData, postData } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Slide1 = ({ name, handleChoosePhoto, image, setName, dob, setDob, petFeature, setPetFeature, nameInputRef, petFeatureRef }) => {
  const [selectedDate, setSelectedDate] = useState(dob);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Check if the selected date is in the future
      if (selectedDate > new Date()) {
        // Date is in the future, do not set the state
        Alert.alert("Error", "Please enter valid date.");
        return;
      }

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
            <TouchableOpacity
              onPress={handleChoosePhoto}
            >
              {image ?
                <Image source={{ uri: image }} style={styles.image} />
                :
                <Image source={require('../../assets/ImgInput.jpg')} style={styles.image} />
              }
            </TouchableOpacity>

          </View>
        </View>
        <View>
          <Text style={styles.quizText}>What your pet's name</Text>
          <TextInput
            style={styles.textInputStyle}
            value={name}
            onChangeText={setName}
            maxLength={20}
            ref={nameInputRef}
            onSubmitEditing={() => petFeatureRef.current.focus()}
            placeholder="Enter your pet's name"
          />
        </View>
        <View>
          <Text style={styles.quizText}>What your pet's identifying feature</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter pet's identifying feature"
            value={petFeature}
            onChangeText={setPetFeature}
            ref={petFeatureRef}
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

const Slide2 = ({ species, setSpecies, gender, setGender, weight, setWeight, handleDone, height, setHeight, speciesRef, heightInputRef, weightInputRef }) => {

  return (
    <View style={styles.slide}>
      <ScrollView contentContainerStyle={{ marginTop: 50 }}>
        <View>
          <Text style={{ fontSize: 32 }}>Help us understand you by answering few questions</Text>
        </View>
        <View>
          <Text style={styles.quizText}>What your pet's species</Text>
          <TextInput
            style={styles.textInputStyle}
            placeholder="Enter pet species"
            value={species}
            onChangeText={setSpecies}
            keyboardType='ascii-capable'
            ref={speciesRef}
          />
        </View>
        <View>
          <Text style={styles.quizText}>Choose gender of your pet</Text>
          <View style={{ flexDirection: 'row', gap: 50, alignItems: 'center', marginLeft: 50 }}>
            <Button
              style={gender === true ? styles.optionhightlight : styles.option}
              onPress={() => {
                setGender(true); // Set the gender
                weightInputRef.current.focus(); // Focus on the next input field
              }}
            >
              <Text style={{ color: gender === true ? '#F6F6F6' : 'black' }}>Male</Text>
            </Button>
            <Button
              style={gender === false ? styles.optionhightlight : styles.option}
              onPress={() => {
                setGender(false); // Set the gender
                weightInputRef.current.focus(); // Focus on the next input field
              }}

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
            onChangeText={(text) => setWeight(parseInt(text))}
            keyboardType="numeric"
            maxLength={2}
            ref={weightInputRef}
            onSubmitEditing={() => heightInputRef.current.focus()}
          />
        </View>
        <View>
          <Text style={styles.quizText}>What your pet's height (in centimeter)</Text>
          <TextInput
            style={styles.textInputStyle}
            render={({ height }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput
                  style={{ flex: 1 }}
                  value={height}
                  onChangeText={(text) => setHeight(parseInt(text))}
                  keyboardType="numeric"
                  placeholder="Enter pet height (in cm)"
                  maxLength={3}
                  ref={heightInputRef}
                />
                <Text style={{ marginRight: 5 }}>cm</Text>
              </View>
            )}
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
  const speciesRef = useRef(null);
  const nameInputRef = useRef(null);
  const petFeatureRef = useRef(null);
  const weightInputRef = useRef(null);
  const heightInputRef = useRef(null);
  const [gender, setgender] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [petAvatar, setPetAvatar] = useState("");
  const [weight, setweight] = useState(0);
  const [dob, setDob] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [userId, setUserId] = useState('');
  const [height, setHeight] = useState(0);
  const [petFeature, setPetFeature] = useState('');
  useEffect(() => {
    getStoredUserId();
  }, []);
  console.log(userId);
  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");
      if (data !== null) {
        const userData = JSON.parse(data);
        console.log(userData);
        setUserId(userData[0].id)
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.log("Error loading data:", error);
    }
  };

  const handleDone = () => {
    // Check if name is filled out
    if (!name) {
      Alert.alert("Error", "Please enter your pet name.");
      return;
    }

    // Check if date of birth is filled out
    if (!dob) {
      Alert.alert("Error", "Please select your pet's date of birth.");
      return;
    }

    // Check if species is selected
    if (!species) {
      Alert.alert("Error", "Please select your pet's species.");
      return;
    }

    // Check if gender is selected
    if (gender === "") {
      Alert.alert("Error", "Please select your pet's gender.");
      return;
    }

    // Check if weight is filled out
    if (!weight) {
      Alert.alert("Error", "Please enter your pet's weight.");
      return;
    }
    // Check if height is filled out
    if (!height) {
      Alert.alert("Error", "Please enter your pet's height.");
      return;
    }
    if (!petFeature) {
      Alert.alert("Error", "Please enter your pet's feature.");
      return;
    }
    if (!petAvatar) {
      Alert.alert("Error", "Please upload a picture of your pet");
      return;
    }

    postData(`pets/CreatePet/${userId}`, {
      "name": name,
      "species": species,
      "imagePet": petAvatar,
      "birthDate": dob,
      "gender": gender ? 1 : 0,
      "weight": weight,
      "height": height,
      "identifyingFeatures": petFeature
    })
      .then((e) => {
        navigation.navigate('Homes', { screen: 'Home' })

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
  console.log(height);
  console.log(petFeature, 1111);
  console.log(petAvatar, 2222);
  console.log(userId, 333);
  const handleSlideChange = (index) => {
    // Check if the user has moved to the slide containing the input fields
    if (index === 1) {
      // Focus on the input field
      speciesRef.current.focus();
    }
  };
  const handleChoosePhoto = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      
      if (result.assets) {
        setImage(result.assets[0].uri);
        nameInputRef.current.focus();
        if (!result.canceled) {
          // Upload image to Firebase Storage
          // gọi thằng firebaseImg để đẩy ảnh lên xong rồi lấy đường dẫn của ảnh đó 
          const response = await firebaseImg(result);
          setPetAvatar(response)
        }
        else {
          nameInputRef.current.focus();
          console.log('User canceled image selection');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../assets/bgi.jpg')} style={styles.backgroundImage}>
        <Swiper
          ref={swiperRef}
          onIndexChanged={handleSlideChange}
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
            petFeature={petFeature}
            setPetFeature={setPetFeature}
            nameInputRef={nameInputRef}
            petFeatureRef={petFeatureRef}
          />
          <Slide2
            species={species}
            setSpecies={setPetspecies}
            gender={gender}
            setGender={setgender}
            weight={weight.toString()}
            setWeight={setweight}
            handleDone={handleDone}
            height={height}
            setHeight={setHeight}
            speciesRef={speciesRef}
            weightInputRef={weightInputRef}
            heightInputRef={heightInputRef}
          />
        </Swiper>
      </ImageBackground>
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
    color: 'white'
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
    fontStyle: 'italic'
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









