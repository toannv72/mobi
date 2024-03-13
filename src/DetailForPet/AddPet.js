import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, Platform, Alert } from "react-native";
import { TextInput, IconButton, Modal, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import {
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postData } from "../api/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebaseImg } from "../api/firebaseImg";
import RNPickerSelect from "react-native-picker-select";
import { Dimensions } from "react-native";
export default function AddPet({ navigation }) {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState(0);
  const [dob, setDob] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [avatarSource, setAvatarSource] = useState(
    // "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b"
    ""
  );
  const [height, setHeight] = useState("");
  const [detail, setDetail] = useState("");
  const [storedData, setStoredData] = useState([]);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);

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
          Create Successful!
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
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const handleResetAll = () => {
    // Xóa tất cả các trường nhập liệu
    setName("");
    setSpecies("");
    setWeight("");
    setAvatarSource("");
    setGender("");
    setHeight("");
    setDetail(""), setDob("");
  };
  const handleSaveChanges = () => {
    console.log({
      weight: Number(weight),
      species: species,
      name: name,
      imagePet: avatarSource,
      birthDate: formattedDob,
      height: Number(height),
      gender: genderValue,
      identifyingFeatures: detail,
    });
    if (!name) {
      Alert.alert("Error", "Please enter your pet's name.");
      // nameInputRef.current.focus(); // Thêm dòng này nếu bạn có tham chiếu đến trường nhập liệu tên
      return;
    }

    if (gender === undefined) {
      Alert.alert("Error", "Please select your pet's gender.");
      // genderInputRef.current.focus(); // Thêm dòng này nếu bạn có tham chiếu đến trường nhập liệu giới tính
      return;
    }

    if (!avatarSource) {
      Alert.alert("Error", "Please add your pet's photo.");
      // photoInputRef.current.focus(); // Thêm dòng này nếu bạn có tham chiếu đến trường nhập liệu ảnh
      return;
    }

    if (!species) {
      Alert.alert("Error", "Please enter your pet's species.");
      // speciesInputRef.current.focus(); // Thêm dòng này nếu bạn có tham chiếu đến trường nhập liệu loài
      return;
    }

    if (!dob) {
      Alert.alert("Error", "Please enter your pet's date of birth.");
      // dobInputRef.current.focus(); // Thêm dòng này nếu bạn có tham chiếu đến trường nhập liệu ngày sinh
      return;
    }

    if (!weight) {
      Alert.alert("Error", "Please enter your pet's weight.");
      // weightInputRef.current.focus(); // Thêm dòng này nếu bạn có tham chiếu đến trường nhập liệu cân nặng
      return;
    }

    if (!height) {
      Alert.alert("Error", "Please enter your pet's height.");
      // heightInputRef.current.focus(); // Thêm dòng này nếu bạn có tham chiếu đến trường nhập liệu chiều cao
      return;
    }

    if (!detail) {
      Alert.alert("Error", "Please enter identifying features of your pet.");
      // detailInputRef.current.focus(); // Thêm dòng này nếu bạn có tham chiếu đến trường nhập liệu đặc điểm nhận dạng
      return;
    }

    if (!storedData || storedData.length === 0) {
      console.error("No user data found in storedData.");
      return;
    }

    const userId = storedData[0].id;

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

    postData(`/pets/CreatePet/${userId}`, {
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

        // Cập nhật thông tin người dùng trong AsyncStorage
        const updatedUserData = [...storedData];
        updatedUserData[0] = {
          ...updatedUserData[0],
          weight: Number(weight),
          species: species,
          name: name,
          imagePet: avatarSource,
          birthDate: formattedDob,
          height: Number(height),
          gender: genderValue,
          identifyingFeatures: detail,
        };
        AsyncStorage.setItem("@myKey", JSON.stringify(updatedUserData));
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

          // Update the states with the current user information
          console.log(JSON.stringify(userData, null, 2));
          console.log("User data loaded successfully:", userData);
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
              marginTop: 10,
              backgroundColor: "white",
              borderRadius: 9999,
            }}
          >
            <IconButton
              style={styles.backIcon}
              icon="arrow-left"
              size={35}
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      </View>

      <View style={styles.cameraIconContainer}>
        <IconButton
          style={{ ...styles.cameraIcon, marginBottom: 550 }}
          icon="camera"
          size={32}
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
              // backgroundColor: "#E9E7E7",
              borderRadius: 40,
              fontSize: 18,
            }}
            label="Name"
            // placeholder="Name"
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
              borderRadius: 40,
              fontSize: 18,
            }}
            label="Species  "
            // placeholder="Species"
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: screenWidth - 20 - 20,
          }}
        >
          <View
            style={{
              ...styles.searchSection,
              marginTop: -10,
              width: "50%",
              marginTop: 7,
              paddingRight: 9,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                // backgroundColor: "#E9E7E7",
                fontSize: 18,
              }}
              label="Weight"
              onChangeText={(text) => setWeight(text)}
              value={weight}
              mode="outlined"
              keyboardType="number-pad"
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
              width: "50%",
              marginTop: 7,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                // backgroundColor: "#E9E7E7",
                fontSize: 18,
              }}
              label="Height"
              onChangeText={(text) => setHeight(text)}
              value={height}
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
            // backgroundColor: "#E9E7E7",
            marginTop: -10,
            width: screenWidth - 20 - 20, // subtract the desired margin
            marginTop: 7,
            paddingRight: 9,
          }}
        >
          <TouchableWithoutFeedback
            onPress={showDatepicker}
            style={{
              width: screenWidth - 20 - 20,
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
          </TouchableWithoutFeedback>
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
                fontSize: 18,
                width: screenWidth - 40, // subtract the desired margin
                height: screenHeight * 0.1, // 10% of screen height
                position: "flex-end",
              },
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
              // backgroundColor: "#E9E7E7",
              borderRadius: 40,
              fontSize: 18,
            }}
            label="Identifying Features"
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
              backgroundColor: "#ffffff",
            }}
            onPress={handleResetAll}
          >
            <Text
              style={{
                ...styles.buttonText,
                fontSize: 16,
                fontWeight: 400,
                color: "#24252B",
              }}
            >
              Reset All
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
              Create
            </Text>
          </TouchableOpacity>
        </View>
        <MaintenanceModal />
      </ScrollView>
      <View style={{ height: 15 }} />
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
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backIcon: {
    paddingVertical: 10,
    color: "black",
    backgroundColor: "white",
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
