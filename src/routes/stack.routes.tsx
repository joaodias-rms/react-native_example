import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Page1 from "../screens/Pages/page1";


const { Navigator, Screen } = createNativeStackNavigator();

export const MainRoute = () =>{
    return (
        <Navigator initialRouteName="Home" screenOptions={{
            headerShown: false
        }}> 
            <Screen name="Home" component={Home}/>
            <Screen name="page1" component={Page1}/>
        </Navigator>
    )
}