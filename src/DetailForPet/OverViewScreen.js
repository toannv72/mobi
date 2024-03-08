import moment from "moment";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
const OverviewScreen = ({ pet }) => {
  const { birthDate, species, identifyingFeatures, weight, height, gender } =
    pet;
  const genderStr = gender ? "Female" : "Male";
  const navigation = useNavigation();
  const [selectedPetId, setSelectedPetId] = useState(null);
  const getB = (pet) => {
    const birthday = moment(pet);

    // Ngày hiện tại
    const today = moment();
    const ageYears = today.diff(birthday, "years");
    const ageMonths = today.diff(birthday, "months");
    const age = `${ageYears}Month ${ageMonths % 12}`;
    return ageYears;
  };
  return (
    <ScrollView
      contentContainerStyle={{
        padding: 5,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>
                {" "}
                {getB(pet.birthDate)} Year Old
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{species}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{genderStr}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{identifyingFeatures}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>W: {weight} kg</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>H: {height} cm</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* diff view*/}
        <View style={styles.taskHeader}>
          <IconButton
            icon="check-circle-outline"
            size={26}
            style={{
              ...styles.icon,
              marginLeft: -15,
              marginTop: 1,
              borderRadius: 5, // Điều này sẽ làm cho icon trở thành hình vuông
            }}
          />

          <Text
            style={{
              ...styles.title,
              fontSize: 18,
              marginLeft: -233,
              fontWeight: 600,
              marginBottom: 2,
              marginLeft: -200,
            }}
          >
            Today's Task
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              console.log("pet:", pet);
              console.log("petId111:", pet.petId); // Log petId
              setSelectedPetId(pet.petId); // Set the selectedPetId state
              navigation.navigate("AddTask", { petId: pet.petId });
            }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.taskContainer}>
          <View style={styles.taskRow}>
            <Text
              style={{
                ...styles.taskTitle,
                marginLeft: -10,
                fontWeight: 400,
                fontSize: 16,
                marginBottom: 10,
              }}
            >
              Daily Vitamins
            </Text>
            <View style={styles.timeContainer}>
              <IconButton
                icon="clock-outline"
                size={25}
                style={{ ...styles.clockIcon, marginRight: -5 }}
              />
              <Text
                style={{ ...styles.taskTime, fontWeight: 400, fontSize: 16 }}
              >
                8:00 PM
              </Text>
            </View>
          </View>
          <Text
            style={{ ...styles.taskDescription, fontWeight: 400, fontSize: 13 }}
          >
            Give Dongo His Vitamins
          </Text>
        </View>

        <View style={styles.taskContainer}>
          <View style={styles.taskRow}>
            <Text
              style={{
                ...styles.task2Title,
                fontSize: 16,
                fontWeight: 400,
                marginLeft: -2,
              }}
            >
              Learning “Turn Around”
            </Text>
            <TouchableOpacity
              style={{ ...styles.editButton, marginRight: -270 }}
            >
              <Text
                style={{
                  ...styles.editButtonText,
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#8C8EA3",
                  textDecorationLine: "underline",
                  textDecorationColor: "#8C8EA3",
                  marginRight: 270,
                }}
              >
                Edit Reminder
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                marginBottom: -50,
                color: "#8C8EA3",
                fontWeight: 400,
                fontSize: 12,
                marginLeft: -2,
              }}
            >
              5 Repeats During A Day
            </Text>
            <View style={styles.divider} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // OVERVIEW
  buttonsContainer: {
    marginTop: 1,
    marginLeft: -4,
    zIndex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
    left: 5,
  },
  button: {
    width: 114,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8C8EA3",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#24252B",
  },
  overviewButtonText: {
    fontWeight: 400,
  },
  taskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: -20,
  },

  addButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3F65",
    borderRadius: 10,
    marginBottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Chỉ sử dụng trên Android
  },
  addButtonText: {
    color: "#FFFFFF", // Màu của dấu cộng, thay đổi theo ý muốn
    fontSize: 20,
    fontWeight: "bold",
  },

  // diff view
  taskContainer: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -45,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  clockIcon: {
    marginRight: 5,
  },
  taskTime: {
    fontSize: 14,
  },
  taskDescription: {
    marginTop: -17,
    marginLeft: -10,
  },
  divider: {
    borderBottomColor: "#8C8EA3",
    borderBottomWidth: 1,
    marginTop: 55,
  },
});

export default OverviewScreen;
