import React, { useRef, useState } from "react";
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import {
  Button,
  Card,
  MD3Colors,
  ProgressBar,
  Text,
  TextInput,
  TouchableRipple,
} from "react-native-paper";
import CustomButton from "../Components/CustomButton";

export default function SingUpScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const fullNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const repeatPasswordInputRef = useRef(null);
  const handleSignUp = () => {
    if (!fullName) {
      Alert.alert("Error", "Please enter your full name.");
      fullNameInputRef.current.focus();
      return;
    }

    if (!email) {
      Alert.alert("Error", "Please enter your email.");
      emailInputRef.current.focus();
      return;
    }

    if (!phoneNumber) {
      Alert.alert("Error", "Please enter your phone number.");
      phoneInputRef.current.focus();
      return;
    }

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
    // Xử lý logic đăng ký tại đây
    // Ví dụ: kiểm tra các trường và thực hiện đăng ký nếu hợp lệ
    console.log("Full Name:", fullName);
    console.log("Email:", email);
    console.log("Phone Number:", phoneNumber);
    console.log("Password:", password);
    console.log("Repeat Password:", repeatPassword);
    if (password !== repeatPassword) {
      Alert.alert("Error", "Passwords do not match. Please try again.");
      repeatPasswordInputRef.current.focus();
      return;
    }
  };
  const handleInputChange = (text) => {
    // Kiểm tra xem text có phải là số không
    if (/^\d+$/.test(text) || text === "") {
      setPhoneNumber(text);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26 }}> Create your account</Text>
      <View style={{ margin: 20 }} />

      <TextInput
        label="Full name"
        ref={fullNameInputRef}
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        mode="circle"
        left={<TextInput.Icon icon="account" />}
        onSubmitEditing={() => emailInputRef.current.focus()}
      />

      <View style={styles.margin} />

      <TextInput
        ref={emailInputRef}
        label="Email"
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        left={<TextInput.Icon icon="email" />}
        onSubmitEditing={() => phoneInputRef.current.focus()}
      />

      <View style={styles.margin} />

      <TextInput
        ref={phoneInputRef}
        label="Phone number"
        mode="outlined"
        value={phoneNumber}
        keyboardType="number-pad"
        onChangeText={handleInputChange}
        left={<TextInput.Icon icon="phone" />}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      />

      <View style={styles.margin} />

      <TextInput
        ref={passwordInputRef}
        label="Password"
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
        label="Repeat password"
        mode="outlined"
        onChangeText={(text) => setRepeatPassword(text)}
        value={repeatPassword}
        secureTextEntry
        onSubmitEditing={handleSignUp}
        left={<TextInput.Icon icon="lock" />}
      />

      <View style={styles.margin} />

      <CustomButton title="Sign up" height={50} onPress={handleSignUp} />
      <View style={{ margin: 10 }} />
      <View>
        <Text style={{ textAlign: "center" }}>
          ------------------- or continue with -------------------
        </Text>
      </View>
      <View style={{ margin: 10 }} />

      <Text
        style={{ textAlign: "center" }}
        onPress={() => navigation.navigate("Login")}
      >
        Don’t have account? Signup
      </Text>
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
});
