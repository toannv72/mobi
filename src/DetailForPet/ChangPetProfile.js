import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, Platform, Alert } from "react-native";
import { TextInput, IconButton, Modal, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteData, putData } from "../api/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebaseImg } from "../api/firebaseImg";
import RNPickerSelect from "react-native-picker-select";
import { useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
export default function ChangePetProfile({ navigation }) {
  const route = useRoute();
  const { petId, petData } = route.params;
  const [name, setName] = useState(petData.name);
  const [species, setSpecies] = useState(petData.species);
  const [weight, setWeight] = useState(petData.weight);
  const [gender, setGender] = useState(petData.gender);
  const [dob, setDob] = useState(petData.dob);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [avatarSource, setAvatarSource] = useState(petData.imagePet);
  const [height, setHeight] = useState(petData.height);
  const [detail, setDetail] = useState(petData.identifyingFeatures);
  const [storedData, setStoredData] = useState([]);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  console.log(111111111, petData);
  const screenWidth = Dimensions.get("window").width;
  const MaintenanceModal = () => (
    <Modal
      visible={maintenanceModalVisible}
      onDismiss={() => setMaintenanceModalVisible(false)}
      animationType="slide"
      transparent={true}
    >
      <View
        style={{
          margin: 40,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: 600, marginLeft: 80 }}>
          Update Successful!
        </Text>
        <Button
          onPress={() => {
            setMaintenanceModalVisible(false);
            navigation.navigate("Home");
          }}
          style={{ marginTop: 15 }}
        >
          OK
        </Button>
      </View>
    </Modal>
  );
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");

    // Kiểm tra xem ngày được chọn có lớn hơn ngày hiện tại không
    if (currentDate > new Date()) {
      // Nếu ngày được chọn lớn hơn ngày hiện tại, hiển thị thông báo cho người dùng
      Alert.alert(
        "Invalid Date",
        "The selected date cannot be in the future. Please choose a different date."
      );
    } else {
      setDate(currentDate);

      // Format date in the desired format
      const formattedDate = `${currentDate.getFullYear()}-${
        currentDate.getMonth() + 1
      }-${currentDate.getDate()}`;

      setDob(formattedDate);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const response = await firebaseImg(result);
      console.log(response);
      setAvatarSource(response);
    }
  };
  const handleDeletePet = () => {
    // Hiển thị thông báo xác nhận
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this pet?",
      [
        {
          text: "Yes",
          onPress: () => {
            // Log petId và URL
            console.log("Deleting pet with ID:", petId);
            console.log("URL:", `/api/pets/pet/${petId}`);

            // Gọi API DELETE ở đây
            deleteData(`/pets/pet`, petId)
              .then((response) => {
                console.log("Delete pet response:", response);
                // Xử lý dữ liệu trả về sau khi xóa pet
                // Ví dụ: Cập nhật lại danh sách pets trong AsyncStorage
                // Hiển thị thông báo xác nhận xóa
                Alert.alert(
                  "Success",
                  "This pet has been removed from your collection.",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Navigate user về Home
                        navigation.navigate("Home");
                      },
                    },
                  ],
                  { cancelable: false }
                );
              })
              .catch((error) => {
                console.error("Error deleting pet:", error);
              });
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  // Nhận petId từ route params
  const handleSaveChanges = () => {
    if (
      !name ||
      gender === undefined ||
      !avatarSource ||
      !species ||
      !dob ||
      !weight ||
      !height ||
      !detail
    ) {
      // Nếu một trong các trường đầu vào rỗng, hiển thị thông báo cảnh báo
      Alert.alert("Alert", "Please fill all the fields.");
      return; // Dừng hàm ở đây nếu có trường rỗng
    }
    if (!storedData || storedData.length === 0) {
      console.error("No user data found in storedData.");
      return;
    }

    // Lấy petId của pet bạn muốn cập nhật

    // const petIndex = storedData[0].pets.findIndex((pet) => pet.petId === petId);

    // Chuyển đổi giá trị của gender từ chuỗi sang số nguyên
    const genderValue = gender; // Sửa ở đây

    // Chuyển đổi định dạng của ngày sinh thành chuỗi đúng định dạng
    let formattedDob;
    try {
      formattedDob = new Date(dob).toISOString();
    } catch (error) {
      console.error("Invalid date:", dob);
      return;
    }

    putData(`/pets/updatePet`, petId, {
      weight: Number(weight),
      species: species,
      name: name,
      imagePet: avatarSource,
      birthDate: formattedDob,
      height: Number(height),
      gender: genderValue,
      identifyingFeatures: detail,
    })
      .then((response) => {
        console.log("API response:", response);
        const updatedUserData = [...storedData];
      })
      .catch((error) => {
        console.error("Error updating information:", error);
      });

    setMaintenanceModalVisible(true);
  };

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        // Load data from AsyncStorage
        const data = await AsyncStorage.getItem("@myKey");
        if (data !== null) {
          const userData = JSON.parse(data);
          setStoredData(userData);

          console.log("User data loaded successfully:", userData);
          if (userData[0].pets) {
            userData[0].pets.forEach((pet, index) => {
              // console.log(`Pet ${index + 1}:`, JSON.stringify(pet, null, 2));
            });
          } else {
            console.log("No pets found.");
          }
        } else {
          console.log("No data found in AsyncStorage.");
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadStoredData();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.image,
          marginBottom: 40,
          borderColor: "gray",
          borderWidth: 1,
          width: 432,
          height: 250,
          marginTop: 20,
        }}
      >
        <Image
          source={{
            uri: avatarSource
              ? avatarSource
              : "https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2021/04/748621ef-border-collie-thumb.jpeg",
          }}
          style={{
            ...styles.image,
            marginBottom: 20,
            width: "100%",
            height: "100%",
          }}
        />
        <View style={styles.backIconContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 9999,
            }}
          >
            <IconButton
              style={{}}
              icon="arrow-left"
              size={35}
              onPress={() => navigation.goBack()}
            />
          </View>
        </View>
      </View>

      <View style={styles.cameraIconContainer}>
        <IconButton
          style={{ ...styles.cameraIcon, marginBottom: 550 }}
          icon="camera"
          size={30}
          onPress={handleChoosePhoto}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 0,
          marginHorizontal: 0,
          // paddingBottom: 1,
        }}
      >
        <View style={{ height: 10 }} />
        <View
          style={{
            ...styles.searchSection,
            width: screenWidth - 20 - 20, // subtract the desired margin
            borderRadius: 40,
            marginTop: -10,
          }}
        >
          <TextInput
            style={{
              ...styles.input,
              borderRadius: 40,
              fontSize: 18,
            }}
            placeholder="Name"
            onChangeText={(text) => setName(text)}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="dog"
                size={35}
                style={{
                  marginTop: 22,
                }}
              />
            }
            value={name}
          />
        </View>
        <View
          style={{
            ...styles.searchSection,
            borderRadius: 40,
            marginBottom: 5,
            width: screenWidth - 20 - 20, // subtract the desired margin
          }}
        >
          <TextInput
            style={{
              ...styles.input,
              // backgroundColor: "#E9E7E7",
              borderRadius: 40,
              fontSize: 18,
            }}
            placeholder="Species"
            onChangeText={(text) => setSpecies(text)}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="dog-side"
                size={35}
                style={{
                  marginTop: 22,
                }}
              />
            }
            value={species}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              ...styles.searchSection,
              marginTop: -10,
              width: (screenWidth - 30) / 2,
              marginTop: 7,
              paddingRight: 9,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                fontSize: 18,
              }}
              placeholder="Weight"
              onChangeText={(text) => setWeight(text)}
              value={weight.toString()}
              mode="outlined"
              // keyboardType="number-pad"
              left={
                <TextInput.Icon
                  icon="weight-pound"
                  size={35}
                  style={{
                    marginTop: 22,
                  }}
                />
              }
            />
          </View>
          <View
            style={{
              ...styles.searchSection,
              marginTop: -10,
              width: (screenWidth - 30) / 2,
              marginTop: 7,
              paddingRight: 10,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                // backgroundColor: "#E9E7E7",
                fontSize: 18,
              }}
              placeholder="Height"
              onChangeText={(text) => setHeight(text)}
              value={height.toString()}
              mode="outlined"
              keyboardType="number-pad"
              left={
                <TextInput.Icon
                  icon="weight"
                  size={35}
                  style={{
                    marginTop: 22,
                  }}
                />
              }
            />
          </View>
        </View>

        <View
          style={{
            ...styles.searchSection,
            marginTop: -10,
            width: screenWidth - 20 - 20, // subtract the desired margin
            marginTop: 7,
            paddingRight: 9,
          }}
        >
          <TouchableOpacity
            onPress={showDatepicker}
            style={{
              width: screenWidth - 20 - 20, // subtract the desired margin
              height: 73,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                // backgroundColor: "#E9E7E7",
                fontSize: 18,
              }}
              mode="outlined"
              placeholder="Birth Date"
              value={dob}
              // onTouchStart={showDatepicker} // Show the date picker when the user touches this
              editable={false}
              left={
                <TextInput.Icon
                  icon="calendar"
                  size={35}
                  style={{
                    marginTop: 22,
                  }}
                />
              }
            />
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <View
          style={{
            ...styles.searchSection,
            // backgroundColor: "#E9E7E7",
            width: screenWidth - 20 - 20, // subtract the desired margin
            marginTop: 7,
            paddingRight: 10,
            borderWidth: 0.8, // Add border width
          }}
        >
          <RNPickerSelect
            onValueChange={(value) => setGender(value)}
            items={[
              { label: "Male", value: 0 },
              { label: "Female", value: 1 },
            ]}
            style={{
              inputAndroid: {
                width: 370,
                height: 73,
              },
              borderRadius: 8,
            }}
            value={gender}
            placeholder={{}}
          />
        </View>

        <View
          style={{
            ...styles.searchSection,
            width: screenWidth - 20 - 20, // subtract the desired margin
            borderRadius: 40,
            marginBottom: 5,
          }}
        >
          <TextInput
            style={{
              ...styles.input,

              borderRadius: 40,
              fontSize: 18,
            }}
            placeholder="Identifying Features"
            onChangeText={(text) => setDetail(text)}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="dog-service"
                size={35}
                style={{
                  marginTop: 22,
                }}
              />
            }
            value={detail}
          />
        </View>
        {/* Nút Reset All */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: "red",
              borderColor: "white",
            }}
            onPress={handleDeletePet}
          >
            <Text
              style={{
                ...styles.buttonText,
                fontSize: 16,
                fontWeight: 400,
                color: "white",
              }}
            >
              Delete
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: "#484B61",
              borderColor: "#484B61",
            }}
            onPress={handleSaveChanges}
          >
            <Text
              style={{ ...styles.buttonText, fontSize: 16, fontWeight: 400 }}
            >
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
        <MaintenanceModal />
        <View style={{ height: 15 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    flex: 1,
    marginTop: "10%",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  image: {
    width: 432,
    height: 250,
    marginBottom: 20,
  },
  backIconContainer: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    padding: 10,
    color: "black",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    marginRight: 16,
    marginBottom: 16,
  },
  cameraIcon: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#E9E7E7",
  },
  buttonContainer: {
    flexDirection: "row", // Đảm bảo các nút nằm ngang nhau
    justifyContent: "space-between", // Các phần tử nằm cách đều nhau
    marginTop: 25,
  },
  button: {
    marginHorizontal: 6, // Khoảng giữa giữa các nút
    width: 179,
    height: 42,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#000", // Đổi màu sắc border theo mong muốn
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
