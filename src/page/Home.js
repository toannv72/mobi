import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { Button, Icon, Searchbar } from 'react-native-paper';
import ComBar from '../Components/Bar';
import { useState } from 'react';
import { Card } from '@rneui/themed';
const users = [
    {
        name: 'brynn',
        avatar: 'https://uifaces.co/our-content/donated/1H_7AxP0.jpg',
    },
    {
        name: 'thot leader',
        avatar:
            'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
    },
    {
        name: 'jsa',
        avatar: 'https://uifaces.co/our-content/donated/bUkmHPKs.jpg',
    },
    {
        name: 'talhaconcepts',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    {
        name: 'andy vitale',
        avatar: 'https://uifaces.co/our-content/donated/NY9hnAbp.jpg',
    },
    {
        name: 'katy friedson',
        avatar:
            'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
    },
];

export default function HomeScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    return (

        <View style={styles.home} >
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
            />
            <Text style={{fontSize:30}}>Your pet</Text>

            <ScrollView>
                <View style={styles.container}>
                <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <Card >
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10 }}>
                            <View>
                                <Card.Image
                                    style={{ padding: 0, width: 50, height: 50, borderRadius: 50 }}
                                    source={{
                                        uri:
                                            'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                    }}
                                />
                                <Card.Title style={{ marginBottom: 10 }}>Dog</Card.Title>
                            </View>

                            <View style={{ width: "auto", marginRight: 10 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Heal condition
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${100}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Feeding
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${80}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={{ marginBottom: 10 }} >
                                        Playing
                                    </Text>
                                    <View style={{ width: "55%", backgroundColor: "#D9D9D9", borderRadius: 50 }}>
                                        <View style={[styles.inside, { width: `${20}%`, borderRadius: 50, }]}>

                                        </View>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </Card>
                    <View style={{height:100}}></View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    home: {
        fontSize: "10px",
        paddingTop: 28,
        paddingHorizontal: 18,
    },
    container: {
        flex: 1,
    },
    fonts: {
        marginBottom: 8,
    },
    inside: {
        height: 20,
        backgroundColor: 'tomato', // Màu xanh lá cây
    },
    user: {
        flexDirection: 'row',
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
});