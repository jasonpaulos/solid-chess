import { Navigation } from "react-native-navigation";
import { init as initAuth } from './auth';
import { Color } from './Color';
import { HomeScreen, HomeScreenID } from './HomeScreen';

initAuth();

Navigation.registerComponent(HomeScreenID, () => HomeScreen);

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: Color.Highlight
  },
  topBar: {
    title: {
      color: Color.Text
    },
    backButton: {
      color: Color.Text
    },
    background: {
      color: Color.Highlight
    }
  }
});

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: HomeScreenID
            }
          }
        ]
      }
    }
  });
});
