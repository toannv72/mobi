import { AntDesign } from "@expo/vector-icons";
import { Card } from "@rneui/base";
import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import booking from "../../../assets/s1.png";
import marker from "../../../assets/location.png";
import star from "../../../assets/star.png";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getData } from "../../api/api";

export const Booking = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigation = useNavigation();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [provider, setProvider] = useState({});
  const route = useRoute();
  const { id } = route.params;
  useEffect(() => {
    getData(`/providers/getInformation/${id}`)
      .then((res) => {
        setProvider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getNextDays = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const nextDays = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date();
      nextDate.setDate(currentDate.getDate() + i);
      const day = days[nextDate.getDay()];
      const date = nextDate.getDate();
      nextDays.push({ day, date });
    }
    return nextDays;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const renderNextDays = () => {
    const nextDays = getNextDays();
    return nextDays.map((day, index) => (
      <TouchableOpacity key={index} onPress={() => handleCardPress(index)}>
        <Card
          containerStyle={{
            borderRadius: 15,
            borderColor: "black",
            shadowRadius: 4,
            backgroundColor: selectedCardIndex === index ? "#8C8EA3" : "white",
            width: 80,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: selectedCardIndex === index ? "white" : "#000",
              }}
            >
              {day.day}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: selectedCardIndex === index ? "white" : "#000",
              }}
            >
              {day.date}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    ));
  };
  const handleCardPress = (index) => {
    setSelectedCardIndex(index);
  };

  const currentMonth = currentDate.toLocaleString("en-US", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const getNextTimes = () => {
    const times = [
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:00 AM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
    ];
    return times.map((time) => ({ time }));
  };

  const handleTimeCardPress = (index) => {
    setSelectedTimeIndex(index);
  };

  const renderNextTimes = () => {
    const nextTimes = getNextTimes();
    return nextTimes.map((time, index) => (
      <TouchableOpacity key={index} onPress={() => handleTimeCardPress(index)}>
        <Card
          containerStyle={{
            borderRadius: 15,
            borderColor: "black",
            shadowRadius: 4,
            backgroundColor: selectedTimeIndex === index ? "#8C8EA3" : "white",
            padding: 5,
            width: 80,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: selectedTimeIndex === index ? "white" : "#000",
              }}
            >
              {time.time}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    ));
  };

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
          <Text style={style.title}>Booking</Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: "white" }}
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
                  source={{ url: provider?.data?.imageProvide }}
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
            <Card
              containerStyle={{
                ...style.selectedDateContent,
                ...style.cartShadow,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 32 }}>Choose Date</Text>
              <Text style={{ fontWeight: 400, fontSize: 22, left: 15 }}>
                {currentMonth} {currentYear}
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ backgroundColor: "white" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    paddingVertical: 10,
                    left: -10,
                  }}
                >
                  {renderNextDays()}
                </View>
              </ScrollView>
            </Card>
          </View>
          <View style={style.selectedDate}>
            <Card
              containerStyle={{
                ...style.selectedDateContent,
                ...style.cartShadow,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 32 }}>Choose Time</Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  width: 400,
                  left: -40,
                }}
              >
                {renderNextTimes()}
              </View>
            </Card>
          </View>
          <TouchableOpacity
            style={style.nextBtnV2}
            onPress={() => navigation.navigate("Completedv2")}
          >
            <Text style={style.nextV2}>Continue</Text>
          </TouchableOpacity>
          <View style={{ height: 200 }}></View>
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
