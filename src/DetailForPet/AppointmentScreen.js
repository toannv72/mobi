import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { IconButton } from "react-native-paper";

const Appointment = ({ status, type, date, time }) => {
  const getIconName = () => {
    if (type === "Vet Visit") {
      return "stethoscope";
    } else if (type === "Grooming") {
      return "scissors-cutting";
    } else {
      return null; // hoặc trả về icon mặc định nếu type không khớp với bất kỳ giá trị nào được xác định
    }
  };

  return (
    <View style={styles.appointmentContainer}>
      <Text style={styles.status}>{status} Appointment</Text>
      <View style={styles.typeContainer}>
        {getIconName() && (
          <IconButton
            icon={getIconName()}
            size={20}
            style={{ ...styles.iconButton }}
            color="#8C8EA3"
          />
        )}
        <Text style={styles.type}>{type}</Text>
      </View>
      <View style={styles.dateTimeContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.timeContainer}>
          <IconButton
            icon="clock-outline"
            size={20}
            style={{ ...styles.clockIcon }}
            color="#8C8EA3"
          />
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
    </View>
  );
};
const AppointmentScreen = () => {
  const appointments = [
    {
      status: "Upcoming",
      type: "Vet Visit",
      date: "Mondaya, 24 April, 2024",
      time: "4:00 PM",
    },
    {
      status: "Upcoming",
      type: "Grooming",
      date: "Wednesday, 24 April, 2024",
      time: "6:00 PM",
    },
    {
      status: "Upcoming",
      type: "Vet Visit",
      date: "Wednesday, 24 April, 2024",
      time: "4:00 PM",
    },
    {
      status: "Upcoming",
      type: "Vet Visit",
      date: "Wednesday, 24 April, 2024",
      time: "4:00 PM",
    },
    // Thêm các cuộc hẹn khác tại đây
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.innerContainer}>
        {appointments.map((appointment, index) => (
          <View key={index} style={styles.appointmentContainer}>
            <Appointment
              status={appointment.status}
              type={appointment.type}
              date={appointment.date}
              time={appointment.time}
            />
            {index !== appointments.length - 1 && (
              <View style={styles.separator} />
            )}
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
  status: {
    fontWeight: "600",
    fontSize: 18,
  },
  type: {
    fontWeight: "400",
    fontSize: 16,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Thêm alignItems để cả date và time nằm cùng một dòng
    marginTop: -10,
  },
  date: {
    fontWeight: "400",
    fontSize: 16,
  },
  time: {
    fontWeight: "400",
    fontSize: 16,
    marginLeft: -10,
  },
  clockIcon: {
    marginLeft: 70,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginRight: 5,
  },
  dateContainer: {
    minWidth: 120, // Đặt chiều rộng cố định cho dateContainer
  },
});

export default AppointmentScreen;
