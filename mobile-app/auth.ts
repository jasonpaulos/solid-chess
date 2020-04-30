import { useEffect, useState } from 'react';
import { Linking } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { URL } from 'whatwg-url';
import auth from "@jasonpaulos/solid-auth-client/lib/index";

const sessionStorageKey = 'solid-session';

Linking.addEventListener('url', handleOpenURL);

export async function init() {
  let url = null;
  try {
    url = await Linking.getInitialURL();
  } catch (err) {
    console.warn('Could not get initial app URL: ', err);
  }

  if (url) {
    handleOpenURL({ url });
    return;
  }

  try {
    const session = await AsyncStorage.getItem(sessionStorageKey);
    if (session) {
      await auth.setSession(JSON.parse(session));
    }
  } catch (err) {
    console.warn('Could not read saved session: ', err);
  }
}

async function handleOpenURL({ url }: { url: string }) {
  const urlObj = new URL(url.replace('#', '?'));
  const sessionStr = urlObj.searchParams.get('session');
  if (sessionStr) {
    try {
      const session = JSON.parse(decodeURIComponent(sessionStr));
      await Promise.all([
        auth.setSession(session),
        AsyncStorage.setItem(sessionStorageKey, JSON.stringify(session)),
      ]);
    } catch (err) {
      console.warn('Could not set session from url: ', err);
    }
  }
}

export function useWebId(): string | null {
  const [webId, setWebId] = useState<string | null>(null);

  useEffect(() => {
    const onSessionChange = (session: { webId: string } | null) => {
      setWebId(session ? session.webId : null);
    };

    auth.trackSession(onSessionChange);

    return () => auth.stopTrackSession(onSessionChange);
  }, []);

  return webId;
}

export const authenticatedFetch = auth.fetch;

export function logIn(): Promise<void> {
  return Linking.openURL('https://jasonpaulos.github.io/solid-chess/#appLogin');
}

export function logOut(): Promise<void> {
  return Promise.all([
    auth.logout(),
    AsyncStorage.removeItem(sessionStorageKey),
  ]).then(() => {});
}
