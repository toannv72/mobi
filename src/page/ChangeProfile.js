import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Platform,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { TextInput, IconButton, Modal, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { putData } from "../api/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { firebaseImg } from "../api/firebaseImg";
export default function ChangeProfile({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [avatarSource, setAvatarSource] = useState(
    // "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b"
    ""
  );
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
          Update Completed!
        </Text>
        <Button
          onPress={() => {
            setMaintenanceModalVisible(false);
            navigation.navigate("Profile");
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
    setDate(currentDate);
    setDob(currentDate.toLocaleDateString());
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
  const handleResetAll = () => {
    // Xóa tất cả các trường nhập liệu
    setName("");
    setPhone("");
    setMail("");
    setLocation("");
  };
  const handleSaveChanges = () => {
    // Kiểm tra xem các trường đầu vào có rỗng không
    if (!name || !phone || !mail || !location || !dob) {
      // Nếu một trong các trường đầu vào rỗng, hiển thị thông báo cảnh báo
      Alert.alert("Thông báo", "Vui lòng không để trống bất kỳ trường nào.");
      return; // Dừng hàm ở đây nếu có trường rỗng
    }

    // Nếu tất cả các trường đều đã được điền, tiếp tục với việc cập nhật thông tin
    if (storedData.length > 0) {
      const userId = storedData[0].id;
      putData(`/users/updateInformation`, userId, {
        address: location,
        phoneNumber: phone,
        fullName: name,
        avatar: avatarSource,
        birthday: dob,
      })
        .then((response) => {
          // Xử lý phản hồi từ API nếu cần
          console.log("API response:", response);

          // Cập nhật thông tin người dùng trong AsyncStorage
          const updatedUserData = [...storedData];
          updatedUserData[0] = {
            ...updatedUserData[0],
            address: location,
            phoneNumber: phone,
            fullName: name,
            avatar: avatarSource,
            birthday: dob,
          };
          AsyncStorage.setItem("@myKey", JSON.stringify(updatedUserData));
        })
        .catch((error) => {
          console.error("Error updating information:", error);
        });
    } else {
      console.error("No user data found in storedData.");
    }
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
          setName(userData[0].fullName);
          setPhone(userData[0].phoneNumber);
          setMail(userData[0].email);
          setLocation(userData[0].address);
          setDob(userData[0].dateOfBirth);
          setAvatarSource(userData[0].avatar);

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
  const screenWidth = Dimensions.get("window").width;
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
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRivW1ifBRkFMXQnSfTAuHMT3wl7-glBBMWxQ&usqp=CAU",
          }}
          style={{
            ...styles.image,
            marginBottom: 20,
            width: "100%",
            height: "100%",
          }}
        />
      </View>

      <View style={styles.backIconContainer}>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 25 }}
        >
          <IconButton
            style={styles.backIcon}
            icon="arrow-left"
            size={35}
            onPress={() => navigation.navigate("Profile")}
          />

        </View>
      </View>
      <ScrollView>

        <View style={styles.cameraIconContainer}>
          <IconButton
            style={{ ...styles.cameraIcon, marginBottom: 500 }}
            icon="camera"
            size={30}
            onPress={handleChoosePhoto}
          />
        </View>
        <Text style={{ fontSize: 20, paddingBottom: 5 }}> Name</Text>
        <View
          style={{
            ...styles.searchSection,
            width: screenWidth - 20 - 20, // subtract the desired margin
            borderRadius: 40,
          }}
        >

          <TextInput
            style={{
              ...styles.input,
              // backgroundColor: "#E9E7E7",
              borderRadius: 40,
              fontSize: 18,
            }}

            onChangeText={(text) => setName(text)}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="account-circle"
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
            label="Mail"
            onChangeText={(text) => setMail(text)}
            editable={false}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="gmail"
                size={35}
                style={{
                  marginTop: 22,
                }}
              />
            }
            value={mail}
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
              label="Phone"
              onChangeText={(text) => setPhone(text)}
              value={phone}
              mode="outlined"
              keyboardType="number-pad"
              left={
                <TextInput.Icon
                  icon="phone"
                  size={35}
                  style={{
                    marginTop: 22,
                  }}
                />
              }
            />
          </View>

          <View>
            <View
              style={{
                ...styles.searchSection,
                // backgroundColor: "#E9E7E7",
                marginTop: -10,
                width: "50%",
                marginTop: 7,
              }}
            >
              <TouchableOpacity
                onPress={showDatepicker}
                style={{
                  width: 180,
                  height: 75,
                }}
              >
                <TextInput
                  style={{
                    ...styles.input,
                    // backgroundColor: "#E9E7E7",
                    borderRadius: 20,
                    fontSize: 18,
                  }}
                  mode="outlined"
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
          </View>
        </View>

        <View
          style={{
            ...styles.searchSection,
            width: screenWidth - 20 - 20, // subtract the desired margin
            borderRadius: 40,
            marginTop: 0,
          }}
        >
          <TextInput
            style={{
              ...styles.input,
              // backgroundColor: "#E9E7E7",
              borderRadius: 40,
              fontSize: 18,
            }}
            label="Address"
            onChangeText={(text) => setLocation(text)}
            mode="outlined"
            left={
              <TextInput.Icon
                icon="map-legend"
                size={35}
                style={{
                  marginTop: 22,
                }}
              />
            }
            value={location}
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
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
        <MaintenanceModal />

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
