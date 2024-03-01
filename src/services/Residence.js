import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import s1 from "../../assets/s1.png";
import s2 from "../../assets/s2.png";
import s3 from "../../assets/s3.png";
import s4 from "../../assets/s4.png";
import s5 from "../../assets/s5.png";
import s6 from "../../assets/s6.png";
import s7 from "../../assets/s7.png";
import location from "../../assets/location.png";
import button from "../../assets/next.png";
import star from "../../assets/star.png";
import { useEffect, useState } from "react";
import { getData } from "../api/api";
import { useNavigation } from "@react-navigation/native";

export default function Residence() {
  const navigation = useNavigation();
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    getData("/providers/getAllInformation")
      .then((res) => {
        setProviders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {providers.map((item) => (
        <TouchableOpacity
          style={styles.container}
          key={item.providerId}
          onPress={() =>
            navigation.navigate("Offering", { id: item.providerId })
          }
        >
          <View style={styles.itemContainer}>
            <Image
              source={{ uri: item.imageProvider }}
              style={{ width: 80, height: "auto", borderRadius: 16 }}
            />
            <View style={styles.information}>
              <Text style={styles.name}>{item.providerName}</Text>
              <View style={styles.location}>
                <View style={styles.address}>
                  <Image source={location} />
                  <Text style={styles.street}>{item.location}</Text>
                </View>
              </View>
            </View>
          </View>
          <Image source={button} style={styles.button} />
        </TouchableOpacity>
      ))}
      <View style={{ height: 600 }}></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#E9E7E7",
    gap: 10,
    borderRadius: 10,
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
  },
  information: { flexDirection: "column", justifyContent: "center", gap: 10 },
  name: { fontWeight: "600", fontSize: 18, marginLeft: "3%" },
  location: { flexDirection: "row", gap: 10 },
  address: { flexDirection: "row", gap: 2 },
  street: { fontWeight: "400", fontSize: 12, alignSelf: "center", width: 200 },
  rate: { flexDirection: "row", gap: 2 },
  star: { fontWeight: "400", fontSize: 12, alignSelf: "center" },
  button: { alignSelf: "center", marginRight: 10 },
});
