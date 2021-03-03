import React from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./RenterPreview.styles";
import RenterPreviewBody from "./RenterPreviewBody";

type Props = {
  firstName: string;
  lastName: string;
  fromDate: string;
  toDate: string;
  roomId: number;
  navigateRenter: (
    firstname: string,
    lastName: string,
    fromDate: string,
    toDate: string,
    roomId: number
  ) => void;
};

const RenterPriew: React.FunctionComponent<Props> = (renter): JSX.Element => (
  <TouchableOpacity
    onPress={() =>
      renter.navigateRenter(
        renter.firstName,
        renter.lastName,
        renter.fromDate,
        renter.toDate,
        renter.roomId
      )
    }
  >
    <View style={styles.container}>
      <View style={styles.header}>
        <RenterPreviewBody {...renter} />
      </View>
    </View>
  </TouchableOpacity>
);

export default RenterPriew;
