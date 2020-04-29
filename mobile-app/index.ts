import { Navigation } from "react-native-navigation";
import { HomeScreen, HomeScreenID } from './HomeScreen';

Navigation.registerComponent(HomeScreenID, () => HomeScreen);

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
