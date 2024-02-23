import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Avatar, Searchbar } from "react-native-paper";
import location from "../../assets/location.png";
import mess from "../../assets/message-notif.png";
import ring from "../../assets/Bell_pin_light.png";
import { useNavigation } from "@react-navigation/native";
import VetVisit from "./VetVisit";
import Grooming from "./Grooming";
import Vaccination from "./Vaccination";
import Residence from "./Residence";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../api/api";
export default function Service() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState({});
  const [currentPage, setCurrentPage] = useState("A");
  const renderContent = () => {
    switch (currentPage) {
      case "A":
        return <VetVisit />;
      case "B":
        return <Grooming />;
      case "C":
        return <Vaccination />;
      case "D":
        return <Residence />;
      default:
        return <VetVisit />;
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

  }, []);
  const getButtonStyle = (page) => {
    return currentPage === page ? styles.selectedButton : styles.button;
  };
  const getTextStyle = (page) => {
    return currentPage === page ? styles.selectedButtonText : styles.buttonText;
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
       <View  style={styles.header}>
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
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Image source={ring} style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      <SafeAreaView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tab}>
            <TouchableOpacity
              style={getButtonStyle("A")}
              onPress={() => setCurrentPage("A")}
            >
              <Text style={getTextStyle("A")}>Vet Visit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle("B")}
              onPress={() => setCurrentPage("B")}
            >
              <Text style={getTextStyle("B")}>Grooming</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle("C")}
              onPress={() => setCurrentPage("C")}
            >
              <Text style={getTextStyle("C")}>Vaccination</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle("D")}
              onPress={() => setCurrentPage("D")}
            >
              <Text style={getTextStyle("D")}>Residence</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView>
        <View>{renderContent()}</View>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    top: "5%",
    padding: 10,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  information: {
    paddingLeft: 20,
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
  tab: {
    flexDirection: "row",
    marginTop: "2%",
  },
  button: {
    width: 120,
    backgroundColor: "#BBBFDE99",
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  selectedButton: {
    width: 120,
    backgroundColor: "#484B61",
    borderRadius: 10,
    padding: 5,
    margin: 10,
  },
  buttonText: {
    padding: 5,
    fontWeight: "400",
    fontSize: 16,
    color: "#8C8EA3",
    textAlign: "center",
  },
  selectedButtonText: {
    padding: 5,
    fontWeight: "400",
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  content: {
    padding: 10,
  },
});
