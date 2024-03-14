
import React, { useRef, useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Text, TextInput } from "react-native-paper";
import CustomButton from "../Components/CustomButton";
import { postData } from "../api/api";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

export default function ConfirmPasswordScreen({ navigation }) {
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const passwordInputRef = useRef(null);
  const repeatPasswordInputRef = useRef(null);
  
  const route = useRoute();
  const { email } = route.params;
console.log("222", email, password, repeatPassword);
  const handConfirmPassword = () => {
    if (!password) {
        Alert.alert("Error", "Please enter your new password.");
        passwordInputRef.current.focus();
        return;
      }
  
      if (!repeatPassword) {
        Alert.alert("Error", "Please repeat your new password.");
        repeatPasswordInputRef.current.focus();
        return;
      }
  
      if (password !== repeatPassword) {
        Alert.alert("Error", "Passwords do not match. Please try again.");
        repeatPasswordInputRef.current.focus();
        return;
      }
    postData(`/account/changePassword`,{
        email: email,
        newPassword: password,
        confirmPassword: repeatPassword

    }).then((e) => {
        Alert.alert("Success", "Change password success");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", "Wrong account or password!");
      });
        
        
        
      }
   
  

  return(
    <View style={styles.container}>
      <Text style={{ fontSize: 26 }}>Change your password</Text>
      <View style={{ margin: 20 }} />

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
        onSubmitEditing={handConfirmPassword}
        left={<TextInput.Icon icon="lock" />}
      />
      <View style={styles.margin} />
      {/* Change the onPress prop of CustomButton */}
      <CustomButton
        title="Change Your Password"
        height={50}
        onPress={handConfirmPassword}
      />
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
