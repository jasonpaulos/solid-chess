import React, { FunctionComponent } from 'react';
import {
  View,
  TouchableHighlight,
  Text,
  StyleSheet
} from 'react-native';
import { Color } from './Color';
import { useWebId, logIn, logOut } from './auth';
import { useFetcher } from './useFetcher';
import { FOAF } from './ns';

export const HomeScreenID = 'com.solidchess.HomeScreen';

export const HomeScreen = () => {
  const webId = useWebId();

  if (webId == null) {
    return <LoggedOut />;
  }

  return <LoggedIn webId={webId} />;
}

HomeScreen.options = {
  topBar: {
    title: {
      text: 'Solid Chess',
    }
  }
};

const LoggedOut: FunctionComponent = () => {
  return (
    <View style={styles.content}>
      <View style={styles.greeting}>
        <Text style={styles.greetingLabel} numberOfLines={1}>Welcome to Solid Chess</Text>
      </View>
      <TouchableHighlight style={styles.button} underlayColor={Color.HighlightSelected} onPress={logIn}>
        <Text style={styles.label}>Log in with Solid</Text>
      </TouchableHighlight>
    </View>
  );
}

const LoggedIn: FunctionComponent<{ webId: string }> = ({ webId  }) => {
  const profile = useFetcher(webId);

  let message;
  if (profile.loading) {
    message = 'Loading...';
  } else if (profile.error) {
    message = 'Error: ' + profile.error.toString();
  } else {
    const name = profile.store.any(profile.store.sym(webId), FOAF('name'));
    if (name && name.value) {
      message = name.value;
    } else {
      message = 'Welcome'
    }
  }

  return (
    <View style={styles.content}>
      <View style={styles.greeting}>
        <Text style={styles.greetingLabel} numberOfLines={1}>{message}</Text>
        <Text style={styles.webId} numberOfLines={1}>{webId}</Text>
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
      <TouchableHighlight style={styles.button} underlayColor={Color.HighlightSelected} onPress={logOut}>
        <Text style={styles.label}>Log out</Text>
      </TouchableHighlight>
    </View>
  );
}

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
  greetingLabel: {
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
