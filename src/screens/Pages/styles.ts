import { Animated, Dimensions } from "react-native";
import styled from "styled-components/native";

const { height } = Dimensions.get("window");

export const LoginContainer = styled(Animated.View)`
  height: ${height}px;
  width: 100%;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  position: absolute;
  bottom: 0px;
`;