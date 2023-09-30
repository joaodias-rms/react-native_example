import React from 'react';
import {View, Text, Image} from 'react-native';
import PerformanceStats from 'react-native-performance-stats';
const image = require('../../assets/imgs/book_podcasts.png');

// import { Container } from './styles';

const Page2: React.FC = () => {
  React.    useEffect(() => {
    const listener = PerformanceStats.addListener(stats => {
      console.log(stats);
    });

    // you must call .start(true) to get CPU as well
    PerformanceStats.start();

    // ... at some later point you could call:
    // PerformanceStats.stop();

    return () => listener.remove();
  }, []);

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
