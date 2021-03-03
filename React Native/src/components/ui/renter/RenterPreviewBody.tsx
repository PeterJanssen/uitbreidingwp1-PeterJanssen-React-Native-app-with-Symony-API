import React from "react";
import { View, Text } from "react-native";
import { styles } from "./RenterPreviewBody.styles";

type Props = {
  firstName: string;
  lastName: string;
  fromDate: string;
  toDate: string;
  roomId: number;
};

const RenterPreviewBody: React.FunctionComponent<Props> = (
  renter
): JSX.Element => {
  return (
    <View style={styles.row}>
      <Text style={styles.renterName}>
        Name: {renter.firstName} {renter.lastName}
      </Text>
    </View>
  );
};

export default RenterPreviewBody;
