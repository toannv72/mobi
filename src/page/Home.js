import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Avatar, ProgressBar, Searchbar } from "react-native-paper";
import { useState } from "react";
import { Card } from "@rneui/themed";
import { TouchableOpacity } from "react-native-gesture-handler";
import PetProfile from "./PetProfile";
import location from "../../assets/location.png";
import mess from "../../assets/message-notif.png";
import ring from "../../assets/Bell_pin_light.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../api/api";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [seeMore, setSeeMore] = useState(true);
  const [show, setShow] = useState(true);
  const [userData, setUserData] = useState({});

  const handleCloseShow = () => {
    setShow(true);
  };

  const navigateToPetProfile = () => {
    // Navigate to the pet profile screen
    navigation.navigate("PetDetail"); // Make sure to replace 'PetProfileScreen' with the actual name of your pet profile screen.
  };
  const getStoredUserId = async () => {
    try {
      const data = await AsyncStorage.getItem("@myKey");

      if (data !== null) {
        const userData = JSON.parse(data);
        const id = userData[0].id;

        const endpoint = `/users/getInformation/${id}`;
        const response = await getData(endpoint);

        // Cập nhật trạng thái userData
        setUserData(response.data.data);

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

  }, []);
  console.log(11111111, userData);
  return (
    <View style={styles.container}>
      {show ? (
        <View style={styles.home}>
          <View style={styles.header}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Avatar.Image
                  size={50}
                  source={{
                    uri: userData.avatar,
                  }}
                />
              </TouchableOpacity>
              <View style={styles.information}>
                <Text style={{ marginLeft: 5 }}>Hi {userData.fullName}!</Text>
                <View style={styles.location}>
                  <Image source={location} />
                  <Text>{userData.address}</Text>
                </View>
              </View>
            </View>
            <View style={styles.notification}>
              <Image source={mess} />
              <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                <Image source={ring} style={{ marginLeft: 10 }} />
              </TouchableOpacity>
            </View>
          </View>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingRight: 20,
            }}
          >
            <Text style={{ fontSize: 30 }}>Your pet</Text>
            {!seeMore || (
              <Text
                onPress={() => setSeeMore(!seeMore)}
                style={{ fontSize: 18 }}
              >
                See more
              </Text>
            )}
            {seeMore || (
              <Text
                onPress={() => setSeeMore(!seeMore)}
                style={{ fontSize: 18 }}
              >
                Hide
              </Text>
            )}
          </View>

          {seeMore || (
            <ScrollView showsHorizontalScrollIndicator={false}>
              <View style={styles.container}>
                <TouchableOpacity onPress={navigateToPetProfile}>
                  <Card containerStyle={styles.cardContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                      }}
                    >
                      <View>
                        <Card.Image
                          style={{
                            padding: 0,
                            width: 50,
                            height: 50,
                            borderRadius: 50,
                          }}
                          source={{
                            uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                          }}
                        />
                        <Card.Title style={{ marginBottom: 10 }}>
                          Dog
                        </Card.Title>
                      </View>
                      <View style={{ width: "auto", marginRight: 10 }}>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ marginBottom: 10 }}>
                            Heal condition
                          </Text>
                          <View style={{ width: "50%" }}>
                            <ProgressBar
                              style={{
                                borderRadius: 50,
                                height: 20,
                                backgroundColor: "#D9D9D9",
                              }}
                              progress={0.5}
                              color={"#0d99ff"}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ marginBottom: 10 }}>Feeding</Text>
                          <View style={{ width: "50%" }}>
                            <ProgressBar
                              style={{
                                borderRadius: 50,
                                height: 20,
                                backgroundColor: "#D9D9D9",
                              }}
                              progress={0.5}
                              color={"#0d99ff"}
                            />
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text style={{ marginBottom: 10 }}>Playing</Text>
                          <View
                            style={{
                              width: "50%",
                              backgroundColor: "#D9D9D9",
                              borderRadius: 50,
                            }}
                          >
                            <View style={{ width: "50%" }}>
                              <ProgressBar
                                style={{
                                  borderRadius: 50,
                                  height: 20,
                                  backgroundColor: "#D9D9D9",
                                }}
                                progress={0.3}
                                color={"#0d99ff"}
                              />
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>

                <Card containerStyle={styles.cardContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <View>
                      <Card.Image
                        style={{
                          padding: 0,
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                        source={{
                          uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                        }}
                      />
                      <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                    </View>
                    <View style={{ width: "auto", marginRight: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Heal condition</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Feeding</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Playing</Text>
                        <View
                          style={{
                            width: "50%",
                            backgroundColor: "#D9D9D9",
                            borderRadius: 50,
                          }}
                        >
                          <View style={{ width: "50%" }}>
                            <ProgressBar
                              style={{
                                borderRadius: 50,
                                height: 20,
                                backgroundColor: "#D9D9D9",
                              }}
                              progress={0.3}
                              color={"#0d99ff"}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>
                <Card containerStyle={styles.cardContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <View>
                      <Card.Image
                        style={{
                          padding: 0,
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                        source={{
                          uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                        }}
                      />
                      <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                    </View>
                    <View style={{ width: "auto", marginRight: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Heal condition</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Feeding</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Playing</Text>
                        <View
                          style={{
                            width: "50%",
                            backgroundColor: "#D9D9D9",
                            borderRadius: 50,
                          }}
                        >
                          <View style={{ width: "50%" }}>
                            <ProgressBar
                              style={{
                                borderRadius: 50,
                                height: 20,
                                backgroundColor: "#D9D9D9",
                              }}
                              progress={0.3}
                              color={"#0d99ff"}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>

                <Card containerStyle={styles.cardContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <View>
                      <Card.Image
                        style={{
                          padding: 0,
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                        source={{
                          uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                        }}
                      />
                      <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                    </View>
                    <View style={{ width: "auto", marginRight: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Heal condition</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Feeding</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Playing</Text>
                        <View
                          style={{
                            width: "50%",
                            backgroundColor: "#D9D9D9",
                            borderRadius: 50,
                          }}
                        >
                          <View style={{ width: "50%" }}>
                            <ProgressBar
                              style={{
                                borderRadius: 50,
                                height: 20,
                                backgroundColor: "#D9D9D9",
                              }}
                              progress={0.3}
                              color={"#0d99ff"}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>

                <Card containerStyle={styles.cardContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <View>
                      <Card.Image
                        style={{
                          padding: 0,
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                        source={{
                          uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                        }}
                      />
                      <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                    </View>
                    <View style={{ width: "auto", marginRight: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Heal condition</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Feeding</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Playing</Text>
                        <View
                          style={{
                            width: "50%",
                            backgroundColor: "#D9D9D9",
                            borderRadius: 50,
                          }}
                        >
                          <View style={{ width: "50%" }}>
                            <ProgressBar
                              style={{
                                borderRadius: 50,
                                height: 20,
                                backgroundColor: "#D9D9D9",
                              }}
                              progress={0.3}
                              color={"#0d99ff"}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>

                <Card containerStyle={styles.cardContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      columnGap: 10,
                    }}
                  >
                    <View>
                      <Card.Image
                        style={{
                          padding: 0,
                          width: 50,
                          height: 50,
                          borderRadius: 50,
                        }}
                        source={{
                          uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                        }}
                      />
                      <Card.Title style={{ marginBottom: 10 }}>
                        Dogsss
                      </Card.Title>
                    </View>
                    <View style={{ width: "auto", marginRight: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Heal condition</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Feeding</Text>
                        <View style={{ width: "50%" }}>
                          <ProgressBar
                            style={{
                              borderRadius: 50,
                              height: 20,
                              backgroundColor: "#D9D9D9",
                            }}
                            progress={0.5}
                            color={"#0d99ff"}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ marginBottom: 10 }}>Playing</Text>
                        <View
                          style={{
                            width: "50%",
                            backgroundColor: "#D9D9D9",
                            borderRadius: 50,
                          }}
                        >
                          <View style={{ width: "50%" }}>
                            <ProgressBar
                              style={{
                                borderRadius: 50,
                                height: 20,
                                backgroundColor: "#D9D9D9",
                              }}
                              progress={0.3}
                              color={"#0d99ff"}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </Card>

                <View style={{ height: 100 }}></View>
              </View>
            </ScrollView>
          )}

          {!seeMore || (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: "row",
                  paddingBottom: 10,
                }}
              >
                <Card
                  containerStyle={{
                    borderRadius: 15,
                    elevation: 5, // Tăng độ nâng để tạo bóng mờ (Android)
                    shadowColor: "rgba(0, 0, 2, 2.2)", // Màu của bóng
                    shadowOffset: { width: 0, height: 2 }, // Kích thước và hướng của bóng
                    shadowOpacity: 0.8, // Độ đậm của bóng
                    shadowRadius: 4,
                    width: 120,
                  }}
                >
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <Card.Image
                      onPress={() => setShow(false)}
                      style={{
                        padding: 0,
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                      source={{
                        uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                      }}
                    />
                    <Card.Title style={{ marginBottom: 10 }}>Dongo</Card.Title>
                  </View>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: 15,
                    elevation: 5, // Tăng độ nâng để tạo bóng mờ (Android)
                    shadowColor: "rgba(0, 0, 2, 2.2)", // Màu của bóng
                    shadowOffset: { width: 0, height: 2 }, // Kích thước và hướng của bóng
                    shadowOpacity: 0.8, // Độ đậm của bóng
                    shadowRadius: 4,
                    width: 120,
                  }}
                >
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <Card.Image
                      style={{
                        padding: 0,
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                      source={{
                        uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                      }}
                    />
                    <Card.Title style={{ marginBottom: 10 }}>Dongo</Card.Title>
                  </View>
                </Card>
                <Card
                  containerStyle={{
                    borderRadius: 15,
                    elevation: 5, // Tăng độ nâng để tạo bóng mờ (Android)
                    shadowColor: "rgba(0, 0, 2, 2.2)", // Màu của bóng
                    shadowOffset: { width: 0, height: 2 }, // Kích thước và hướng của bóng
                    shadowOpacity: 0.8, // Độ đậm của bóng
                    shadowRadius: 4,
                    width: 120,
                  }}
                >
                  <View
                    style={{ flexDirection: "column", alignItems: "center" }}
                  >
                    <Card.Image
                      style={{
                        padding: 0,
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                      }}
                      source={{
                        uri: "https://vienmoitruong5014.org.vn/wp-content/uploads/2023/03/anh-cho-con-de-thuong_022907461.jpg",
                      }}
                    />
                    <Card.Title style={{ marginBottom: 10 }}>Dongo</Card.Title>
                  </View>
                </Card>
              </View>
            </ScrollView>
          )}

          <Text style={{ fontSize: 30 }}>Service for pet</Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card containerStyle={styles.cardContainer2}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  style={{ marginTop: 0 }}
                  source={require("../../assets/Stethoscope.png")}
                />
                <Text
                  style={{ color: "#fff", fontSize: 16 }}
                  onPress={() => navigation.navigate("Login")}
                >
                  Appointment
                </Text>
              </View>
            </Card>
            <Card containerStyle={styles.cardContainer2}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  style={{ paddingTop: 10 }}
                  source={require("../../assets/Injection.png")}
                />
                <Text style={{ color: "#fff", fontSize: 16 }}>Vaccination</Text>
              </View>
            </Card>
            <Card containerStyle={styles.cardContainer2}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  style={{ marginTop: 0, width: 20, height: 20 }}
                  source={require("../../assets/scissors-03.png")}
                />
                <Text style={{ color: "#fff", fontSize: 16 }}>Grooming</Text>
              </View>
            </Card>
            <Card containerStyle={styles.cardContainer2}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Image
                  style={{ marginTop: 0, width: 20, height: 20 }}
                  source={require("../../assets/Group23.png")}
                />
                <Text style={{ color: "#fff", fontSize: 16 }}>Hotels</Text>
              </View>
            </Card>
          </View>
        </View>
      ) : (
        <View style={styles.home}>
          <PetProfile handCloseShow={handleCloseShow} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    fontSize: "10px",
    paddingTop: 28,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fonts: {
    marginBottom: 8,
  },
  inside: {
    height: 20,
    backgroundColor: "tomato", // Màu xanh lá cây
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  cardContainer: {
    margin: 16,
    padding: 16,
    borderRadius: 15,
    elevation: 5, // Tăng độ nâng để tạo bóng mờ (Android)
    shadowColor: "rgba(0, 0, 1, 1.2)", // Màu của bóng
    shadowOffset: { width: 0, height: 2 }, // Kích thước và hướng của bóng
    shadowOpacity: 0.8, // Độ đậm của bóng
    shadowRadius: 4, // Bán kính của bóng
  },
  upperSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  lowerSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardContainer2: {
    borderRadius: 16,
    backgroundColor: "#484B61",
    paddingVertical: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    width: "40%", // Điều chỉnh kích thước của thẻ Card tùy thuộc vào nhu cầu
    height: 100,
  },
  information: {
    paddingLeft: 20,
  },
  header: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  location: {
    flexDirection: "row",
    marginTop: 6,
  },
  notification: {
    marginLeft: "15%",
    flexDirection: "row",
    alignItems: "center",
  },
  searchbar: {
    marginTop: "2%",
  },
});
