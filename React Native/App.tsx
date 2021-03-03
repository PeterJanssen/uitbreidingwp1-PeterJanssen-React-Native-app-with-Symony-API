import React, { useState } from "react";
import { Provider } from "react-redux";
import configureStore from "./src/redux/configureStore";

import Navigator from "./src/navigation/Navigation";

import * as Font from "expo-font";
import { AppLoading } from "expo";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const store = configureStore();
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
