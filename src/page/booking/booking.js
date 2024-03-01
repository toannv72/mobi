import { AntDesign } from "@expo/vector-icons";
import { Card } from "@rneui/base";
import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
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
import { Button } from "react-native-paper";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { getData, postData } from "../../api/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const Booking = () => {
  const [bookDate, setBookDate] = useState();
  const navigation = useNavigation();
  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(0);
  const [provider, setProvider] = useState({});
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [userData, setUserData] = useState({});
  const format = bookDate + " " + selectedTime;
  useFocusEffect(
    useCallback(() => {
      getStoredUserId();
      return () => {};
    }, [])
  );
  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");

      if (data !== null) {
        const userData = JSON.parse(data);
        const id = userData[0].id;

        const endpoint = `/users/getInformation/${id}`;
        const response = await getData(endpoint);
        setUserData(response.data.data);
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    getStoredUserId();
  }, []);
  const fixFormatDate = () => {
    const inputDateString = format;
    const outputDateFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";

    const convertedDate = moment(
      inputDateString,
      "ddd MMM DD YYYY h:mm A"
    ).format(outputDateFormat);
    return convertedDate;
  };
  const fixFormatDate1 = () => {
    const inputDateString = new Date();
    const outputDateFormat = "YYYY-MM-DDTHH:mm:ss.SSS[Z]";

    const convertedDate = moment(
      inputDateString,
      "ddd MMM DD YYYY h:mm A"
    ).format(outputDateFormat);
    return convertedDate;
  };
  console.log("222", fixFormatDate(), fixFormatDate1());
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
        setBookDate(currentDate.toDateString());
      }
      toggleDatepicker();
    }
  };
  const route = useRoute();
  const { offersId, fee } = route.params;
  useEffect(() => {
    getData(`/offers/getInformation/${offersId}`)
      .then((res) => {
        setProvider(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  const handleTimeCardPress = (index, time) => {
    setSelectedTimeIndex(index);
    setSelectedTime(time);
  };

  const renderNextTimes = () => {
    const nextTimes = getNextTimes(0);
    return nextTimes.map((time, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleTimeCardPress(index, time.time)}
      >
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
  const handleBooking = () => {
    postData(
      `/appointment/createAppointment/${userData.id}?listGuidOffer=${offersId}&providerId=0cb84163-3df2-4160-acd0-08dc39513829`,
      {
        bookingDate: fixFormatDate1(),
        returnDate: fixFormatDate(),
        appointmentFee: fee,
      }
    )
      .then((e) => {
        navigation.navigate("Completedv2");
      })
      .catch((err) => console.log(err));
  };
  console.log(userData.id, offersId, fee);
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
                  source={{ uri: provider?.data?.image }}
                  style={{ width: 150, height: 100, borderRadius: 10 }}
                />
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 24,
                      marginLeft: 10,
                      width: 200,
                    }}
                  >
                    {provider?.data?.serviceName}
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
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <Text style={{ fontSize: 18, fontWeight: 500 }}>
                        {provider?.data?.price.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
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
                  fontSize: 16,
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
              {showPicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                />
              )}
              {!showPicker && (
                <Pressable onPress={toggleDatepicker}>
                  <TextInput
                    placeholder="Click here to choose date"
                    value={bookDate}
                    onChangeText={setBookDate}
                    editable={false}
                    style={{
                      color: "black",
                      fontSize: 20,
                      textAlign: "center",
                    }}
                  />
                </Pressable>
              )}
            </Card>
          </View>
          <View style={style.selectedDate}>
            <Card
              containerStyle={{
                ...style.selectedDateContent,
                ...style.cartShadow,
              }}
            >
              <Text style={{ fontWeight: 700, fontSize: 22 }}>Choose Time</Text>
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
            onPress={() => handleBooking()}
          >
            <Text style={style.nextV2}>Booking</Text>
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
