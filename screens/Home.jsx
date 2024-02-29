import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, FlatList, Image } from "react-native";
import { BASE_URL } from "../utils/Constants";

const Home = ({ navigation }) => {
  const [anime, setAnime] = useState([]);
  
  const handleLogout = () => {
    AsyncStorage.removeItem("token").then(() => navigation.navigate("login"));
  };

  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token !== null) {
          return fetch(`${BASE_URL}`);
        }
        return Promise.reject("Not Authorize!");
      })
      .then((response) => response.json())
      .then(({ data }) => setAnime(data));
  }, []);

  const renderAnime = ({ item }) => (
    <View style={styles.sectionList}>
      <Image
        source={{ uri: item.images.jpg.image_url, width: 64, height: 64 }}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
      <FlatList data={anime} renderItem={renderAnime} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
  },
  title: {
    marginLeft:10, 
    fontWeight:"bold", 
    flex:1, 
    marginRight: 24
  },
  sectionList: {
    flexDirection: "row", 
    paddingLeft:10, 
    marginBottom:10
  }
});
export default Home;
