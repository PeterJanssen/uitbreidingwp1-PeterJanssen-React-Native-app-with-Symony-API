import React, { useState } from "react";
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Colors } from "../../../styles/_colors";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import MapPreview from "./MapPreview";
import { AssetLocation } from "../../../data/asset/assetLocation";
import { useNavigation } from "../../../hooks";
import { bindActionCreators } from "redux";
import { addAssetLocation } from "../../../redux/modules/asset";
import { styles } from "./AssetLocationPicker.styles";

type Props = {
  addAssetLocation: (
    location: AssetLocation
  ) => (dispatch: any) => Promise<void>;
};

const LocationPicker: React.FunctionComponent<Props> & {
  navigationOptions?: any;
} = (props): JSX.Element => {
  const navigation = useNavigation();
  const assetId = navigation.state.params.assetId;

  const longitude = navigation.state.params.assetLat;
  const latitude = navigation.state.params.assetLong;

  const [isFetching, setIsFetching] = useState(false);

  const [assetLng, setAssetLng] = useState(longitude);
  const [assetLat, setAssetLat] = useState(latitude);
  const [pickedLocation, setPickedLocation] = useState({});

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "Location permissions need to be granted to use this function.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const getLocationHander = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeout: 10000,
      });
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      props.addAssetLocation({
        assetId: assetId,
        assetLat: location.coords.latitude,
        assetLong: location.coords.longitude,
      });
      setAssetLat(location.coords.latitude);
      setAssetLng(location.coords.longitude);
    } catch (err) {
      Alert.alert("Could not fetch location", "Please try again later", [
        { text: "Okay" },
      ]);
    }
    setIsFetching(false);
  };

  return (
    <View style={styles.locationPicker}>
      <View style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : !assetLng || !assetLat ? (
          <Text>No location chosen yet!</Text>
        ) : (
          <Text>
            Current location longitude: {assetLng}, latitude: {assetLat}
          </Text>
        )}
      </View>
      <Button
        title="Add current Location"
        color={Colors.primaryDark}
        onPress={getLocationHander}
      />
    </View>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addAssetLocation: bindActionCreators(addAssetLocation, dispatch),
});

const LocationPickerComponent = connect(
  () => ({}),
  mapDispatchToProps
)(LocationPicker);

export default LocationPickerComponent;
