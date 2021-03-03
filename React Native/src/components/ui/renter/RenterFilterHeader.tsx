import React from "react";
import { View } from "react-native";
import { styles } from "./RenterHeader.styles";
import { H2 } from "../headers/TextHeaders";

const RenterFilterHeader: React.FunctionComponent = (): JSX.Element => {
  return (
    <View style={styles.header}>
      <View style={styles.renterRow}>
        <H2>Please, enter a name for the renter</H2>
      </View>
    </View>
  );
};

export default RenterFilterHeader;
