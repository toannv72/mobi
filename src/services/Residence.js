import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import image from "../../assets/booking.png";
import location from "../../assets/Location.png";
import button from "../../assets/next.png";
import star from "../../assets/star.png";
const listResidence = [
  {
    id: "1",
    name: "Animals Pet care and store",
    street: "20, Bach Dang",
    rate: "4.8",
  },
  {
    id: "2",
    name: "Juno Pet",
    street: "18 Dien Bien Phu",
    rate: "4.6",
  },
  {
    id: "3",
    name: "Pet ZZ",
    street: "20, Bach Dang",
    rate: "4.8",
  },
  {
    id: "4",
    name: "Animals Pet care and store",
    street: "20, Bach Dang",
    rate: "4.8",
  },
  {
    id: "5",
    name: "Animals Pet care and store",
    street: "20, Bach Dang",
    rate: "4.8",
  },
  {
    id: "6",
    name: "Animals Pet care and store",
    street: "20, Bach Dang",
    rate: "4.8",
  },
  {
    id: "7",
    name: "Animals Pet care and store",
    street: "20, Bach Dang",
    rate: "4.8",
  },
  {
    id: "8",
    name: "Animals Pet care and store",
    street: "20, Bach Dang",
    rate: "4.8",
  },
  {
    id: "9",
    name: "Animals Pet care and store",
    street: "20, Bach Dang",
    rate: "4.8",
  },
  {
    id: "10",
    name: "Animals Pet care and store",
    street: "20, Bach Dang",
    rate: "4.8",
  },
];
export default function Residence() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {listResidence.map((item) => (
        <View style={styles.container} key={item.id}>
          <View style={styles.itemContainer}>
            <Image
              source={image}
              style={{ width: 80, height: "auto", borderRadius: 16 }}
            />
            <View style={styles.information}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.location}>
                <View style={styles.address}>
                  <Image source={location} />
                  <Text style={styles.street}>{item.street}</Text>
                </View>
                <View style={styles.rate}>
                  <Image
                    source={star}
                    style={{ width: 20, height: 20, tintColor: "#8C8EA3" }}
                  />
                  <Text style={styles.star}>{item.rate}</Text>
                </View>
              </View>
            </View>
          </View>
          <Image source={button} style={styles.button}></Image>
        </View>
      ))}
      <View style={{ height: 500 }}></View>
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
  street: { fontWeight: "400", fontSize: 12, alignSelf: "center" },
  rate: { flexDirection: "row", gap: 2 },
  star: { fontWeight: "400", fontSize: 12, alignSelf: "center" },
  button: { alignSelf: "center", marginRight: 10 },
});
