import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";

const Medical = ({ type, date, quantity }) => {
  const getIconName = () => {
    if (type === "RABVAC" || type === "CARPROFEN" || type === "K-9 ADVANTIX") {
      return "pill";
    } else {
      return null; // hoặc trả về icon mặc định nếu type không khớp với bất kỳ giá trị nào được xác định
    }
  };

  return (
    <View style={styles.appointmentContainer}>
      <View style={styles.typeContainer}>
        {getIconName() && (
          <IconButton
            icon={getIconName()}
            size={25}
            style={{ ...styles.iconButton, marginBottom: 50 }}
            color="#8C8EA3"
          />
        )}
        <Text style={{ ...styles.type, marginLeft: 10 }}>{type}</Text>
      </View>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>
    </View>
  );
};

const MedicalRecordScreen = () => {
  const records = [
    {
      type: "RABVAC",
      date: "Monday, 24 April, 2024",
      quantity: "69g ",
    },
    {
      type: "CARPROFEN",
      date: "Wednesday, 24 April, 2024",
      quantity: "20g",
    },
    {
      type: "CARPROFEN",
      date: "Monday, 24 April, 2024",
      quantity: "41g",
    },
    {
      type: "K-9 ADVANTIX",
      date: "Wednesday, 24 April, 2024",
      quantity: "43g",
    },
    // Thêm các cuộc hẹn khác tại đây
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.innerContainer}>
        {records.map((appointment, index) => (
          <View key={index} style={styles.appointmentContainer}>
            <Medical
              type={appointment.type}
              date={appointment.date}
              quantity={appointment.quantity}
            />
            {index !== records.length - 1 && <View style={styles.separator} />}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 45,
    marginTop: -10,
  },
  appointmentContainer: {
    marginBottom: 10,
    borderRadius: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#8C8EA3",
    marginHorizontal: 10,
  },
  type: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 50,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -70,
    marginLeft: 40,
  },
  dateContainer: {
    minWidth: 120,
  },
  date: {
    fontWeight: "400",
    fontSize: 16,
  },
  quantity: {
    fontWeight: "400",
    fontSize: 16,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginRight: 190,
  },
  iconButton: {
    marginRight: 5,
  },
});

export default MedicalRecordScreen;
