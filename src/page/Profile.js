import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import { Avatar, Text, List, Icon, IconButton } from "react-native-paper";
import momoIcon from "../../assets/MoMo_Logo.png";
import Model from "../Components/Modal";
import { useNavigation } from "@react-navigation/native";
export default function ProfileSettingScreen({}) {
  const [expanded, setExpanded] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const handleMomo = () => {
    const url = "https://me.momo.vn/qr/nguyen-van-toan-IwfnwPi8o4/JSxbSmx5d1";
    Linking.openURL(url).catch((err) => console.error("Không thể mở URL", err));
  };
  const [show, setShow] = useState(false);
  const navigation = useNavigation();

  const list2 = [
    {
      name: "My Pet",
      icon: "dog",
    },
    {
      name: "Password",
      icon: "fingerprint",
    },
    {
      name: "Payment Method",
      icon: "credit-card",
    },
    {
      name: "Support",
      icon: "lifebuoy",
    },
  ];

  const handClose = () => {
    setShow(false);
  };
  const log = (item) => {
    // Only navigate when "Password" is pressed
    if (item.name === "Password") {
      navigation.navigate("Password", { item });
    }
    if (item.name === "Logout") {
      navigation.navigate("login");
    }
    if (item.name === "Payment Method") {
      setModalVisible(!modalVisible);
    }
  };
  const hadShow = () => {
    setShow(true);
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#F6F6F6" }}
      contentContainerStyle={styles.container}
    >
      {/* Thêm IconButton cho biểu tượng arrow-left */}
      <IconButton
        icon="arrow-left"
        size={35}
        style={styles.backIcon}
        onPress={() => navigation.navigate("Home")}
      />

      <Text
        style={{
          fontSize: 26,
          textAlign: "center",
          margin: 50,
          fontWeight: "bold",
        }}
      >
        Profile
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image
          size={100}
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b",
          }}
          style={{ marginLeft: 25 }}
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
                marginBottom: 30,
                fontSize: 28,
                fontWeight: "bold",
                marginLeft: 7,
              }}
            >
              Toannv
            </Text>
            <Text style={{ marginTop: 10, fontSize: 16, marginLeft: 7 }}>
              {" "}
              2-2-2000
            </Text>
          </View>
          <IconButton
            icon="pen"
            size={35}
            style={{
              marginBottom: 60,
            }}
            onPress={() => navigation.navigate("ChangeProfile")}
          />
        </View>
      </View>
      <View style={{ height: 35 }} />

      {list2.map((item, index) => (
        <View key={index}>
          <List.Item
            title={item.name}
            left={(props) => <List.Icon {...props} icon={item.icon} />}
            right={(props) => <List.Icon {...props} icon="arrow-right" />}
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
        right={(props) => <List.Icon {...props} icon="logout" />}
        onPress={() => navigation.navigate("Login")}
        titleStyle={{ fontSize: 19, fontWeight: "bold", marginLeft: 40 }}
      />
      <View style={styles.updateAccountContainer}>
        <List.Item
          title={
            <Text style={styles.updateAccountText} onPress={hadShow}>
              Update Your Account
            </Text>
          }
          titleStyle={{ alignSelf: "center" }}
          style={styles.updateAccount}
        />
      </View>
      <Model shows={show} handClose={handClose} />
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <Text style={styles.titleModal}>MoMo Payment</Text>
            <View>
              <TouchableOpacity onPress={handleMomo}>
                <Image source={momoIcon} />
              </TouchableOpacity>
            </View>
            <Text>*Hint: Tap the icon to make a payment</Text>
            <Text>After payment click "Continue"</Text>
            <TouchableOpacity
              style={styles.nextBtnV2}
              onPress={() => navigation.navigate("Completed")}
            >
              <Text style={styles.nextV2}>Continue</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.backBtnV2}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.backV2}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
  },
  updateAccountContainer: {
    width: "70%",
    alignSelf: "center",
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
  modalBackGround: {
    flex: 1,
    backgroundColor: "#45464FCC",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  titleModal: { fontWeight: "700", fontSize: 20 },
  nextBtnV2: {
    width: "100%",
    borderWidth: 0.2,
    borderRadius: 32,
    padding: 10,
    marginTop: 10,
    backgroundColor: "#727272",
  },
  backBtnV2: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 32,
    padding: 10,
    marginTop: 10,
    borderColor: "#727272",
  },
  nextV2: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
  backV2: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: "#727272",
  },
});
