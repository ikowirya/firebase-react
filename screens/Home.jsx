import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Button, FlatList, Image } from "react-native";
import { BASE_URL, REJECT_AUTH } from "../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../reducers/counter";

const Home = ({ navigation }) => {
  const [anime, setAnime] = useState([]);
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  
  /* function logout */
  const handleLogout = () => {
    AsyncStorage.removeItem("token").then(() => navigation.navigate("login"));
  };
  /* function logout */

  /* function check token */
  /*
  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((token) => {
        if (token !== null) {
          return fetch(`${BASE_URL}`);
        }
        return Promise.reject(`${REJECT_AUTH}`);
      })
      .then((response) => response.json())
      .then(({ data }) => setAnime(data));
  }, []);
  */
  /* function check token */
  
  /* UI item list */
  /* const renderAnime = ({ item }) => (
    <View style={styles.sectionList}>
      <Image
        source={{ uri: item.images.jpg.image_url, width: 64, height: 64 }}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  ); */
   /* UI item list */

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
      <Button title="Increment" onPress={()=> dispatch(counterActions.increment())}/>
      <Button title="Decrement" onPress={()=> dispatch(counterActions.decrement())}/>
      <Button title="Go to Detail" onPress={()=> navigation.navigate("detail")}/>
      <Button title="Logout" onPress={handleLogout} />
      {/* <FlatList data={anime} renderItem={renderAnime} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginLeft: 10,
    fontWeight: "bold",
    flex: 1,
    marginRight: 24,
  },
  sectionList: {
    flexDirection: "row",
    paddingLeft: 10,
    marginBottom: 10,
  },
});
export default Home;
