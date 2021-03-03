import React, { useState } from "react";
import { ActivityIndicator, View, Text, FlatList, Button } from "react-native";

import RenterPreview from "../../ui/renter/RenterPreview";

import { Renter } from "../../../data";

import { getRentersByTwoDates } from "../../../redux/modules/renter";

import { connect } from "react-redux";

import { styles } from "./RentersBetweenTwoDates.styles";

import { useNavigation } from "../../../hooks";
import { Colors } from "../../../styles/_colors";
import { bindActionCreators } from "redux";
import RenterFilterHeaderForTwoDates from "../../ui/renter/RenterFilterHeaderForTwoDates";
import DatePicker from "react-native-datepicker";
import moment from "moment";

type Props = {
  listByTwoDates: Renter[];
  isLoadingListByTwoDates: boolean;
  getRenterListByTwoDates: (
    fromDate: string,
    toDate: string
  ) => (dispatch: any) => Promise<any>;
};

const RentersByTwoDatesList: React.FunctionComponent<Props> & {
  navigationOptions?: any;
} = (props): JSX.Element => {
  const navigation = useNavigation();
  const navigateRenter = (
    firstName: string,
    lastName: string,
    fromDate: string,
    toDate: string,
    roomId: number
  ) =>
    navigation.navigate("Renter", {
      firstName,
      lastName,
      fromDate,
      toDate,
      roomId,
    });
  const renderItem = ({ item }: { item: Renter }): JSX.Element => (
    <View style={styles.renterListContainer}>
      <RenterPreview {...item} navigateRenter={navigateRenter} />
    </View>
  );

  const renderSeparator = (): JSX.Element => <View style={styles.separator} />;

  const [fromDate, setFromDate] = useState("");

  const updateFromDate = (fromDate) => {
    setFromDate(fromDate);
  };

  const [toDate, setToDate] = useState("");

  const updatetoDate = (toDate) => {
    setToDate(toDate);
  };

  return (
    <View style={styles.bodyContainer}>
      <View style={styles.headerContainer}>
        <RenterFilterHeaderForTwoDates />
      </View>
      <View style={styles.TwoDatesForm}>
        <View style={styles.DatePickersForm}>
          <DatePicker
            style={styles.DatepickerForRenters}
            date={fromDate}
            mode="date"
            placeholder="select start date"
            format="YYYY-MM-DD"
            minDate={moment().format("YYYY-MM-DD")}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              console.log(date);
              updateFromDate(date);
            }}
          />
          <DatePicker
            style={styles.DatepickerForRenters}
            date={toDate}
            mode="date"
            placeholder="select end date"
            format="YYYY-MM-DD"
            minDate={fromDate ? fromDate : moment().format("YYYY-MM-DD")}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(toDate) => {
              updatetoDate(toDate);
            }}
          />
        </View>
        <View>
          <Button
            title="Search"
            onPress={() => props.getRenterListByTwoDates(fromDate, toDate)}
            color={Colors.primaryDark}
          />
        </View>
      </View>
      <View style={styles.renterListContainer}>
        {props.listByTwoDates.length === 0 || props.isLoadingListByTwoDates ? (
          <View style={styles.noRentersTextContainer}>
            {props.isLoadingListByTwoDates ? (
              <View>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.noRentersText}>Loading renters...</Text>
              </View>
            ) : (
              <Text style={styles.noRentersText}>No renters to display.</Text>
            )}
          </View>
        ) : (
          <FlatList
            data={props.listByTwoDates}
            renderItem={renderItem}
            ItemSeparatorComponent={renderSeparator}
            keyExtractor={(renter) => renter.lastName || renter.firstName}
          />
        )}
      </View>
    </View>
  );
};

RentersByTwoDatesList.navigationOptions = () => ({
  title: "Renters by two dates filter",
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    color: Colors.fontDark,
  },
  headerBackTitleStyle: {
    color: Colors.fontDark,
  },
});

const mapStateToProps = (state) => ({
  listByTwoDates: state.renter.listByTwoDates,
  isLoadingListByTwoDates: state.renter.isLoadingListByTwoDates,
});

const mapDispatchToProps = (dispatch) => ({
  getRenterListByTwoDates: bindActionCreators(getRentersByTwoDates, dispatch),
});

const RentersByTwoDatesPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RentersByTwoDatesList);

export default RentersByTwoDatesPage;
