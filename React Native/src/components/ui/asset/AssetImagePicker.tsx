import React, { useState } from "react";
import { View, Button, Text, Image, Alert } from "react-native";
import { Colors } from "../../../styles/_colors";
import * as Permissions from "expo-permissions";
import { styles } from "./AssetImagePicker.styles";
import { connect } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "../../../hooks";
import { bindActionCreators } from "redux";
import { addAssetPicture } from "../../../redux/modules/asset";
import { AssetImage } from "../../../data/asset/assetImage";

type Props = {
  addAssetPicture: (picture: AssetImage) => (dispatch: any) => Promise<void>;
};

const ImgPicker: React.FunctionComponent<Props> & {
  navigationOptions?: any;
} = (props): JSX.Element => {
  const navigation = useNavigation();
  const assetId = navigation.state.params.assetId;
  const image = navigation.state.params.image;

  const [pickedImage, setPickedImage] = useState("");
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "Camera permissions need to be granted to use this function.",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
      base64: true,
    });

    if (image.cancelled === false) {
      setPickedImage(image.uri);
      props.addAssetPicture({ assetId: assetId, base64: image.base64 });
    }
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image of asset"
        color={Colors.primaryDark}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const mapDispatchToPros = (dispatch) => ({
  addAssetPicture: bindActionCreators(addAssetPicture, dispatch),
});

const ImgPickerComponent = connect(() => ({}), mapDispatchToPros)(ImgPicker);

export default ImgPickerComponent;
