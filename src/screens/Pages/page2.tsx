import React from 'react';
import {View, Text, Image} from 'react-native';
import PerformanceStats from 'react-native-performance-stats';
const image = require('../../assets/imgs/book_podcasts.png');

// import { Container } from './styles';

const Page2: React.FC = () => {
  return (
    <View>
      <Text
        style={{
          textAlign: 'center',
          margin: 16,
        }}>
        Come by animation
      </Text>
      <Image
        style={{
          height: 250,
          width: 250,
          alignSelf: 'center',
        }}
        source={image}
      />
    </View>
  );
};

export default Page2;
