import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Text, List, Icon, IconButton } from "react-native-paper";
import Model from "../Components/Modal";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../api/api";

export default function ProfileSettingScreen({}) {
  const [userData, setUserData] = useState({});
  const [expanded, setExpanded] = useState({});
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const list2 = [
    {
      name: "Account Setting",
      icon: require("../../assets/Setting_line_light.png"),
    },
    {
      name: "Password",
      icon: require("../../assets/Unlock_light.png"),
    },
    {
      name: "Location Setting",
      icon: require("../../assets/location.png"),
    },
    {
      name: "Payment Method",
      icon: "credit-card",
    },
    {
      name: "Help Center",
      icon: require("../../assets/Question_light.png"),
    },
  ];

  const handClose = () => {
    setShow(false);
  };
  const log = (item) => {
    if (item.name === "Password") {
      navigation.navigate("Password", { item });
    } else if (item.name === "Account Setting") {
      navigation.navigate("ChangeProfile", { item }); // Sửa "Change Profile" thành "ChangeProfile"
    } else if (item.name === "Logout") {
      handleLogout();
    }
  };

  const hadShow = () => {
    setShow(true);
  };
  const handleLogout = () => {
    AsyncStorage.removeItem("@myKey")
      .then(() => {
        console.log("Data removed successfully!");
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error removing data:", error);
      });
  };
  // Trong một thành phần hoặc một hàm nào đó
  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");

      if (data !== null) {
        const userData = JSON.parse(data);
        const id = userData[0].id;

        const endpoint = `/users/getInformation/${id}`;
        const response = await getData(endpoint);

        // Cập nhật trạng thái userData
        setUserData(response.data.result.data);

        console.log("User Information:", response.data);
      } else {
        console.log("No data found in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    // Gọi hàm getStoredUserId khi component được tạo ra
    getStoredUserId();
  }, []); // Thêm mảng rỗng để đảm bảo useEffect chỉ chạy một lần
  return (
    <ScrollView
      style={{ backgroundColor: "#F6F6F6" }}
      contentContainerStyle={styles.container}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image
          size={80}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b",
          }}
          style={{ marginLeft: 25, marginBottom: -70 }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingRight: 150,
          }}
        >
          <View>
            <Text
              style={{
                marginTop: 60,
                fontSize: 23,
                fontWeight: "bold",
                marginLeft: 7,
              }}
            >
              Hi {userData.fullName} !
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 21,
                marginLeft: 7,
                color: "rgba(140, 142, 163, 1)",
              }}
            >
              {" "}
              2-2-2000
            </Text>
          </View>
          {/* <IconButton
            icon="pen"
            size={35}
            style={{
              marginBottom: 60,
            }}
            onPress={() => navigation.navigate("ChangeProfile")}
          /> */}
        </View>
      </View>
      <View style={{ height: 35 }} />

      {list2.map((item, index) => (
        <View key={index}>
          <List.Item
            title={item.name}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            // right={(props) => <List.Icon {...props} icon="arrow-right" />}
            onPress={() => log(item)}
            titleStyle={styles.titleStyle}
            style={{
              backgroundColor: "#F6F6F6",
              fontWeight: "bold",
              marginBottom: 5,
            }}
          />
          {index < list2.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
      <View style={styles.separator} />
      <List.Item
        title="Logout"
        left={(props) => <List.Icon {...props} icon="logout" />}
        onPress={() => log({ name: "Logout" })}
        titleStyle={{ fontSize: 19, fontWeight: "bold", marginLeft: 0 }}
      />
      <View style={styles.updateAccountContainer}>
        <List.Item
          title={
            <Text style={styles.updateAccountText} onPress={hadShow}>
              Update Your Account
            </Text>
          }
          style={styles.updateAccount}
        />
      </View>
      <Model shows={show} handClose={handClose} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
  },
  updateAccountContainer: {
    height: 200,
    justifyContent: "center",
    width: 220,
    height: 140,
    marginLeft: 75,
    marginVertical: 10,
  },
  updateAccount: {
    backgroundColor: "#C660F6",
    alignItems: "center",
    borderRadius: 10,
  },
  updateAccountText: {
    textAlign: "center",
    fontSize: 18,
    color: "white",
    fontWeight: 700,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 19,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC", // Màu của đường kẻ
    marginVertical: 5,
  },
  backIcon: {
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 1,
  },
});
