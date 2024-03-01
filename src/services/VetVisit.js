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
import marker from "../../assets/location.png";
import { getData } from "../api/api";
import { useNavigation } from "@react-navigation/native";

export default function VetVisit() {
  const navigation = useNavigation();
  const [offers, setOffers] = React.useState([]);
  useEffect(() => {
    getData("/offers/getByCriteria?Category=Vet Visit")
      .then((res) => {
        setOffers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.header1}>Book With New Veterinarian</Text>
      {offers?.map((item) => (
        <View style={styles.element} key={item.offerId}>
          <View style={styles.cardBooking}>
            <View style={{ flexDirection: "row", width: 200 }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 80, height: 80 }}
              />
              <View style={styles.information}>
                <Text
                  style={styles.name}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.serviceName}
                </Text>
                <Text
                  style={styles.lastVisit}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.description}
                </Text>
                <Text style={styles.address}>
                  {item.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.bookingBtn}
              onPress={() =>
                navigation.navigate("Booking", {
                  offersId: item.offerId,
                  fee: item.price,
                })
              }
            >
              <Text style={styles.titleButton}>Booking</Text>
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
  name: { width: 180, fontWeight: "600", fontSize: 16, color: "#000000" },
  lastVisit: {
    width: 180,
    marginLeft: 2,
    fontWeight: "400",
    fontSize: 12,
    color: "#8C8EA3",
  },
  location: { flexDirection: "row", alignItems: "center" },
  address: { fontWeight: "400", fontSize: 20, color: "#8C8EA3", width: 175 },
  bookingBtn: {
    marginLeft: "10%",
    alignSelf: "center",
    borderWidth: 0.2,
    borderRadius: 8,
    shadowColor: "#00000040",
    backgroundColor: "#484B61",
  },
  titleButton: { paddingHorizontal: 30, paddingVertical: 10, color: "white" },
});
