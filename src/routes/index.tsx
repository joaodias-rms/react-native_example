import { NavigationContainer } from "@react-navigation/native";
import { MainRoute } from "./stack.routes";

export const Routes = () =>{
    return (
        <NavigationContainer>
            <MainRoute />
        </NavigationContainer>
    )
}