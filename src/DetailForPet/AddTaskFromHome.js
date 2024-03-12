import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text, Platform, Alert } from "react-native";
import { TextInput, IconButton, Modal, Button } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { getData } from "../api/api";
export default function AddTaskFromHome({ navigation }) {
  const [time, setTime] = useState(new Date());
  const [dob, setDob] = useState("");
  const [type, setType] = useState("Choose a type task");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [modeTime, setModeTime] = useState("time");
  const [show, setShow] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [detail, setDetail] = useState("");
  const [storedData, setStoredData] = useState([]);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const [petList, setPetList] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedPetImage, setSelectedPetImage] = useState(null);

  const getPetsItems = async () => {
    try {
      // Load data from AsyncStorage
      const data = await AsyncStorage.getItem("@myKey");
      console.log("Data from AsyncStorage:", data); // Log data from AsyncStorage
      if (data !== null) {
        const userData = JSON.parse(data);
        const userId = userData[0].id;
        console.log("User ID:", userId); // Log user ID

        // giả sử `response` là dữ liệu lấy từ server hoặc AsyncStorage
        const response = await getData(`users/${userId}/pets`);
        // console.log("Response from server:", response); // Log response from server
        console.log("aaaaa", response.data.contents);
        const petsData = response.data.contents.map((pet, index) => {
          if (!pet.id) {
            console.error(`Pet at index ${index} does not have an id.`);
          }
          return {
            label: pet.name,
            value: pet.id || index,
            image: pet.imagePet,
          };
        });

        console.log("Pets data:", petsData); // Log pets data
        setPetList(petsData); // Cập nhật state `petList`
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };
  useEffect(() => {
    getPetsItems();
  }, []);

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

    // Format date in the 'YYYY-MM-DD' format
    const formattedDate = currentDate.toISOString().split("T")[0];

    setDob(formattedDate);
  };
  const timeString = `${time.getHours()}:${time.getMinutes()}`;
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === "ios");

    // Cập nhật thời gian
    setTime(currentTime);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  const showModeTime = (currentMode) => {
    setShowTime(true);
    setModeTime(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };
  const showTimepicker = () => {
    showModeTime("time");
  };

  const handleResetAll = () => {
    setDetail("");
    // setTime("");
    setType("");
    setDob("");
  };
  const handleSaveChanges = () => {
    if (!type || !time || !dob || !detail || type === "Choose a type task") {
      // Nếu một trong các trường đầu vào rỗng, hiển thị thông báo cảnh báo
      Alert.alert("Alert", "Please fill all the fields.");
      return; // Dừng hàm ở đây nếu có trường rỗng
    }
    if (!storedData || storedData.length === 0) {
      console.error("No user data found in storedData.");
      return;
    }

    const userId = storedData[0].id;

    // Log the values of userId and petId
    console.log("userId:", userId);
    console.log("petId:", selectedPet);

    let formattedDob;
    if (isNaN(Date.parse(dob))) {
      console.error("Invalid date:", dob);
      return;
    } else {
      formattedDob = new Date(dob).toISOString();
    }
    const timeInSeconds =
      time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds();
    // Construct the URL and log it
    const url = `https://petside.azurewebsites.net/users/${userId}/pets/${selectedPet}/notifications`;
    console.log("URL:", url);

    axios
      .post(url, {
        nameMedicine: type,
        dateRemind: dob,
        timeRemind: timeInSeconds,
        content: detail,
      })
      .then((response) => {
        console.log("API response:", response);

        // Cập nhật thông tin người dùng trong AsyncStorage
        const updatedUserData = [...storedData];
        updatedUserData[0] = {
          ...updatedUserData[0],
          nameMedicine: type,
          dateRemind: dob,
          timeRemind: time,
          content: detail,
        };
        AsyncStorage.setItem("@myKey", JSON.stringify(updatedUserData));
      })
      .catch((error) => {
        console.error("Error create information:", error);
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
          // console.log("User data loaded successfully:", userData);
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
      <View style={styles.backIconContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            position: "absolute",
            bottom: -15,
          }}
        >
          <IconButton
            style={styles.backIcon}
            icon="arrow-left"
            size={35}
            onPress={() => navigation.goBack()}
          />
        </View>
        <Text
          style={{
            textAlign: "center",
            flex: 1,
            marginLeft: 140,
            marginTop: 0,
            fontSize: 25,
            fontWeight: 700,
          }}
        >
          Add Task
        </Text>
      </View>
      {selectedPetImage && (
        <Image
          source={{ uri: selectedPetImage }}
          style={{
            ...styles.image,
            marginBottom: 40,
            borderColor: "gray",
            borderWidth: 1,
            width: 432,
            height: 300,
            marginTop: 80,
            objectFit: "cover",
          }}
        />
      )}
      <View
        style={{
          ...styles.searchSection,
          marginTop: -15,
          width: 380,
          borderWidth: 0.8, // Add border width
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => setType(value)}
          items={[
            { label: "Choose a type task", value: "Choose a type task" },
            { label: "Gromming", value: "Gromming" },
            { label: "Vaccination", value: "Vaccination" },
            { label: "Hotel", value: "Hotel" },
          ]}
          style={{
            inputAndroid: {
              fontSize: 18,
              width: 380,
              height: 73,
            },
          }}
          value={type}
          placeholder={{}}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View
          style={{
            ...styles.searchSection,
            marginTop: -10,
            width: 180,
            marginTop: 7,
            marginRight: -50,
          }}
        >
          <TouchableOpacity
            onPress={showDatepicker}
            style={{
              width: 180,
              height: 73,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                fontSize: 18,
              }}
              mode="outlined"
              placeholder="Date Reminder"
              value={dob}
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
            onChange={(event, selectedDate) => {
              console.log("date remind", selectedDate); // Đặt log ở đây
              onChange(event, selectedDate);
            }}
          />
        )}

        <View
          style={{
            ...styles.searchSection,
            marginTop: -10,
            width: 180,
            marginTop: 7,
            marginLeft: 70,
          }}
        >
          <TouchableOpacity
            onPress={showTimepicker}
            style={{
              width: 180,
              height: 73,
            }}
          >
            <TextInput
              style={{
                ...styles.input,
                fontSize: 18,
              }}
              mode="outlined"
              placeholder="Time Reminder"
              value={timeString}
              editable={false}
              left={
                <TextInput.Icon
                  icon="clock"
                  size={35}
                  style={{
                    marginTop: 22,
                  }}
                />
              }
            />
          </TouchableOpacity>
        </View>
        {showTime && (
          <DateTimePicker
            testID="dateTimePicker"
            value={time}
            mode={modeTime}
            is24Hour={true}
            display="default"
            onChange={(event, selectedTime) => {
              console.log("time remind", selectedTime); // Đặt log ở đây
              onChangeTime(event, selectedTime);
            }}
          />
        )}
      </View>

      <View
        style={{
          ...styles.searchSection,
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
          placeholder="Task Detail"
          onChangeText={(text) => {
            console.log("detail123", text); // Đặt log ở đây
            setDetail(text);
          }}
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
          value={detail}
        />
      </View>
      <View
        style={{
          ...styles.searchSection,
          marginTop: 6,
          width: 380,
          borderWidth: 0.8, // Add border width
        }}
      >
        <RNPickerSelect
          onValueChange={(value) => {
            setSelectedPet(value);
            // Tìm hình ảnh tương ứng với pet được chọn
            const selectedPetData = petList.find((pet) => pet.value === value);
            setSelectedPetImage(selectedPetData ? selectedPetData.image : null);
          }}
          items={petList}
          style={{
            inputAndroid: {
              fontSize: 18,
              width: 380,
              height: 73,
            },
          }}
          value={selectedPet}
          placeholder={{}}
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
          <Text style={{ ...styles.buttonText, fontSize: 16, fontWeight: 400 }}>
            Create
          </Text>
        </TouchableOpacity>
      </View>
      <MaintenanceModal />
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
    top: 50,
    left: 5,
    zIndex: 1,
  },
  backIcon: {
    padding: 10,
    color: "#8C8EA3",
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
