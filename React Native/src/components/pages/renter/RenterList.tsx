import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { SearchBar } from "react-native-elements";
import RenterPreview from "../../ui/renter/RenterPreview";

import { styles } from "./RenterList.styles";
import { Renter } from "../../../data";
import { filterRenterList, getRenterList } from "../../../redux/modules/renter";

import { connect } from "react-redux";

import { useNavigation } from "../../../hooks";
import { Colors } from "../../../styles/_colors";
import { bindActionCreators } from "redux";
import Icon from "react-native-vector-icons/FontAwesome";

type Props = {
  renters: Renter[];
  isLoading: boolean;
  getRenterList: () => (dispatch: any) => Promise<any>;
  filteredRenters: Renter[];
  isFiltering: boolean;
  filterList: (name: string) => (dispatch: any) => Promise<any>;
};

const RentersList: React.FunctionComponent<Props> & {
  navigationOptions?: any;
} = (props): JSX.Element => {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState("");
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

  useEffect(() => {
    props.getRenterList();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    props.getRenterList();
  };

  const updateFilter = (filter) => {
    setFilter(filter);
    props.filterList(filter);
  };

  const renderItem = ({ item }: { item: Renter }): JSX.Element => (
    <View style={styles.renterContainer}>
      <RenterPreview {...item} navigateRenter={navigateRenter} />
    </View>
  );

  const RenderSeparator = (): JSX.Element => <View style={styles.separator} />;

  return (
    <View style={styles.listContainer}>
      {props.isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text>Loading renters...</Text>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {props.renters.length !== 0 ? (
            <View>
              <SearchBar
                placeholder="Enter renter name..."
                onChangeText={updateFilter}
                value={filter}
              />
              <FlatList
                data={props.filteredRenters}
                renderItem={renderItem}
                ItemSeparatorComponent={RenderSeparator}
                keyExtractor={(renter) => renter.lastName || renter.firstName}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          ) : (
            <View style={styles.errorContainer}>
              <Text style={{ ...styles.errorItem, fontSize: 22 }}>
                No renters found.
              </Text>
              <View style={styles.errorItem}>
                <Button
                  title="Try again"
                  onPress={() => props.getRenterList()}
                  color={Colors.primaryDark}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

RentersList.navigationOptions = ({ navigation }) => ({
  title: "List of renters",
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleStyle: {
    color: Colors.fontDark,
  },
  headerRight: (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("RentersBetweenTwoDates")}
    >
      <Icon
        name="filter"
        style={styles.navigationItem}
        color={Colors.fontDark}
      />
    </TouchableWithoutFeedback>
  ),
});

const mapStateToProps = (state) => ({
  renters: state.renter.list,
  isLoading: state.renter.isLoadingList,
  filteredRenters: state.renter.filteredList,
  isFiltering: state.renter.isFilteringList,
});

const mapDispatchToProps = (dispatch) => ({
  getRenterList: bindActionCreators(getRenterList, dispatch),
  filterList: bindActionCreators(filterRenterList, dispatch),
});

const RentersListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RentersList);

export default RentersListPage;
