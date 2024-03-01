import { AntDesign } from "@expo/vector-icons";
import { Card } from "@rneui/base";
import React, { useState, useEffect } from "react";
import {
  Platform,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import booking from "../../../assets/s1.png";
import marker from "../../../assets/location.png";
import star from "../../../assets/star.png";
import { Button, RadioButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getData } from "../../api/api";

export const Offering = () => {
  const navigation = useNavigation();
  const [provider, setProvider] = useState({});
  const [offerings, setOfferings] = useState([]);
  const route = useRoute();
  const { id } = route.params;
  useEffect(() => {
    getData(`/providers/getInformation/${id}`)
      .then((res) => {
        setProvider(res.data);
        setOfferings(res.data.data.offerProviders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={style.main}>
      <View style={style.titleAndDate}>
        <View style={style.titleAndRollback}>
          <Button
            style={style.rollbackBtn}
            onPress={() => navigation.navigate("Service")}
          >
            <AntDesign name="left" size={22} color="#8C8EA3" />
          </Button>
          <Text style={style.title}>Services</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: "white",
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}
        >
          <View style={style.selectedDate}>
            <Card
              containerStyle={{
                ...style.selectedDateContent,
                ...style.cartShadow,
              }}
            >
              <View style={{ flexDirection: "row", width: 200, padding: 10 }}>
                <Image
                  source={{ uri: provider?.data?.imageProvider }}
                  style={{ width: 150, height: 100, borderRadius: 10 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 16,
                      marginLeft: 10,
                      width: 200,
                    }}
                  >
                    {provider?.data?.providerName}
                  </Text>
                  <View
                    style={{
                      width: 150,
                      flexDirection: "column",
                      marginTop: 10,
                      marginLeft: 10,
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <Image source={star} style={{ width: 30, height: 30 }} />
                      <Text style={{ alignSelf: "center", fontSize: 14 }}>
                        {provider?.data?.rating == 0
                          ? 5
                          : provider?.data?.rating}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <Image source={marker} />
                      <Text style={{ fontSize: 10 }}>
                        {provider?.data?.location}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Text
                style={{
                  paddingVertical: 10,
                  textAlign: "center",
                  fontWeight: 200,
                  fontSize: 12,
                }}
              >
                {provider?.data?.description}
              </Text>
            </Card>
          </View>

          <View style={style.selectedDate}>
            {offerings.map((offerProvider, index) => (
              <Card
                key={index}
                containerStyle={{
                  ...style.selectedDateContent,
                  ...style.cartShadow,
                }}
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      key={index}
                      style={{
                        width: 200,
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 20 }}>
                        {offerProvider?.offerings?.serviceName}
                      </Text>
                      <Text style={{ fontSize: 16 }}>
                        {offerProvider?.offerings?.price.toLocaleString(
                          "vi-VN",
                          { style: "currency", currency: "VND" }
                        )}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        alignSelf: "center",
                        marginRight: 10,
                        borderWidth: 0.2,
                        borderRadius: 8,
                        backgroundColor: "#484B61",
                      }}
                      onPress={() =>
                        navigation.navigate("Booking", {
                          id: id,
                          offersId: offerProvider?.offerings?.offerId,
                          fee: offerProvider?.offerings?.price,
                        })
                      }
                    >
                      <Text
                        style={{
                          paddingHorizontal: 30,
                          paddingVertical: 10,
                          color: "white",
                        }}
                      >
                        Book
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    width: "100%",
    height: "100%",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    gap: 20,
    paddingHorizontal: "5%",
    paddingTop: "15%",
  },

  titleAndDate: {
    width: "100%",
  },

  titleAndRollback: {
    height: 48,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },

  rollbackBtn: {
    position: "absolute",
    left: -10,
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  title: {
    position: "absolute",
    right: 0,
    left: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "600",
  },

  selectedDate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedDateContent: {
    width: "100%",
  },

  cartShadow: {
    borderRadius: 15,
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 20 },
    shadowOpacity: 0,
    shadowRadius: 4,
  },
  nextBtnV2: {
    width: "100%",
    borderWidth: 0.2,
    borderRadius: 32,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#8C8EA3",
  },
  nextV2: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
});
