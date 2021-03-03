import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./AssetPreview.styles";
import AssetPreviewBody from "./AssetPreviewBody";

type Props = {
  id: number;
  roomId: number;
  name: string;
  geoLat: number;
  geoLng: number;
  image: string;
  navigateTicket: (
    assetName: string,
    assetId: number,
    geoLat: number,
    geoLng: number,
    image: string
  ) => void;
};

const AssetPreview: React.FunctionComponent<Props> = (asset): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={() =>
        asset.navigateTicket(
          asset.name,
          asset.id,
          asset.geoLat,
          asset.geoLng,
          asset.image
        )
      }
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <AssetPreviewBody {...asset} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AssetPreview;
