import { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAnimeDetail } from "../reducers/anime";

const Detail = ({ route }) => {
  const count = useSelector((state) => state.counter.count);
  const globalStyle = useSelector((state) => state.style.globalStyle);
  const animeState = useSelector((state) => state.anime.detail?.data);
  const id = route.params.id;
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getAnimeDetail(id));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{
            uri: animeState?.images.jpg.image_url,
            width: 150,
            height: 200,
          }}
        />
        <Text style={styles.h1}>{animeState?.title}</Text>
      </View>
      <Text style={styles.h2}>Synopsis</Text>
      <Text style={{ textAlign: "justify" }}>{animeState?.synopsis}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
  h1: {
    marginLeft: 8,
    fontSize: 24,
    flex:1,
    fontWeight: "bold",
  },
  h2: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default Detail;
