import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

export const HomeScreenID = 'com.solidchess.HomeScreen';

export function HomeScreen() {

  return (
    <View style={styles.content}>
      <Text>Welcome to Solid Chess.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
