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
import { postData } from "../api/api";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";

export default function SingUpScreen({ navigation }) {
  const { control, handleSubmit, formState: { errors } } = useForm({
  });
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
  const handleSignUp = (data) => {


    if (data.password !== data.repeatPassword) {
      Alert.alert("Error", "Passwords do not match. Please try again.");
      repeatPasswordInputRef.current.focus();
      return;
    }

    try {
      axios
        .post("https://petside.azurewebsites.net/api/users/register-member", {
          fullName: data.fullName,
          email: data.email,
          password: data.repeatPassword,
          repeatPassword: data.password,
          phoneNumber: data.phoneNumber,
        })
        .then((e) => {
          console.log(e.data);
          if (e.data.success == false) {
            Alert.alert("Error", e.data.messages);
          }
          if (e.data.success) {
            navigation.navigate("IntroSlider");
          } else {
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error.response);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
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
     <ScrollView showsHorizontalScrollIndicator={false}>
      <Text style={{ fontSize: 26 }}> Create your account</Text>
      <View style={{ margin: 20 }} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label="Full name"
            ref={fullNameInputRef}
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            onSubmitEditing={() => emailInputRef.current.focus()}
          />
        )}
        name="fullName"
      />
      {errors.fullName && errors.fullName.type === 'required' && <Text style={{ color: 'red' }}>Please enter full name</Text>}
      <View style={styles.margin} />
      <Controller
        control={control}
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={emailInputRef}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label="Email"
            mode="outlined"
            left={<TextInput.Icon icon="account" />}
            onSubmitEditing={() => phoneInputRef.current.focus()}
          />
        )}
        name="email"
      />
      {errors.email && errors.email.type === 'required' && <Text style={{ color: 'red' }}>Please enter email</Text>}
      {errors.email && errors.email.type === 'pattern' && <Text style={{ color: 'red' }}>Invalid email</Text>}


      {/* <TextInput
        ref={emailInputRef}
        label="Email"
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        left={<TextInput.Icon icon="email" />}
        onSubmitEditing={() => phoneInputRef.current.focus()}
      /> */}

      <View style={styles.margin} />
      <Controller
        control={control}
        // rules={{ required: true, pattern: /^[0-9]*$/ }}
        rules={{ required: true,  pattern: /^0[0-9]{9}$/ }}

        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={phoneInputRef}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label="Phone number"
            mode="outlined"
            keyboardType="number-pad"
            left={<TextInput.Icon icon="phone" />}
            onSubmitEditing={() => passwordInputRef.current.focus()}

          />
        )}
        name="phoneNumber"
      />
      {errors.phoneNumber && errors.phoneNumber.type === 'required' && <Text style={{ color: 'red' }}>Please enter the phone number</Text>}
      {errors.phoneNumber && errors.phoneNumber.type === 'pattern' && <Text style={{ color: 'red' }}>Invalid phone number</Text>}

      {/* <TextInput
        ref={phoneInputRef}
        label="Phone number"
        mode="outlined"
        value={phoneNumber}
        keyboardType="number-pad"
        onChangeText={handleInputChange}
        left={<TextInput.Icon icon="phone" />}
        onSubmitEditing={() => passwordInputRef.current.focus()}
      /> */}

      <View style={styles.margin} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={passwordInputRef}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label="Password"
            mode="outlined"
            secureTextEntry
            left={<TextInput.Icon icon="lock" />}
            onSubmitEditing={() => repeatPasswordInputRef.current.focus()}

          />
        )}
        name="password"
      />
      {errors.password && errors.password.type === 'required' && <Text style={{ color: 'red' }}>Please enter a password</Text>}

      {/* <TextInput
        ref={passwordInputRef}
        label="Password"
        mode="outlined"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        onSubmitEditing={() => repeatPasswordInputRef.current.focus()}
        left={<TextInput.Icon icon="lock" />}
      /> */}

      <View style={styles.margin} />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            ref={repeatPasswordInputRef}
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            label="Repeat password"
            mode="outlined"
            
            left={<TextInput.Icon icon="lock" />}
            onSubmitEditing={handleSubmit(handleSignUp)}
            secureTextEntry
          />
        )}
        name="repeatPassword"
      />
      {errors.repeatPassword && errors.repeatPassword.type === 'required' && <Text style={{ color: 'red' }}>Please enter a password</Text>}

      {/* <TextInput
        ref={repeatPasswordInputRef}
        label="Repeat password"
        mode="outlined"
        onChangeText={(text) => setRepeatPassword(text)}
        value={repeatPassword}
        secureTextEntry
        onSubmitEditing={handleSignUp}
        left={<TextInput.Icon icon="lock" />}
      /> */}

      <View style={styles.margin} />

      <CustomButton title="Sign up" height={50} onPress={handleSubmit(handleSignUp)} />
      <View style={{ margin: 10 }} />
      <View>
        <Text style={{ textAlign: "center" }}>
          ------------------- Or continue with -------------------
        </Text>
      </View>
      <View style={{ margin: 10 }} />

      <Text
        style={{ textAlign: "center" }}

      >
        Don’t have account? <Text style={{ color: 'blue' }} onPress={() => navigation.navigate("Login")}>Log in</Text>
      </Text>
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
});
