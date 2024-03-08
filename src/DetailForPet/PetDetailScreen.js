import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { IconButton } from "react-native-paper";
import OverviewScreen from "./OverViewScreen";
import AppointmentScreen from "./AppointmentScreen";
import MedicalRecordScreen from "./MedicalRecordScreen";
import { useRoute } from "@react-navigation/native";
import { getData } from "../api/api";
export default function PetDetailScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [pet, setPet] = useState({});
  const route = useRoute();
  const { id } = route.params;

  // Trong trang PetDetail
  useEffect(() => {
    if (id) {
      getData(`/pets/getPetInformation/${id}`).then((e) => {
        setPet(e.data.data);
        console.log("Pet data:", e.data.data); // Log pet data
        console.log("Pet ID:", e.data.data.petId); // Log petId
      });
    } else {
      console.error("No id found in route params");
    }
  }, [id]);

  const navigateToEditPetProfile = () => {
    navigation.navigate("ChangePetProfile", { petId: pet.petId, petData: pet });
  };
  const renderContent = () => {
    switch (selectedTab) {
      case "Overview":
        return <OverviewScreen pet={pet} />;
      case "Appointment":
        return <AppointmentScreen pet={pet} />;
      case "MedicalRecord":
        return <MedicalRecordScreen pet={pet} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ ...styles.header }}>
        <IconButton
          icon="arrow-left"
          size={35}
          style={styles.backIcon}
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={styles.title}>Your Pet</Text>
        <View
          style={{
            borderColor: "#8C8EA3",
            borderWidth: 1,
            borderRadius: 10,
            width: 401,
            height: 350,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.imageContainer}>
            <Image
              style={{
                ...styles.petImage,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
              }}
              source={{
                uri: pet.imagePet,
              }}
            />
            <TouchableOpacity onPress={navigateToEditPetProfile}>
              <Image
                source={require("../../assets/edit.png")}
                style={{
                  marginTop: -280,
                  marginLeft: 360,
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.petInfoContainer}>
            <View style={styles.leftInfo}>
              <Text style={{ ...styles.petName, marginTop: -43 }}>
                {pet.name}
              </Text>
              <View style={styles.petDetailsContainer}>
                <Text style={{ ...styles.petDetailsText, marginBottom: 6 }}>
                  {pet.species}
                </Text>
              </View>
              <View style={{ ...styles.dot }} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Overview" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("Overview")}
          >
            <Text
              style={[
                styles.tabButtonText,
                { color: selectedTab === "Overview" ? "#FFFFFF" : "#484B61" },
              ]}
            >
              Overview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "Appointment" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("Appointment")}
          >
            <Text
              style={[
                styles.tabButtonText,
                {
                  color: selectedTab === "Appointment" ? "#FFFFFF" : "#484B61",
                },
              ]}
            >
              Appointment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab === "MedicalRecord" && styles.selectedTab,
            ]}
            onPress={() => setSelectedTab("MedicalRecord")}
          >
            <Text
              style={[
                styles.tabButtonText,
                {
                  color:
                    selectedTab === "MedicalRecord" ? "#FFFFFF" : "#484B61",
                },
              ]}
            >
              Medical Record
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  petImage: {
    width: 400,
    height: 279,
    marginBottom: 35,
  },
  imageContainer: {
    position: "relative",
  },
  editIcon: {
    color: "#8C8EA3",
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  petInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leftInfo: {
    marginRight: 20,
  },
  rightInfo: {
    marginLeft: -10,
  },
  petName: {
    fontSize: 32,
    color: "#000000",
    fontWeight: "500",
  },
  petDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  petDetailsText: {
    fontWeight: "600",
    fontSize: 18,
    color: "#8C8EA3",
    marginLeft: 20,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#8C8EA3",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    marginLeft: -3,
  },
  tabButton: {
    width: 159,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8C8EA3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "#8C8EA3",
    marginTop: 18,
  },
  tabButtonText: {
    fontWeight: "400",
  },
  selectedTab: {
    backgroundColor: "#484B61",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    margin: 18,
    fontWeight: "bold",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 8,
    backgroundColor: "#8C8EA3",
    marginLeft: -1,
    marginTop: -17,
  },
  iconButton: {
    marginLeft: 5, // Khoảng cách giữa biểu tượng và văn bản
  },
  backIcon: {
    position: "absolute",
    top: 5,
    left: 0,
    zIndex: 1,
  },
});
