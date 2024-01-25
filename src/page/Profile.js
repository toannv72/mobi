import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Text, List, Icon, IconButton } from "react-native-paper";
export default function ProfileSettingScreen({ navigation }) {
  const [expanded, setExpanded] = useState({});

  const list2 = [
    {
      name: "Show Collection",

      icon: "dog",
    },
    {
      name: "Change Password",

      icon: "fingerprint",
    },
    {
      name: "New User",
      avatar_url: "https://example.com/avatar3.jpg",
      subtitle: "New Role",
      icon: "credit-card",
    },
    {
      name: "New User",
      avatar_url: "https://example.com/avatar3.jpg",
      subtitle: "New Role",
      icon: "lifebuoy",
    },
  ];
  const log = (item) => {
    // Only navigate when "Change Password" is pressed
    if (item.name === "Change Password") {
      navigation.navigate("Password", { item });
    }
  };

  const toggleAccordion = (index) => {
    setExpanded((prevExpanded) => {
      return { ...prevExpanded, [index]: !prevExpanded[index] };
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#F6F6F6" }}
      contentContainerStyle={styles.container}
    >
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
      <View style={{ margin: 0 }} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image
          size={100}
          source={{ uri: "https://firebasestorage.googleapis.com/v0/b/swd-longchim.appspot.com/o/376577375_998270051209102_4679797004619533760_n.jpg?alt=media&token=90d94961-bc1b-46e4-b60a-ad731606b13b" }}
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

      {list2.map((l, i) => (
        <List.Accordion
          key={i}
          title={
            i === 0
              ? "My Pet"
              : i === 1
                ? "Password"
                : i === 2
                  ? "Payment Method"
                  : "Support"
          } // Đổi tiêu đề ở đây
          expanded={expanded[i]}
          onPress={() => toggleAccordion(i)}
          style={{
            backgroundColor: "#F6F6F6",
            fontWeight: "bold",
          }}
          titleStyle={{ fontWeight: "bold", fontSize: 19 }}
        >
          <List.Item
            title={l.name}
            description={l.subtitle}
            left={(props) => <List.Icon {...props} icon={l.icon} />}
            onPress={() => log(l)}
            titleStyle={styles.titleStyle}
          />
        </List.Accordion>
      ))}
      <List.Item
        title="Logout"
        right={(props) => <List.Icon {...props} icon="logout" />}
        onPress={log}
        titleStyle={{ fontSize: 19, fontWeight: "bold" }}
      />
      <View style={styles.updateAccountContainer}>
        <List.Item
          title={
            <Text style={styles.updateAccountText}>Update Your Account</Text>
          }
          onPress={log}
          style={styles.updateAccount}
        />
      </View>
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
});
