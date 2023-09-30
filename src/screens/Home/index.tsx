import React, {Profiler, ProfilerOnRenderCallback} from 'react';
import {ScrollView, View, Text, Button} from 'react-native';
import performance, {
  PerformanceMetric,
  PerformanceObserver,
  PerformanceReactNativeMark,
  PerformanceResourceTiming,
  setResourceLoggingEnabled,
} from 'react-native-performance';

import {Header} from 'react-native/Libraries/NewAppScreen';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
const traceRender: ProfilerOnRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  _commitTime, // when React committed this update
  _interactions, // the Set of interactions belonging to this update
) =>
  performance.measure(id, {
    start: startTime,
    duration: actualDuration,
  });

const formatValue = (value: number, unit?: string) => {
  switch (unit) {
    case 'ms':
      return `${value.toFixed(1)}ms`;
    case 'byte':
      return `${(value / 1024 / 1024).toFixed(1)}MB`;
    case '$DOGE':
      return `${value} doge coins`;
    default:
      return value.toFixed(1);
  }
};

const Entry = ({
  name,
  value,
  unit = 'ms',
}: {
  name: string;
  value: number;
  unit?: string;
}) => (
  <Text style={styles.entry}>
    {name}: {formatValue(value, unit)}
  </Text>
);

const Home: React.FC = () => {
  const {navigate} = useNavigation();
  const [metrics, setMetrics] = React.useState<PerformanceMetric[]>([]);
  const [nativeMarks, setNativeMarks] = React.useState<
    PerformanceReactNativeMark[]
  >([]);
  const [resources, setResources] = React.useState<PerformanceResourceTiming[]>(
    [],
  );

  const handleChangePage = () => {
    //@ts-ignore
    navigate('page1');
  };
  React.useEffect(() => {
    new PerformanceObserver(() => {
      setNativeMarks(
        performance
          .getEntriesByType('react-native-mark')
          .sort(
            (a: PerformanceReactNativeMark, b: PerformanceReactNativeMark) =>
              a.startTime - b.startTime,
          ),
      );
    }).observe({type: 'react-native-mark', buffered: true});

    new PerformanceObserver(() => {
      setMetrics(performance.getEntriesByType('metric'));
    }).observe({type: 'metric', buffered: true});
    new PerformanceObserver(() => {
      setResources(performance.getEntriesByType('resource'));
    }).observe({type: 'resource', buffered: true});
  }, []);

  React.useEffect(() => {
    // @ts-ignore
    fetch('https://xkcd.com/info.0.json', {cache: 'no-cache'});
  }, []);

  return (
    <Profiler id="App.render()" onRender={traceRender}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Header />
        <View style={styles.body}>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              performance.getEntriesByType('metric')
            </Text>
            {metrics.map(({name, startTime, value, detail}) => (
              <Entry
                key={startTime}
                name={name}
                value={value as number}
                unit={detail?.unit}
              />
            ))}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              performance.getEntriesByType('resource')
            </Text>
            {resources.map(({name, duration, startTime}) => (
              <Entry key={startTime} name={name} value={duration} />
            ))}
          </View>
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              performance.getEntriesByType('react-native-mark')
            </Text>
            {nativeMarks.map(({name, startTime}) => (
              <Entry
                key={`${name}:${startTime}`}
                name={name}
                value={startTime - performance.timeOrigin}
              />
            ))}
            <Button title="change page" onPress={handleChangePage} />
          </View>
        </View>
      </ScrollView>
    </Profiler>
  );
};

setResourceLoggingEnabled(true);

export default Home;
