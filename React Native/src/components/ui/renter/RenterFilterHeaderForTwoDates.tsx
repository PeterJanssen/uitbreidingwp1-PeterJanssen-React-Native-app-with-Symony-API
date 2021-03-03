import React from "react";
import { View } from "react-native";
import { styles } from "./RenterHeader.styles";
import { H2 } from "../headers/TextHeaders";

const RenterFilterHeaderForTwoDates: React.FunctionComponent = (): JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.renterRow}>
        <H2>Please, enter two dates</H2>
      </View>
    </View>
  );
};

export default RenterFilterHeaderForTwoDates;
