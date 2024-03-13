import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import { IconButton, Text } from "react-native-paper";
import { Link, useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { getData, postData } from "../api/api";
import { ScrollView } from "react-native-gesture-handler";

export default function Search({}) {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const searchInputRef = useRef(null);
  const [data, setData] = useState([]);
  const [api, setApi] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      searchInputRef.current.focus();
    }, 10);
  }, []);
  const handleGoBack = () => {
    Keyboard.dismiss();
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  };
  const handleSearch = () => {
    if (!search) {
      Alert.alert("Error", "Please enter your search.");
      searchInputRef.current.focus();
      return;
    }
    getData(`/offers/getByCriteria?Name=${search}`)
      .then((data) => {
        setData(data.data);
        if (data.data.length == []) {
          setApi(2);
        } else {
          setApi(1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{ width: "10%", marginLeft: -20, marginTop: "10%" }}>
          <IconButton
            icon="arrow-left-thick"
            iconColor={"#000"}
            size={30}
            onPress={() => handleGoBack()}
          />
        </View>
        <View style={{ width: "84%", marginTop: "10%" }}>
          <TextInput
            ref={searchInputRef}
            placeholder="Search"
            style={{
              padding: 10,
              fontSize: 20,
              borderWidth: 2,
              borderColor: "gray",
              borderRadius: 15,
              backgroundColor: "white",
            }}
            onChangeText={(text) => setSearch(text)}
            value={search}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={{ margin: 10 }} />
      </View>
      {api == 0 ? (
        <View>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              padding: 30,
              textAlign: "center",
            }}
          >
            Bạn Muốn Tìm Gì?
          </Text>
        </View>
      ) : (
        <></>
      )}
      {api == 2 ? (
        <View>
          <Text
            style={{
              color: "black",
              fontSize: 20,
              padding: 30,
              textAlign: "center",
            }}
          >
            Không Tìm Thấy dịch vụ
          </Text>
        </View>
      ) : (
        <></>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.map((item) => (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    display: "flex",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 24,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  origin: {
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 10, // Bóng đổ cho Android
    shadowColor: "#000", // Màu của bóng đổ cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  element: { borderBottomWidth: 0.2, padding: 5, backgroundColor: "white" },
  cardBooking: {
    flexDirection: "row",
    marginVertical: "3%",
    justifyContent: "space-between",
  },
  information: {
    marginLeft: "4%",
  },
  name: { width: 150, fontWeight: "600", fontSize: 16, color: "#000000" },
  lastVisit: {
    width: 150,
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
