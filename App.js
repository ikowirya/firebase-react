
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="login">
        <Stack.Screen name="login" component={Login}   options={{title: 'Login'}}></Stack.Screen>
        <Stack.Screen name="register" component={Register}   options={{title: 'Register'}}></Stack.Screen>
        <Stack.Screen name="home" component={Home}   options={{title: 'Home', headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
