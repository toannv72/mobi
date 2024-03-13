
import React, { useState, useEffect } from "react";
import axios from "axios";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  Button,
  Text,
  TextInput,

} from "react-native-paper";
import { postData } from "../api/api";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");

  console.log(email);

  const sendResetLink = () => {
    postData(`/account/${email}/forgot_password`)
      .then((res) => {
        navigation.navigate("Verify", { email: email });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ margin: 70 }} />
      <Button
        style={{
          backgroundColor: "#3A3F65",
          buttonColor: "white",
          position: "absolute",
          top: 80,
          left: 20,
          width: 80,
          height: 40,
        }}
        mode="contained"
        onPress={() => navigation.navigate("Login")}
      >
        Back
      </Button>
      <View style={{ margin: 10 }} />
      <Text style={{ fontSize: 26, fontWeight: 100 }}>
        {" "}
        Forgot Your Password ?
      </Text>

      <View style={{ margin: 10 }} />
      <Text style={{ fontSize: 20 }}>Please enter your email and we’ll</Text>
      <Text style={{ fontSize: 20 }}>send you a link to reset password</Text>
      <View style={{ margin: 20 }} />
      <TextInput
        label="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        left={<TextInput.Icon icon="gmail" />}
      />
      <View style={{ margin: 10 }} />
      <Button
        style={{ backgroundColor: "#3A3F65", buttonColor: "white"}}
        mode="contained"
        onPress={sendResetLink}
      >
        Send reset link
      </Button>

      <View style={{ margin: 10 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
  },
});
