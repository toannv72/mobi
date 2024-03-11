import React, { useCallback, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Avatar, ProgressBar, Searchbar } from "react-native-paper";
import { useState } from "react";
import { Card } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import PetProfile from "./PetProfile";
import location from "../../assets/location.png";
import mess from "../../assets/message-notif.png";
import ring from "../../assets/Bell_pin_light.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({});
  const [pet, setPet] = useState([]);
  const navigateToPetProfile = (data) => {
    // Navigate to the pet profile screen
    navigation.navigate("PetDetail", { id: data }); // Make sure to replace 'PetProfileScreen' with the actual name of your pet profile screen.
  };
  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");

      if (data !== null) {
        const userData = JSON.parse(data);
        console.log(2222222222222222,userData);
        const id = userData[0].id;

        const endpoint = `/users/getInformation/${id}`;
        const response = await getData(endpoint);

        // Cập nhật trạng thái userData
        setUserData(response.data.data);

        getData(`users/${id}/pets`).then((e) => {
          setPet(e.data.contents);
        });
      } else {
        console.log("No data found in AsyncStorage.");
        navigation.navigate("Login")
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    // Gọi hàm getStoredUserId khi component được tạo ra
    getStoredUserId();
  }, []);
  useFocusEffect(
    useCallback(() => {
      getStoredUserId();
      return () => {};
    }, [])
  );

  const getB = (data) => {
    const birthday = moment(data);

    // Ngày hiện tại
    const today = moment();
    const ageYears = today.diff(birthday, "years");
    const ageMonths = today.diff(birthday, "months");
    const age = `${ageYears}Month ${ageMonths % 12}`;
    return ageYears;
  };

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <View style={styles.header}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Avatar.Image
                size={50}
                source={{
                  uri: userData.avatar,
                }}
              />
            </TouchableOpacity>
            <View style={styles.information}>
              <Text style={{ marginLeft: 5 }}>Hi {userData.fullName}!</Text>
              <View style={styles.location}>
                <Image source={location} />
                <Text>{userData.address}</Text>
              </View>
            </View>
          </View>
          <View style={styles.notification}>
            <Image source={mess} />
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
            >
              <Image source={ring} style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        </View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 22,
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 30 }}>Your pet</Text>
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "#CCCCE5",
              backgroundColor: "#CCCCE5",
              padding: 10,
              borderRadius: 5,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 9,
              borderRadius: 8,
            }}
            onPress={() => {
              navigation.navigate("AddPet");
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 500 }}>Add Pet</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsHorizontalScrollIndicator={false}>
          <View style={styles.container}>
            {pet.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigateToPetProfile(data.id)}
                style={styles.cardContainer}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 10,
                  }}
                >
                  <View>
                    <Card.Image
                      style={{
                        padding: 0,
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                      }}
                      source={{
                        uri: data.imagePet,
                      }}
                    />
                  </View>
                  <View style={{ width: "auto", marginRight: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text style={{ marginBottom: 10, fontSize: 20 }}>
                          {data.name}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 18 }}>
                          Age:{getB(data.birthDate)}
                        </Text>
                        <Text style={{ marginBottom: 10, fontSize: 18 }}>
                          Gender:{data.gender == "0" ? "Male" : "Female"}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}

            <View style={{ height: 300 }}></View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    fontSize: "10px",
    paddingTop: 28,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fonts: {
    marginBottom: 8,
  },
  inside: {
    height: 20,
    backgroundColor: "tomato", // Màu xanh lá cây
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  cardContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#CCCCE5",
    elevation: 5, // Tăng độ nâng để tạo bóng mờ (Android)
    shadowColor: "rgba(0, 0, 1, 1.2)", // Màu của bóng
    shadowOffset: { width: 0, height: 2 }, // Kích thước và hướng của bóng
    shadowOpacity: 0.8, // Độ đậm của bóng
    shadowRadius: 4, // Bán kính của bóng
  },
  upperSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  lowerSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardContainer2: {
    borderRadius: 16,
    backgroundColor: "#484B61",
    paddingVertical: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "40%", // Điều chỉnh kích thước của thẻ Card tùy thuộc vào nhu cầu
    height: 100,
  },
  information: {
    paddingLeft: 20,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  location: {
    flexDirection: "row",
    marginTop: 6,
  },
  notification: {
    marginLeft: "15%",
    flexDirection: "row",
    alignItems: "center",
  },
  searchbar: {
    marginTop: "2%",
  },
});
