import React, { useState, useRef } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import Button1 from "../Button";
import axios from "axios";
import { postData } from "../api/api";
import { useRoute } from "@react-navigation/native";

export default function VerifyScreen({ navigation }) {
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);

  const route = useRoute();
  const { email } = route.params;

  const OTP = code1 + code2 + code3 + code4;
  console.log("check vali", email, OTP);
  const handleSend = () => {
    if (OTP.length === 4) {
      postData(`/account/${email}/confirm/${OTP}`)
        .then((res) => {
          navigation.navigate("ConfirmPassword", {email: email});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please enter complete OTP.");
    }
  };


  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <View style={{ marginVertical: 100 }} />
      <Button
        style={{
          backgroundColor: "#3A3F65",
          buttonColor: "white",
          position: "absolute",
          top: 120,
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

      <Text style={{ fontSize: 36, fontWeight: "bold" }}>
        Enter Your Verify Code
      </Text>
      <View style={{ margin: 20 }} />
      <Text style={{ fontSize: 20 }}>
        Please enter the verification code we sent to you
      </Text>
      <View style={{ margin: 20 }} />

      <View style={styles.codeContainer}>
        <TextInput
          ref={input1Ref}
          underlineColor="transparent"
          keyboardType="numeric"
          style={styles.codeInput}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              setCode1(text);
              if (text.length === 0) return;
              if (text.length === 1) input2Ref.current.focus();
            }
          }}
          value={code1}
          maxLength={1}
        />
        <TextInput
          ref={input2Ref}
          underlineColor="transparent"
          keyboardType="numeric"
          style={styles.codeInput}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              setCode2(text);
              if (text.length === 0) input1Ref.current.focus();
              if (text.length === 1) input3Ref.current.focus();
            }
          }}
          value={code2}
          maxLength={1}
        />
        <TextInput
          ref={input3Ref}
          underlineColor="transparent"
          keyboardType="numeric"
          style={styles.codeInput}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              setCode3(text);
              if (text.length === 0) input2Ref.current.focus();
              if (text.length === 1) input4Ref.current.focus();
            }
          }}
          value={code3}
          maxLength={1}
        />
        <TextInput
          ref={input4Ref}
          underlineColor="transparent"
          keyboardType="numeric"
          style={styles.codeInput}
          onChangeText={(text) => {
            if (/^\d*$/.test(text)) {
              setCode4(text);
              if (text.length === 0) input3Ref.current.focus();
            }
          }}
          value={code4}
          maxLength={1}
        />
      </View>

      <View style={{ padding: 20, alignItems: "center" }}>
        <Button style={{ width: 200 }} mode="contained" onPress={handleSend}>
          Continue
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
  },
  codeContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  codeInput: {
    flex: 1, // Expand to fill available space
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    height: 54,
    width: 78,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10, // Set border radius for rounded corners
    textAlign: "center", // Center text within TextInput
    marginHorizontal: 5, // Add horizontal margin between TextInput
  },
});
