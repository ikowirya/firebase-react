import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../reducers/counter";
import { getTopAnime } from "../reducers/anime";

const Home = ({ navigation }) => {
  const count = useSelector((state) => state.counter.count);
  const globalStyle = useSelector((state) => state.style.globalStyle);
  const animeState = useSelector((state) => state.anime);
  const dispatch = useDispatch();

  const handleLogout = () => {
    AsyncStorage.removeItem("token").then(() => navigation.navigate("login"));
  };

  useEffect(() => {
    dispatch(getTopAnime());
  }, [dispatch]);

  const renderAnime = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("detail", { id: item.mal_id })}
    >
      <View style={styles.sectionList}>
        <Image
          source={{ uri: item.images.jpg.image_url, width: 64, height: 64 }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={globalStyle.text}>Counter: {count}</Text>
      <Button
        title="Increment"
        onPress={() => dispatch(counterActions.increment())}
      />
      <Button
        title="Decrement"
        onPress={() => dispatch(counterActions.decrement())}
      />
      <Button
        title="Go to Detail"
        onPress={() => navigation.navigate("detail")}
      />*/}
      <Button title="Logout" onPress={handleLogout} />
      {animeState.loading ? (
        <ActivityIndicator />
      ) : (
        // animeState.data?.map((item) => (
        //   <View style={styles.sectionList} key={item.mal_id}>
        //     <Image
        //       source={{ uri: item.images.jpg.image_url, width: 64, height: 64 }}
        //     />
        //     <Text style={styles.title}>{item.title}</Text>
        //   </View>
        // ))
        <FlatList
          data={animeState && animeState.data}
          renderItem={renderAnime}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
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
