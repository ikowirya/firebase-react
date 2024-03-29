import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  INPUT_PASSWORD,
  INPUT_USERNAME,
  INPUT_VALIDATE,
  LOGIN_SUCCESS,
} from "../utils/constants";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../reducers/auth";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  console.log(authState);
  {
    /* function check token */
  }
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token !== null) {
        navigation.navigate("home");
      }
    });
  }, []);

  {
    /* function validate email */
  }
  const handleEmail = (input) => {
    setUsername(input);
    const data = isValidEmail(input);
    data ? setValidUsername(true) : setValidUsername(false);
  };

  {
    /* function validate password */
  }
  const handlePassword = (input) => {
    setPassword(input);
    const data = isValidPassword(input);
    data ? setValidPassword(true) : setValidPassword(false);
  };

  const handleLogin = () => {
    if (validPassword && validUsername) {
      const payload = {
        username: username,
        password: password,
      };
      dispatch(signInUser(payload))
        .unwrap()
        .then(() => {
          Alert.alert(LOGIN_SUCCESS, "Welcome", [
            {
              text: "Ok",
              onPress: () => navigation.navigate("home"),
            },
          ]);
        });
    } else {
      Alert.alert(`${INPUT_VALIDATE}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={INPUT_USERNAME}
        value={username}
        onChangeText={(text) => handleEmail(text)}
      />
      {/* Message validate */}
      {!validUsername && <Text style={styles.validation}>Email not valid</Text>}
      <TextInput
        style={styles.input}
        placeholder={INPUT_PASSWORD}
        value={password}
        onChangeText={(text) => handlePassword(text)}
        secureTextEntry
      />
      {/* Message validate */}
      {!validPassword && (
        <Text style={styles.validation}>Password not valid</Text>
      )}
      {authState.loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity style={styles.login} onPress={handleLogin}>
          <Text>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.register}
        onPress={() => navigation.navigate("register")}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },
  input: {
    marginHorizontal: 10,
    padding: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  login: {
    padding: 10,
    marginHorizontal: 10,
    backgroundColor: "orange",
    alignItems: "center",
    borderRadius: 10,
  },
  register: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: "grey",
    alignItems: "center",
    borderRadius: 10,
  },
  validation: {
    color: "red",
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
export default Login;
