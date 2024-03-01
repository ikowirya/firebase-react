import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import { Provider } from "react-redux";
import configureStore from "./reducers";
import Detail from "./screens/Detail";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={configureStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="login"
            component={Login}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ title: "Register" }}
          />
          <Stack.Screen
            name="home"
            component={Home}
            options={{ title: "Home", headerShown: false }}
          />
           <Stack.Screen
            name="detail"
            component={Detail}
            options={{ title: "Detail" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
