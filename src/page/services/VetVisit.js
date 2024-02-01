import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { RadioButton } from "react-native-paper";
import booking from "../../../assets/booking.png";
import location from "../../../assets/Location.png";
const veterinarians = [
  {
    id: "1",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "2",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "3",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "4",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "5",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "6",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "7",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "8",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "9",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "10",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  {
    id: "11",
    name: "Tran Duc Huy",
    lastVisit: "10 May 2023",
    address: "D1, Da Kao",
  },
  // ... more items
];

export default function VetVisit() {
  const [checked, setChecked] = React.useState("clinic");
  return (
    <View>
      <View>
        <Text style={styles.header}>Visit Type</Text>
        <View style={styles.radioButton}>
          <View style={styles.radio1}>
            <RadioButton
              value="clinic"
              status={checked === "clinic" ? "checked" : "unchecked"}
              onPress={() => setChecked("clinic")}
            />
            <Text style={styles.nameRadio}>Clinic Visit</Text>
          </View>
          <View style={styles.radio2}>
            <RadioButton
              value="home"
              status={checked === "home" ? "checked" : "unchecked"}
              onPress={() => setChecked("home")}
            />
            <Text style={styles.nameRadio}>Home Visit</Text>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {veterinarians.map((item) => (
          <View style={styles.element}>
            <Text style={styles.header}>Book With Previous Veterinarian</Text>
            <View style={styles.cardBooking}>
              <Image source={booking} style={{ width: 80, height: 80 }} />
              <View style={styles.information}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.lastVisit}>
                  Last Visit {item.lastVisit}
                </Text>
                <View style={styles.location}>
                  <Image source={location} />
                  <Text style={styles.address}>{item.address}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.bookingBtn}>
                <Text style={styles.titleButton}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <View style={{ height: 500 }}></View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: "2%",
    marginLeft: "2%",
  },
  radioButton: {
    flexDirection: "row",
    position: "fixed",
  },
  radio1: {
    flexDirection: "row",
    alignItems: "center",
  },
  radio2: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "30%",
  },
  nameRadio: {},
  preBooking: { marginTop: "5%", flexDirection: "column" },
  element: { borderBottomWidth: 0.2, padding: 5 },
  cardBooking: { flexDirection: "row", marginVertical: "3%" },
  information: {
    marginLeft: "4%",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000000",
    marginBottom: "12%",
  },
  lastVisit: {
    marginBottom: "3%",
    marginLeft: 2,
    fontWeight: "400",
    fontSize: 12,
    color: "#8C8EA3",
  },
  location: { flexDirection: "row", alignItems: "center" },
  address: { fontWeight: "400", fontSize: 12, color: "#8C8EA3" },
  bookingBtn: {
    marginLeft: "10%",
    alignSelf: "center",
    borderWidth: 0.2,
    borderRadius: 8,
    shadowColor: "#00000040",
    backgroundColor: "#3A3F65",
  },
  titleButton: { paddingHorizontal: 30, paddingVertical: 10, color: "white" },
});
