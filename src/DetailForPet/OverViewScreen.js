import moment from "moment";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { getData } from "../api/api";
const OverviewScreen = ({ pet }) => {
  const { birthDate, species, identifyingFeatures, weight, height, gender } =
    pet;
  const genderStr = gender ? "Female" : "Male";
  const navigation = useNavigation();
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [data, setData] = useState([]);
  const date = moment(new Date()).format("YYYY-MMM-DD");
  const getB = (pet) => {
    const birthday = moment(pet);
    const today = moment();
    const ageYears = today.diff(birthday, "years");
    const ageMonths = today.diff(birthday, "months");
    const age = `${ageYears}Month ${ageMonths % 12}`;
    return ageYears;
  };
  useEffect(() => {
    // getData(`/Notification/getAllAtDay/${date}?PetId=${pet.petId}`)
    getData(`/Notification/getAllAtDay/${date}?PetId=${pet.petId}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  });
  const convertSecondsToAMPM = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const period = hours >= 12 ? "PM" : "AM";
    const hour12Format = hours % 12 || 12; // Đảm bảo rằng 12 giờ trở thành 12 AM/PM thay vì 0 AM/PM
    return `${hour12Format}:${minutes.toString().padStart(2, "0")} ${period}`;
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
          <View style={{ flexDirection: "row" }}>
            <IconButton
              icon="check-circle-outline"
              size={26}
              style={{
                alignSelf: "center",
                borderRadius: 5, // Điều này sẽ làm cho icon trở thành hình vuông
              }}
            />

            <Text
              style={{
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 2,
                alignSelf: "center",
              }}
            >
              Todays Task
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              console.log("pet:", pet);
              console.log("petId111:", pet.petId); // Log petId
              setSelectedPetId(pet.petId); // Set the selectedPetId state
              navigation.navigate("AddTask", {
                petId: pet.petId,
                imagePet: pet.imagePet,
              });
            }}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        {data.map((item) => (
          <View style={styles.taskContainer} key={item.index}>
            <View style={styles.taskRow}>
              <Text
                style={{
                  fontSize: 24,
                }}
              >
                {item.nameMedicine}
              </Text>
              <View style={styles.timeContainer}>
                <IconButton
                  icon="clock-outline"
                  size={30}
                  style={{
                    ...styles.clockIcon,
                    marginRight: -5,
                    marginTop: -5,
                  }}
                />
                <Text style={{ fontWeight: 400, fontSize: 24 }}>
                  {convertSecondsToAMPM(item.timeRemind)}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontWeight: 400,
                fontSize: 24,
              }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {item.content}
            </Text>
          </View>
        ))}
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
  },

  addButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3A3F65",
    alignSelf: "center",
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
    marginBottom: 10,
    borderWidth: 1,
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timeContainer: {
    flexDirection: "row",
  },
  clockIcon: {
    marginRight: 5,
  },
  taskTime: {
    fontSize: 14,
  },
  divider: {
    borderBottomColor: "#8C8EA3",
    borderBottomWidth: 1,
    marginTop: 55,
  },
});

export default OverviewScreen;
