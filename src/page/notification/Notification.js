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
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { NotiItem } from "./NotiItem";
import { NotiCreating } from "./NotiCreating";
import { getData } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";

const typeIcon = {
  Appointment: <FontAwesome name="stethoscope" size={24} color="black" />,
  Vaccination: <Fontisto name="injection-syringe" size={23} color="black" />,
  Hotel: <FontAwesome name="building" size={20} color="black" />,
  Gromming: <Fontisto name="scissors" size={20} color="black" />,
};

const list = [
  {
    type: "appointment",
    date: new Date(2023, 10, 26, 13, 0, 0, 0),
  },
  {
    type: "vaccination",
    date: new Date(2023, 10, 26, 13, 0, 0, 0),
  },
  {
    type: "hotel",
    date: new Date(2023, 10, 26, 13, 0, 0, 0),
  },
  {
    type: "grooming",
    date: new Date(2023, 10, 26, 13, 0, 0, 0),
  },
  {
    type: "appointment",
    date: new Date(2023, 10, 26, 13, 0, 0, 0),
  },
  {
    type: "vaccination",
    date: new Date(2023, 10, 26, 13, 0, 0, 0),
  },
  {
    type: "hotel",
    date: new Date(2023, 10, 26, 13, 0, 0, 0),
  },
  {
    type: "grooming",
    date: new Date(2023, 10, 26, 13, 0, 0, 0),
  },
];

const timeFormat = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

const dateFormat = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const Notification = ({ navigation }) => {
  const [notiCreating, setNotiCreating] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState(new Date());
  const [bookDate, setBookDate] = useState(
    moment(new Date()).format("yyy-mmm-dd")
  );
  const currentDate = moment().toISOString();

  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");

 
      if (data !== null) {
        const userData = JSON.parse(data);
        const id = userData[0].id;
    
        getData(`Notification/getAllAtDay/${currentDate}?UserId=${id}`)
          .then((e) => {
            console.log('====================================');
            console.log(2222, currentDate);
            console.log('====================================');
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
 
  useFocusEffect(
    useCallback(() => {
      getStoredUserId();
      return () => {};
    }, [])
  );

  return (
    <View style={style.main}>
      <View style={style.titleAndDate}>
        <View style={style.titleAndRollback}>
          {/* <Button style={style.rollbackBtn} onPress={handleNotiCreating}>
            <AntDesign name="left" size={22} color="#8C8EA3" />
          </Button> */}
          <Text style={style.title}>Notification</Text>
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
                <NotiItem key={index} index={index}>
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
                        {/* <Text>{timeFormat.format(item.timeRemind)}</Text> */}
                      </View>
                      {/* <Text>{dateFormat.format(item.dateRemind)}</Text> */}
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
    height: 136,
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
});
