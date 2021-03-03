import React from "react";
import { useNavigation } from "../../../hooks";
import { connect } from "react-redux";
import { Colors } from "../../../styles/_colors";
import { View, TouchableWithoutFeedback } from "react-native";

import { styles } from "./RenterDetail.styles";

import RenterHeader from "../../ui/renter/RenterHeader";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {};

const RenterDetail: React.FunctionComponent<Props> & {
  navigationOptions?: any;
} = (): JSX.Element => {
  const navigation = useNavigation();
  const firstName = navigation.state.params.firstName;
  const lastName = navigation.state.params.lastName;
  const fromDate = navigation.state.params.fromDate;
  const toDate = navigation.state.params.toDate;
  const roomId = navigation.state.params.roomId;
  return (
    <View style={styles.bodyContainer}>
      <View style={styles.headerContainer}>
        <RenterHeader
          firstName={firstName}
          lastName={lastName}
          fromDate={fromDate}
          toDate={toDate}
          roomId={roomId}
        />
      </View>
    </View>
  );
};

RenterDetail.navigationOptions = ({ navigation }) => ({
  title: "Renter details",
  headerStyle: {
    backgroundColor: Colors.primaryDark,
  },
  headerTitleStyle: {
    color: Colors.fontLight,
  },
  headerBackTitleStyle: {
    color: Colors.fontLight,
  },
});

const mapStateToProps = (state) => ({
  firstName: state.renter.firstName,
  lastName: state.renter.lastName,
  fromDate: state.renter.fromDate,
  toDate: state.renter.toDate,
  roomId: state.renter.roomId,
});

const mapDispatchToProps = (dispatch) => ({});

const RenterDetailPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RenterDetail);

export default RenterDetailPage;
