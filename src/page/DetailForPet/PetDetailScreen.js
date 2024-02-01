// Import thêm TouchableOpacity từ thư viện react-native
import React, { useState } from "react";
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

export default function PetDetailScreen({ navigation }) {
  const [selectedTab, setSelectedTab] = useState("Overview");

  const renderContent = () => {
    switch (selectedTab) {
      case "Overview":
        return <OverviewScreen />;
      case "Appointment":
        return <AppointmentScreen />;
      case "MedicalRecord":
        return <MedicalRecordScreen />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={35}
          style={styles.backIcon}
          onPress={() => navigation.navigate("Home")}
        />
        <Text style={styles.title}>Your Pet</Text>
        <View style={styles.imageContainer}>
          <Image
            style={{ ...styles.petImage, borderRadius: 7 }}
            source={{
              uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
            }}
          />
          <IconButton
            icon="pen"
            size={35}
            style={{
              ...styles.editIcon,
              marginBottom: -80,
              borderColor: "#8C8EA3",
            }}
            color="#f00"
            // onPress={() => navigation.navigate("ChangeProfile")}
          />
        </View>
        <View style={styles.petInfoContainer}>
          <View style={styles.leftInfo}>
            <Text style={styles.petName}>Dongo ♂ </Text>
            <View style={styles.petDetailsContainer}>
              <Text style={styles.petDetailsText}>Pembroke Corgi</Text>
            </View>
            <View style={styles.dot} />
          </View>
          <View style={styles.rightInfo}>
            <View style={styles.locationContainer}>
              <Text style={styles.locationText}>VN, HCM, D9, Phu Huu</Text>
              <IconButton
                icon="google-maps"
                size={20}
                color="#8C8EA3"
                style={styles.iconButton}
              />
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
    height: 360,
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
