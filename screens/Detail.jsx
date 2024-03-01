import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";

const Detail = () => {
  const count = useSelector((state) => state.counter.count);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Counter: {count}</Text>
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
    text: {
        fontSize: 45
    }
})
export default Detail;
