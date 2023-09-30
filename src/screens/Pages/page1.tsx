import React, {useState} from 'react';
import {View, Text, Button, Animated, Dimensions} from 'react-native';

import * as S from './styles';
import Page2 from './page2';
import { useNavigation } from '@react-navigation/native';

const Page1: React.FC = () => {
  const screenHeight = Dimensions.get(`window`).height;
  const {goBack} = useNavigation()
  const [animation, setAnimation] = useState(true);

  const scaleImage = React.useRef(
    new Animated.Value(!animation ? 0.6 : 1),
  ).current;
  const logoTranslate = React.useRef(
    new Animated.Value(!animation ? -120 : 0),
  ).current;
  const constainerLoginTranslate = React.useRef(
    new Animated.Value(
      !animation ? (screenHeight * 20) / 100 : screenHeight + 100,
    ),
  ).current;

  const handleStartAnimation = () => {
    setAnimation(state => !state);
    animation ? handleAnimate() : handleAnimate(false);
  };

  const handleGoBack = () =>{
    goBack();
  }

  const handleAnimate = (status: boolean = true) => {
    Animated.parallel([
      Animated.timing(scaleImage, {
        toValue: status ? 0.6 : 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(constainerLoginTranslate, {
        toValue: status ? (screenHeight * 20) / 100 : screenHeight + 100,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(logoTranslate, {
        toValue: status ? -120 : 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: screenHeight,
      }}>
      <Text style={{
        fontWeight: 'bold',
        marginBottom: 24,
        marginHorizontal: 12, 
        fontSize: 16
      }}>Page 1</Text>
      <Button
        title="Click to start an animation"
        onPress={handleStartAnimation}
      />

      <Button
        title="Click to go back"
        onPress={handleGoBack}
      />
      <S.LoginContainer
        style={{
          transform: [{translateY: constainerLoginTranslate}],
        }}>
        <Page2 />
      </S.LoginContainer>
    </View>
  );
};

export default Page1;
