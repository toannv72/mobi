import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./src/page/Home";
import LoginScreen from "./src/page/Login";
import SignUpScreen from "./src/page/SignUp";
import { IntroSlider } from "./src/page/Intro";
import { Survey } from "./src/page/Survey";
import { Notification } from "./src/page/notification/Notification";
import UpImg from "./src/Components/UpImg";
import { View } from "native-base";
import { StyleSheet } from "react-native";
import { NativeBaseConfigProvider } from "native-base";
import CheckOut from "./src/page/payment/checkout";
import Completed from "./src/page/payment/Complete";
import ChangeProfile from "./src/page/ChangeProfile";
import ProfileSettingScreen from "./src/page/Profile";
import ImagePickerExample from "./src/Components/UpImg";
import PetDetailScreen from "./src/page/DetailForPet/PetDetailScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Survey">
        <Stack.Screen
          name="ImagePickerExample"
          options={{ headerLeft: null, headerShown: false }}
          component={ImagePickerExample}
        />
        <Stack.Screen
          name="Login"
          options={{ headerLeft: null, headerShown: false }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{ headerLeft: null, headerShown: false }}
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Homes"
          options={{ headerLeft: null, headerShown: false }}
          component={MyBottomNavigationBar}
        />
        <Stack.Screen
          name="IntroSlider"
          options={{ headerLeft: null, headerShown: false }}
          component={IntroSlider}
        />
        <Stack.Screen
          name="Survey"
          options={{ headerLeft: null, headerShown: false }}
          component={Survey}
        />
        <Stack.Screen
          name="ChangeProfile"
          options={{ headerLeft: null, headerShown: false }}
          component={ChangeProfile}
        />
        <Stack.Screen
          name="CheckOut"
          options={{ headerLeft: null, headerShown: false }}
          component={CheckOut}
        />
        <Stack.Screen
          name="Completed"
          options={{ headerLeft: null, headerShown: false }}
          component={Completed}
        />
        <Stack.Screen
          name="PetDetail"
          options={{ headerLeft: null, headerShown: false }}
          component={PetDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF", // Đặt màu nền trắng cho toàn bộ ứng dụng
  },
});
function MyBottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "ios-search" : "ios-search-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "Notification") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Clinics") {
            iconName = focused ? "clipboard" : "clipboard-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen
        name="Home"
        options={{ headerShown: false }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Clinics"
        options={{ headerShown: false }}
        component={Survey}
      />
      <Tab.Screen
        name="Notification"
        options={{ headerShown: false }}
        component={Notification}
      />
      <Tab.Screen
        name="Profile"
        options={{ headerShown: false }}
        component={ProfileSettingScreen}
      />
    </Tab.Navigator>
  );
}

export default App;
