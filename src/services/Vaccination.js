import React, { useEffect } from "react";
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
import booking from "../../assets/booking.png";
import marker from "../../assets/location.png";
import Checkbox from "../Components/CheckBox";
import { getData } from "../api/api";
import { useNavigation } from "@react-navigation/native";

export default function Vaccination() {
  const navigation = useNavigation();
  const [providers, setProviders] = React.useState([]);
  const allVets = providers.slice(0, 3);
  useEffect(() => {
    getData("/providers/searchCategory?search=Vaccination")
      .then((res) => {
        console.log("get data successful");
        setProviders(res.data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Error", "Something wrongs!");
      });
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.header1}>Book With Previous Veterinarian</Text>
      {allVets.map((item) => (
        <View style={styles.element} key={item.providerId}>
          <View style={styles.cardBooking}>
            <View style={{ flexDirection: "row", width: 200 }}>
              <Image
                source={{ uri: item.imageProvider }}
                style={{ width: 80, height: 80 }}
              />
              <View style={styles.information}>
                <Text style={styles.name}>{item.providerName}</Text>
                <Text style={styles.lastVisit}>{item.serviceType}</Text>
                <View style={styles.location}>
                  <Image source={marker} />
                  <Text style={styles.address}>{item.location}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookingBtn}
              onPress={() =>
                navigation.navigate("Offering", { id: item.providerId })
              }
            >
              <Text style={styles.titleButton}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <Text style={styles.header1}>Book With New Veterinarian</Text>
      {providers?.map((item) => (
        <View style={styles.element} key={item.providerId}>
          <View style={styles.cardBooking}>
            <View style={{ flexDirection: "row", width: 200 }}>
              <Image
                source={{ uri: item.imageProvider }}
                style={{ width: 80, height: 80 }}
              />
              <View style={styles.information}>
                <Text style={styles.name}>{item.providerName}</Text>
                <Text style={styles.lastVisit}>{item.serviceType}</Text>
                <View style={styles.location}>
                  <Image source={marker} />
                  <Text style={styles.address}>{item.location}</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookingBtn}
              onPress={() =>
                navigation.navigate("Offering", { id: item.providerId })
              }
            >
              <Text style={styles.titleButton}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <View style={{ height: 600 }}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    fontWeight: "700",
    fontSize: 16,
    marginHorizontal: "2%",
    marginLeft: "2%",
  },
  header1: {
    fontWeight: "700",
    fontSize: 16,
    marginVertical: "2%",
    marginLeft: "2%",
  },
  preBooking: { marginTop: "5%", flexDirection: "column" },
  element: { borderBottomWidth: 0.2, padding: 5 },
  cardBooking: {
    flexDirection: "row",
    marginVertical: "3%",
    justifyContent: "space-between",
  },
  information: {
    marginLeft: "4%",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#000000",
  },
  lastVisit: {
    marginBottom: "3%",
    marginLeft: 2,
    fontWeight: "400",
    fontSize: 12,
    color: "#8C8EA3",
  },
  location: { flexDirection: "row", alignItems: "center" },
  address: { fontWeight: "400", fontSize: 12, color: "#8C8EA3", width: 175 },
  bookingBtn: {
    marginLeft: "10%",
    alignSelf: "center",
    borderWidth: 0.2,
    borderRadius: 8,
    shadowColor: "#00000040",
    backgroundColor: "#484B61",
  },
  titleButton: { paddingHorizontal: 30, paddingVertical: 10, color: "white" },
  checkbox: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
    padding: 10,
  },
});
