import React from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';
import { Color } from './Color';

export const HomeScreenID = 'com.solidchess.HomeScreen';

export function HomeScreen() {

  return (
    <View style={styles.content}>
      <View style={styles.greeting}>
        <Text style={styles.userLabel} numberOfLines={1}>Logged in as [name]</Text>
        <Text style={styles.webId} numberOfLines={1}>[webId]</Text>
      </View>
      <TouchableHighlight style={styles.button} underlayColor={Color.HighlightSelected}>
        <Text style={styles.label}>New game</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} underlayColor={Color.HighlightSelected}>
        <Text style={styles.label}>Join game</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} underlayColor={Color.HighlightSelected}>
        <Text style={styles.label}>Continue game</Text>
      </TouchableHighlight>
      <TouchableHighlight style={styles.button} underlayColor={Color.HighlightSelected}>
        <Text style={styles.label}>Log out</Text>
      </TouchableHighlight>
    </View>
  );
}

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Solid Chess',
    }
  }
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.Background,
  },
  greeting: {
    marginBottom: 15,
  },
  userLabel: {
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    color: Color.Text,
  },
  webId: {
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    color: Color.Text,
  },
  button: {
    width: 200,
    height: 60,
    borderRadius: 5,
    margin: 15,
    backgroundColor: Color.Highlight,
  },
  label: {
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 24,
    color: Color.Text,
  },
});
