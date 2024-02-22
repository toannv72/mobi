import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { TextInput, IconButton, Modal, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { putData } from "../api/api";

export default function ChangeProfile({ navigation }) {
  const [name, setName] = useState("Toannv");
  const [phone, setPhone] = useState("0345821712");
  const [mail, setMail] = useState("");
  const [location, setLocation] = useState("");
  const [avatarSource, setAvatarSource] = useState(
    "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b"
  );
  const [storedData, setStoredData] = useState([]);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const MaintenanceModal = () => (
    <Modal
      visible={maintenanceModalVisible}
      onDismiss={() => setMaintenanceModalVisible(false)}
    >
      <View
        style={{
          margin: 20,
          backgroundColor: "white",
          padding: 30,
          borderRadius: 10,
        }}
      >
        <Text>This Feature Is Still Under Maintenance</Text>
        <Button onPress={() => setMaintenanceModalVisible(false)}>OK</Button>
      </View>
    </Modal>
  );
  const handleChoosePhoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarSource(result);
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
    // if (storedData.length > 0) {
    //   const userId = storedData[0].id;
    //   putData(`/users/updateInformation/${userId}`, {
    //     address: location,
    //     phoneNumber: phone,
    //     fullname: name,
    //   })
    //     .then((response) => {
    //       // Xử lý phản hồi từ API nếu cần
    //       console.log("API response:", response);
    //     })
    //     .catch((error) => {
    //       console.error("Error updating information:", error);
    //     });
    // }
    setMaintenanceModalVisible(true);
  };

  // useEffect(() => {
  //   const loadStoredData = async () => {
  //     try {
  //       // Load data from AsyncStorage
  //       const data = await AsyncStorage.getItem("@myKey");
  //       if (data !== null) {
  //         setStoredData(JSON.parse(data));
  //         console.log("Data User successfully:", data);
  //       } else {
  //         console.log("No data found in AsyncStorage.");
  //       }
  //     } catch (error) {
  //       console.error("Error loading data:", error);
  //     }
  //   };
  //   loadStoredData();
  // }, []);

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
            uri: avatarSource?.assets
              ? avatarSource?.assets[0]?.uri
              : "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b",
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton
            style={styles.backIcon}
            icon="arrow-left"
            size={35}
            onPress={() => navigation.navigate("Profile")}
          />
          <Text
            style={{
              fontSize: 18,
              color: "#8C8EA3",
              marginLeft: 5,
              fontWeight: "600",
            }}
          >
            Back
          </Text>
        </View>
      </View>
      <View style={styles.cameraIconContainer}>
        <IconButton
          style={{ ...styles.cameraIcon, marginBottom: 450 }}
          icon="camera"
          size={35}
          onPress={handleChoosePhoto}
        />
      </View>

      <View
        style={{
          ...styles.searchSection,
          backgroundColor: "#E9E7E7",
          borderRadius: 40,
          marginTop: -10,
        }}
      >
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: "#E9E7E7",
            borderRadius: 40,
            fontSize: 18,
          }}
          placeholder="Name"
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
          backgroundColor: "#E9E7E7",
          borderRadius: 40,
          marginBottom: 5,
        }}
      >
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: "#E9E7E7",
            borderRadius: 40,
            fontSize: 18,
          }}
          placeholder="Mail"
          onChangeText={(text) => setMail(text)}
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
          ...styles.searchSection,
          fontSize: 18,
          marginTop: 5,
        }}
      >
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: "#E9E7E7",
            fontSize: 18,
          }}
          placeholder="Phone Number"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          mode="outlined"
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

      <View
        style={{
          ...styles.searchSection,
          backgroundColor: "#E9E7E7",
          borderRadius: 40,
          marginBottom: 5,
        }}
      >
        <TextInput
          style={{
            ...styles.input,
            backgroundColor: "#E9E7E7",
            borderRadius: 40,
            fontSize: 18,
          }}
          placeholder="Address"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
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
