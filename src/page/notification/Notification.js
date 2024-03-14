import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Card } from "@rneui/base";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native";
import { NotiItem } from "./NotiItem";
import { NotiCreating } from "./NotiCreating";
import { getData } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

const typeIcon = {
  Appointment: <FontAwesome name="stethoscope" size={24} color="black" />,
  Vaccination: <Fontisto name="injection-syringe" size={23} color="black" />,
  Hotel: <FontAwesome name="building" size={20} color="black" />,
  Gromming: <Fontisto name="scissors" size={20} color="black" />,
};

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Notification = ({ navigation }) => {
  const [notiCreating, setNotiCreating] = useState(false);
  const [id, setId] = useState(null);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const currentDate = moment().toISOString();
  const [selectedDateIndex, setSelectedDateIndex] = useState(4); // Index of selected date
  const [dates, setDates] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [bookDate, setBookDate] = useState(
    moment(new Date()).format("ddd MMM DD YYYY")
  );
  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  console.log(bookDate)
  console.log(currentDate)

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const isoString = date.toISOString();
    return isoString;
  }
  const onChange = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      const tmp = new Date();
      const checkDate = new Date(tmp);
      checkDate.setDate(tmp.getDate() - 1);
      if (currentDate <= checkDate) {
        Alert.alert("Warning", "Please select a future date");
        toggleDatepicker();
      } else {
        setDate(currentDate);
        if (Platform.OS === "android") {
          toggleDatepicker();
          setBookDate(currentDate.toDateString());
        }
        toggleDatepicker();
      }
    } else if (type === "dismissed") {
      toggleDatepicker();
    }
  };


  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");


      if (data !== null) {
        const userData = JSON.parse(data);
        const id = userData[0].id;
        setId(id)
        getData(`Notification/getAllAtDay/${formatDate(bookDate)}?UserId=${id}`)
          .then((e) => {
            setData(e.data)
          })
          .catch((e) => {
            console.log(e);
          });

      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  useEffect(() => {
    if (id) {
      getData(`Notification/getAllAtDay/${formatDate(bookDate)}?UserId=${id}`)
        .then((e) => {
          setData(e.data)
        })
        .catch((e) => {
          console.log(e);
        });

    } else {
      console.log("No data found in AsyncStorage.");
    }

  }, [bookDate]);

  useFocusEffect(
    useCallback(() => {
      getStoredUserId();
      setDate(new Date())
      setBookDate(moment(new Date()).format("ddd MMM DD YYYY"))
      return () => {
        setDate(new Date())
      };
    }, [])
  );
  function convertSecondsToTime(seconds) {
    // Sử dụng Moment.js để tạo đối tượng Duration từ số giây
    const duration = moment.duration(seconds, 'seconds');

    // Sử dụng các phương thức của đối tượng Duration để lấy số giờ, phút và giây
    const hours = duration.hours();
    const minutes = duration.minutes();
    const remainingSeconds = duration.seconds();

    // Trả về thời gian dưới dạng một đối tượng
    return hours + ":" + minutes

  }
  function convertDate(oldDate, oldFormat, newFormat) {
    // Sử dụng Moment.js để chuyển đổi ngày từ định dạng cũ sang định dạng mới
    return moment(oldDate, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY");
  }
  return (
    <View style={style.main}>
      <View style={style.titleAndDate}>
        <View style={style.titleAndRollback}>
          {/* <Button style={style.rollbackBtn} onPress={handleNotiCreating}>
            <AntDesign name="left" size={22} color="#8C8EA3" />
          </Button> */}
          <Text style={style.title}>Notification</Text>
        </View>
        {/* <View style={style.selectedDate}>
          <Card
            containerStyle={{
              ...style.selectedDateContent,
              ...style.cartShadow,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={style.daysContainer}>
                {dates.map((date, index) => (
                  <Card
                    key={index}
                    containerStyle={index === selectedDateIndex ? style.selectedDayCard : style.dayCard}
                    onPress={() => handleDateSelection(index)}
                  >
                    <View style={style.dayContent}>
                      <Card.Title style={{ fontSize: 20, color: "#000" }}>
                      {date.toLocaleDateString('en', { weekday: 'short' }).split(',')[0]}
                      </Card.Title>
                      <Card.Title style={{ fontSize: 20, color: "#000" }}>
                      {date.getDate()}
                      </Card.Title>
                     
                    </View>
                  </Card>
                ))}
              </View>
            </ScrollView>
          </Card>
        </View> */}
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

          </Card>
        </View>

      </View>
      {!notiCreating ? (
        <Card containerStyle={{ ...style.list, ...style.cartShadow }}>
          <View style={style.listHeader}>
            <View style={style.titleAndInsertBtn}>
              <Text style={style.listTitle}>Task</Text>
              {/* <Button
                style={style.addBtn}
                onPress={() => setNotiCreating(true)}
              >
                <AntDesign name="pluscircleo" size={20} color="#8C8EA3" />
              </Button> */}
              <Button
                style={style.addBtn}
                onPress={() => navigation.navigate("AddTaskFromHome")}
              >
                <AntDesign name="pluscircleo" size={20} color="#8C8EA3" />
              </Button>
            </View>
            <View>
              <Text style={style.listDescription}>
                Add daily reminders and set shedule
              </Text>
            </View>
          </View>
          <View>
            <ScrollView style={style.listContent}>
              {data.map((item, index) => (
                <NotiItem key={index} index={index} >
                  <View style={style.itemContent}>
                    <View style={style.taskType}>
                      {typeIcon[item.nameMedicine]}
                      <Text style={style.typeTitle}>
                        Booked {capitalizeFirstLetter(item.nameMedicine)}
                      </Text>
                    </View>
                    <View style={style.taskDateAndTime}>
                      <View style={style.BellIconAndTime}>
                        <FontAwesome name="bell-o" size={24} color="black" />
                        <Text>{convertSecondsToTime(item.timeRemind)}</Text>
                      </View>
                      <Text>{convertDate(item.dateRemind)}</Text>
                    </View>
                  </View>
                </NotiItem>
              ))}
              <View style={{ height: 100 }}></View>
            </ScrollView>
          </View>
        </Card>
      ) : (
        <NotiCreating />
      )}
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
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 9999,
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
    width: "100%",
    height: 60,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedDateContent: {
    width: "100%",
    height: "100%",
  },

  cartShadow: {
    borderRadius: 15,
    elevation: 5, // Tăng độ nâng để tạo bóng mờ (Android)
    shadowColor: "rgba(0, 0, 1, 1.2)", // Màu của bóng
    shadowOffset: { width: 0, height: 2 }, // Kích thước và hướng của bóng
    shadowOpacity: 0.8, // Độ đậm của bóng
    shadowRadius: 4, // Bán kính của bóng
  },

  list: {
    width: "100%",
  },

  listHeader: {
    width: "100%",
  },

  titleAndInsertBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  listTitle: {
    fontSize: 32,
    fontWeight: "500",
  },

  addBtn: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  listDescription: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8C8EA3",
    marginBottom: 5,
  },

  listContent: {
    width: "100%",
    height: 395,
  },

  itemContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  taskType: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },

  typeTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  taskDateAndTime: {
    display: "flex",
  },

  BellIconAndTime: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayCard: {
    borderRadius: 15,
    borderColor: '#8C8EA3',
    shadowRadius: 4,
    padding: 10,
    height: 80,
    width: 80,
    marginHorizontal: 5,
  },
  selectedDayCard: {
    borderRadius: 15,
    borderColor: '#8C8EA3',
    shadowRadius: 4,
    padding: 10,
    height: 80,
    width: 80,
    marginHorizontal: 5,
    backgroundColor: '#F0F0F0', // Highlight selected day
  },
  dayContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    // width: 40,
    // height: 80,
  },
  dayOfWeek: {
    fontSize: 20,
    color: '#000',
    padding: 0
  },
  dayOfMonth: {
    fontSize: 20,
    color: '#000',
  },
});
