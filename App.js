import React, { useRef } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/page/Home';
import LoginScreen from './src/page/Login';
import SingUpScreen from './src/page/SingUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './src/page/Profiles';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {

  return (
    <>
      {/* //là trang ko có  thanh bar */}
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" options={{ headerLeft: null, headerShown: false }} component={MyBottomNavigationBar} />
          <Stack.Screen name="Login" options={{ headerLeft: null, headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="SingUp" options={{ headerLeft: null, headerShown: false }} component={SingUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

function MyBottomNavigationBar() {
  return (

    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'ios-search' : 'ios-search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'Notification') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Clinics') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      // tabBarOptions={{
      //   activeTintColor: 'tomato',
      //   inactiveTintColor: 'gray',
      // }} 
      keyboardShouldPersistTaps="handled"
    >
      <Tab.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
      <Tab.Screen name="Clinics" options={{ headerShown: false }} component={LoginScreen} />
      <Tab.Screen name="Notification" options={{ headerShown: false }} component={LoginScreen} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
    </Tab.Navigator>
  );
}


export default App;