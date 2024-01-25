import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, Image, View } from "react-native";
import checkIcon from "../../../assets/check.png";
import momoIcon from "../../../assets/MoMo_Logo.png";
export default function CheckOut() {
  return (
    <View style={styles.centeredView}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon}>
          <AntDesign name="left" size={30} color="#8C8EA3" />
        </TouchableOpacity>
        <Text style={styles.titleHeader}>Check Out</Text>
      </View>
      <View style={styles.information}>
        <Text style={styles.informationPayment}>Package Information</Text>
        <View style={styles.payment}>
          <Text style={styles.namePackage}>User Pro</Text>
          <Text style={styles.pricePackage}>276.000đ</Text>
        </View>
      </View>
      <View style={styles.information}>
        <Text style={styles.informationPayment}>Payment Information</Text>
        <View style={styles.bill}>
          <View style={styles.cost}>
            <Text style={styles.nameCost}>Package Value</Text>
            <Text style={styles.costValue}>276.000đ</Text>
          </View>
          <View style={styles.cost}>
            <Text style={styles.nameCost}>Discount</Text>
            <Text style={styles.costValue}>0đ</Text>
          </View>
          <View style={styles.total}>
            <Text style={styles.nameCost}>Total</Text>
            <Text style={styles.costValue}>276.000đ</Text>
          </View>
        </View>
      </View>
      <View style={styles.information}>
        <Text style={styles.informationPayment}>Payment Methods</Text>
        <View style={styles.payment}>
          <View style={styles.method}>
            <Image source={momoIcon} style={styles.momoIcon} />
            <Text style={styles.nameMethod}>MoMo</Text>
          </View>
          <Image source={checkIcon} style={styles.icon}></Image>
        </View>
      </View>
      <View style={styles.allBtn}>
        <TouchableOpacity style={styles.nextBtn}>
          <Text style={styles.next}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    width: "100%",
    height: "100%",
    display: "flex",
    marginTop: 20,
    // justifyContent: "center",
    // alignItems: "center",
    gap: 20,
    padding: 10,
    backgroundColor: "#FFFBF5",
  },
  header: {
    width: "100%",
    height: 48,
    display: "flex",
    justifyContent: "center",
    position: "relative",
  },
  backIcon: {
    position: "absolute",
    left: 10,
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  titleHeader: {
    position: "absolute",
    right: 0,
    left: 0,
    textAlign: "center",
    fontSize: 40,
    fontWeight: "700",
  },
  information: {
    marginLeft: 10,
    marginRight: 10,
    flexDirection: "col",
    backgroundColor: "transparent",
  },
  informationPayment: {
    fontWeight: "600",
    fontSize: 16,
    color: "#2D2D2D",
  },
  payment: {
    borderWidth: 0.2,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    shadowOpacity: 0.5,
    shadowColor: "rgba(1, 0, 1, 1.2)",
  },
  namePackage: {
    fontSize: 24,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 10,
    alignSelf: "center",
    fontWeight: "600",
    color: "#D46FD0",
  },
  pricePackage: {
    borderWidth: 0.2,
    borderRadius: 36,
    padding: 16,
    marginRight: 10,
    fontWeight: "600",
    fontSize: 16,
    backgroundColor: "#FEA623",
    color: "white",
  },
  bill: {
    borderWidth: 0.2,
    borderRadius: 8,
    padding: 12,
    flexDirection: "col",
    justifyContent: "space-between",
    marginTop: 10,
    shadowOpacity: 0.5,
    shadowColor: "rgba(1, 0, 1, 1.2)",
  },
  cost: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  nameCost: { fontWeight: "400", fontSize: 14, color: "#717171" },
  costValue: { fontWeight: "400", fontSize: 15.7, color: "#2D2D2D" },
  total: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#D7D9E4",
  },
  method: { flexDirection: "row", justifyContent: "space-between" },
  momoIcon: { width: 50, height: 50, borderRadius: 12.24 },
  nameMethod: {
    fontWeight: "500",
    fontSize: 17,
    marginLeft: 10,
    alignSelf: "center",
  },
  icon: { width: 50, height: 50 },
  allBtn: {
    flexDirection: "col",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  nextBtn: {
    width: "100%",
    borderWidth: 0.2,
    borderRadius: 32,
    padding: 10,
    backgroundColor: "#FEA623",
  },
  backBtn: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 32,
    padding: 10,
    borderColor: "#FEA623",
  },
  next: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: "white",
  },
  back: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    color: "#FEA623",
  },
});
