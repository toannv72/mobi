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
import CheckOut from "./src/page/payment/checkout";
import Completed from "./src/page/payment/Complete";
import Completedv2 from "./src/page/booking/Complete";
import ChangeProfile from "./src/page/ChangeProfile";
import ProfileSettingScreen from "./src/page/Profile";
import ImagePickerExample from "./src/Components/UpImg";
import PetDetailScreen from "./src/DetailForPet/PetDetailScreen";
import Service from "./src/services/Service";
import { Booking } from "./src/page/booking/booking";
import AddPet from "./src/DetailForPet/AddPet";
import ChangePetProfile from "./src/DetailForPet/ChangPetProfile";
import { Offering } from "./src/page/booking/offering";
import AddTask from "./src/DetailForPet/AddTask";
import AddTaskFromHome from "./src/DetailForPet/AddTaskFromHome";
import Search from "./src/services/Search";
import ChangePassword from "./src/page/ChangePassword";
import ForgotPasswordScreen from "./src/page/ForgotPassword";
import VerifyScreen from "./src/page/Verify";
import ConfirmPasswordScreen from "./src/page/ConfirmPassword";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homes">
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
          name="Completedv2"
          options={{ headerLeft: null, headerShown: false }}
          component={Completedv2}
        />
        <Stack.Screen
          name="Booking"
          options={{ headerLeft: null, headerShown: false }}
          component={Booking}
        />
        <Stack.Screen
          name="PetDetail"
          options={{ headerLeft: null, headerShown: false }}
          component={PetDetailScreen}
        />
        <Stack.Screen
          name="AddPet"
          options={{ headerLeft: null, headerShown: false }}
          component={AddPet}
        />
        <Stack.Screen
          name="ChangePetProfile"
          options={{ headerLeft: null, headerShown: false }}
          component={ChangePetProfile}
        />
        <Stack.Screen
          name="Offering"
          options={{ headerLeft: null, headerShown: false }}
          component={Offering}
        />
        <Stack.Screen
          name="AddTask"
          options={{ headerLeft: null, headerShown: false }}
          component={AddTask}
        />
        <Stack.Screen
          name="AddTaskFromHome"
          options={{ headerLeft: null, headerShown: false }}
          component={AddTaskFromHome}
        />
        <Stack.Screen
          name="Search"
          options={{ headerLeft: null, headerShown: false }}
          component={Search}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{ headerLeft: null, headerShown: false }}
          component={ChangePassword}
        />
        <Stack.Screen
          name="ForgotPassword"
          options={{ headerLeft: null, headerShown: false }}
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="Verify"
          options={{ headerLeft: null, headerShown: false }}
          component={VerifyScreen}
        />
        
        <Stack.Screen
          name="ConfirmPassword"
          options={{ headerLeft: null, headerShown: false }}
          component={ConfirmPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

function MyBottomNavigationBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          // bottom: 25,
          // left: 20,
          // right: 20,
          elevation: 0,
          backgroundColor: "#484B61",
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          height: 90,
          elevation: 30, // Bóng đổ cho Android
          shadowColor: "#000", // Màu của bóng đổ cho iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
        },
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
          } else if (route.name === "Service") {
            iconName = focused ? "clipboard" : "clipboard-outline";
          }
          return <Ionicons name={iconName} size={size} color={"#F6F6F6"} />;
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
        name="Service"
        options={{ headerShown: false }}
        component={Service}
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
