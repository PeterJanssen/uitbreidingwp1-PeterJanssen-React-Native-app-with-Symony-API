import React from "react";
import { View } from "react-native";
import { styles } from "./RenterHeader.styles";
import { H1, H2 } from "../headers/TextHeaders";

type Props = {
  firstName: string;
  lastName: string;
  toDate: string;
  fromDate: string;
  roomId: number;
};

const RenterHeader: React.FunctionComponent<Props> = (renter): JSX.Element => {
  return (
    <View style={styles.header}>
      <H1>
        Renter "{renter.firstName} {renter.lastName}"
      </H1>
      <H2>Renting room: {renter.roomId}</H2>
      <H2>
        From {renter.fromDate} until {renter.toDate}
      </H2>
    </View>
  );
};

export default RenterHeader;
