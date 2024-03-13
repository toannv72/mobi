import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import {
  Button,
  Card,
  IconButton,
  MD3Colors,
  ProgressBar,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import CustomButton from "../Components/CustomButton";
import { getData, postData } from "../api/api";
import axios from "axios";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";

export default function ChangePassword({ navigation }) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState("");
  const passwordInputRef = useRef(null);
  const repeatPasswordInputRef = useRef(null);
  const handleSignUp = () => {
    if (!password) {
      Alert.alert("Error", "Please enter your password.");
      passwordInputRef.current.focus();
      return;
    }

    if (!repeatPassword) {
      Alert.alert("Error", "Please repeat your password.");
      repeatPasswordInputRef.current.focus();
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert("Error", "Passwords do not match. Please try again.");
      repeatPasswordInputRef.current.focus();
      return;
    }

    try {
      postData("/users/login", {
        email: email,
        password: password,
      })
        .then((e) => {
          axios
            .post(
              "https://petside.azurewebsites.net/api/account/changePassword",
              {
                newpassword: repeatPassword,
                confirmPassword: password,
                email: email,
              }
            )
            .then((e) => {
              console.log(e.data);
              if (e.data.success) {
                navigation.navigate("Homes", { screen: "home" });
              } else {
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error.response);
            });
        })
        .catch((error) => {
          // navigation.navigate('Homes', { screen: 'home' })
          console.log(error);
          Alert.alert("Error", "Maatj khaaur cux sai!");
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");

      if (data !== null) {
        const userData = JSON.parse(data);
        const id = userData[0].id;

        const endpoint = `/users/getInformation/${id}`;
        const response = await getData(endpoint);

        // Cập nhật trạng thái userData
        setUserData(response.data.data);
        setEmail(response.data.data.email); // Thêm dòng này
        console.log("User Information:", response.data);
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

    // Thêm listener cho sự kiện 'focus'
  }, []); // Thêm navigation vào mảng dependency để cập nhật listener khi navigation thay đổi

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.backIconContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              position: "absolute",
              bottom: 10,
              left: 1,
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
              // textAlign: "center",
              flex: 1,
              marginLeft: 70,
              marginBottom: 25,
              fontSize: 25,
              fontWeight: 700,
            }}
          >
            Change Password
          </Text>
        </View>
        <View style={{ margin: 20 }} />
        <View style={styles.margin} />
        <Image
          source={require("../../assets/Group231.png")}
          style={{ width: 240, height: 240, alignSelf: "center" }}
        />
        <View style={{ marginTop: 75 }} />
        {/* <TextInput
        label="Email"
        mode="outlined"
        value={email}
        editable={false}
        left={<TextInput.Icon icon="email" />}
      />
      <View style={styles.margin} /> */}
        <TextInput
          ref={passwordInputRef}
          label="Your Password"
          mode="outlined"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          onSubmitEditing={() => repeatPasswordInputRef.current.focus()}
          left={<TextInput.Icon icon="lock" />}
        />

        <View style={styles.margin} />
        <TextInput
          ref={passwordInputRef}
          label="New Password"
          mode="outlined"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          onSubmitEditing={() => repeatPasswordInputRef.current.focus()}
          left={<TextInput.Icon icon="lock" />}
        />
        <View style={styles.margin} />

        <TextInput
          ref={repeatPasswordInputRef}
          label="Conform New Password"
          mode="outlined"
          onChangeText={(text) => setRepeatPassword(text)}
          value={repeatPassword}
          secureTextEntry
          onSubmitEditing={handleSignUp}
          left={<TextInput.Icon icon="lock" />}
        />

        <View style={styles.margin} />

        <CustomButton
          title="Confirm New Password"
          height={50}
          onPress={handleSignUp}
        />
        <View style={{ margin: 10 }} />

        {/* <View style={{ margin: 10 }} /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#FFFFFF",
  },
  margin: {
    marginVertical: 10,
  },
  backIconContainer: {
    position: "absolute",
    top: 0,
    left: -20,
    zIndex: 1,
  },
  backIcon: {
    padding: 10,
    color: "#8C8EA3",
  },
});
