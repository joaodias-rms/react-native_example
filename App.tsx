/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Routes} from './src/routes';
import PerformanceStats from 'react-native-performance-stats';

function App(): JSX.Element {
  React.useEffect(() => {
    const listener = PerformanceStats.addListener(stats => {
      console.log(`CPU: ${stats.usedCpu.toFixed(2)}%`);
    });

    // you must call .start(true) to get CPU as well
    PerformanceStats.start(true);

    // ... at some later point you could call:
    // PerformanceStats.stop();

    return () => listener.remove();
  }, []);

  return <Routes />;
}

export default App;
