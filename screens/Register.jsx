import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { FIREBASE_AUTH } from "../helpers/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  CREATED_SUCCESS,
  INPUT_PASSWORD,
  INPUT_USERNAME,
} from "../utils/Constants";
import { isValidPassword } from "../utils/Validation";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const auth = FIREBASE_AUTH;
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token !== null) {
        navigation.navigate("home");
      }
    });
  }, []);

  const handlePassword = (input) => {
    setPassword(input)
    const data = isValidPassword(input)
    data ? setValid(true): setValid(false)
  };

  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, username, password)
      .then((response) =>
        response.user
          .getIdToken()
          .then((token) => AsyncStorage.setItem("token", token))
          .then(() => {
            Alert.alert(CREATED_SUCCESS, `Welcome ${response.user.email}`, [
              {
                text: "Ok",
                onPress: () => navigation.navigate("home"),
              },
            ]);
          })
      )
      .catch((error) => Alert.alert(error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={INPUT_USERNAME}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder={INPUT_PASSWORD}
        value={password}
        onChangeText={(text) => handlePassword(text)}
        secureTextEntry
      />
       {!isValid && (
        <Text style={styles.validation} >Password not valid</Text>
      )}

      <TouchableOpacity style={styles.register} onPress={handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  input: {
    marginHorizontal: 10,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10
  },
  register: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "grey",
    alignItems: "center",
    borderRadius: 10
  },
});
export default Register;
