import {StyleSheet} from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginBottom: 20,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: Colors.black,
      fontFamily: 'Courier',
      marginTop: 20,
      marginBottom: 10,
    },
    entry: {
      marginBottom: 8,
      fontSize: 14,
      fontWeight: '400',
      color: Colors.dark,
      fontFamily: 'Courier',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });