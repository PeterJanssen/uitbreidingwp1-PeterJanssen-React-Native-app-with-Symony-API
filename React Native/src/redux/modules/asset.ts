import { Asset } from "../../data";
import { Reducer } from "react";
import axios from "axios";
import { ToastAndroid } from "react-native";
import { AssetImage } from "../../data/asset/assetImage";
import { AssetLocation } from "../../data/asset/assetLocation";

// --- API ---

const BASE_URL = "http://localhost:8000/assets/";

// --- Action Types ---

const LOAD_ASSET_LIST = "PXLAssetManagementTool/room/LOAD_ASSET_LIST";
const LOAD_ASSET_LIST_SUCCESS =
  "PXLAssetManagementTool/room/LOAD_ASSET_LIST_SUCCESS";
const LOAD_ASSET_LIST_FAIL = "PXLAssetManagementTool/room/LOAD_ASSET_LIST_FAIL";

const FILTER_ASSET_LIST = "PXLAssetManagementTool/room/FILTER_ASSET_LIST";
const FILTER_ASSET_LIST_SUCCESS =
  "PXLAssetManagementTool/room/FILTER_ASSET_LIST_SUCCESS";
const FILTER_ASSET_LIST_FAIL =
  "PXLAssetManagementTool/room/FILTER_ASSET_LIST_FAIL";

const ADD_IMAGE_ASSET = "PXLAssetManagementTool/room/ADD_IMAGE_ASSET";
const ADD_IMAGE_ASSET_SUCCESS =
  "PXLAssetManagementTool/room/ADD_IMAGE_ASSET_SUCCESS";
const ADD_IMAGE_ASSET_FAIL = "PXLAssetManagementTool/room/ADD_IMAGE_ASSET_FAIL";

const ADD_LOCATION_ASSET = "PXLAssetManagementTool/room/ADD_LOCATION_ASSET";
const ADD_LOCATION_ASSET_SUCCESS =
  "PXLAssetManagementTool/room/ADD_LOCATION_ASSET_SUCCESS";
const ADD_LOCATION_ASSET_FAIL =
  "PXLAssetManagementTool/room/ADD_LOCATION_ASSET_FAIL";

type GetAssetListAction = {
  type: typeof LOAD_ASSET_LIST;
  payload: any;
};

type GetAssetListActionSuccess = {
  type: typeof LOAD_ASSET_LIST_SUCCESS;
  payload: Asset[];
};

type GetAssetListActionFail = {
  type: typeof LOAD_ASSET_LIST_FAIL;
  payload: [];
};

type FilterAssetListAction = {
  type: typeof FILTER_ASSET_LIST;
  payload: any;
};

type FilterAssetListActionSuccess = {
  type: typeof FILTER_ASSET_LIST_SUCCESS;
  payload: string;
};

type FilterAssetListActionFail = {
  type: typeof FILTER_ASSET_LIST_FAIL;
  payload: [];
};

type AddAssetImageAction = {
  type: typeof ADD_IMAGE_ASSET;
  payload: any;
};

type AddAssetImageActionSuccess = {
  type: typeof ADD_IMAGE_ASSET_SUCCESS;
  payload: AssetImage;
};

type AddAssetImageActionFail = {
  type: typeof ADD_IMAGE_ASSET_FAIL;
  payload: [];
};

type AddAssetLocationAction = {
  type: typeof ADD_LOCATION_ASSET;
  payload: any;
};

type AddAssetLocationActionSuccess = {
  type: typeof ADD_LOCATION_ASSET_SUCCESS;
  payload: AssetLocation;
};

type AddAssetLocationActionFail = {
  type: typeof ADD_LOCATION_ASSET_FAIL;
  payload: [];
};

type ActionTypes =
  | GetAssetListAction
  | GetAssetListActionSuccess
  | GetAssetListActionFail
  | FilterAssetListAction
  | FilterAssetListActionSuccess
  | FilterAssetListActionFail
  | AddAssetImageAction
  | AddAssetImageActionSuccess
  | AddAssetImageActionFail
  | AddAssetLocationAction
  | AddAssetLocationActionSuccess
  | AddAssetLocationActionFail;

// --- State Type ---

type AssetState = {
  list: Asset[];
  isLoadingList: boolean;
  filteredList: Asset[];
  isFilteringList: boolean;
  isAddingAssetImage: boolean;
  isAddingAssetLocation: boolean;
};

// --- Action Creators ---

export const getAssetList = (roomId: number) => {
  return async (dispatch) => {
    dispatch(setIsLoadingList());
    try {
      const response = await axios.get(`${BASE_URL}?roomId=${roomId}`);
      dispatch(getAssetListSuccess(response.data));
    } catch (error) {
      dispatch(getAssetListFail());
    }
  };
};

const setIsLoadingList = (): GetAssetListAction => ({
  type: LOAD_ASSET_LIST,
  payload: {},
});

const getAssetListSuccess = (assets: Asset[]): GetAssetListActionSuccess => ({
  type: LOAD_ASSET_LIST_SUCCESS,
  payload: assets,
});

const getAssetListFail = (): GetAssetListActionFail => ({
  type: LOAD_ASSET_LIST_FAIL,
  payload: [],
});

export const filterAssetList = (name: string) => {
  return async (dispatch) => {
    dispatch(setIsFilteringList());
    try {
      dispatch(filterAssetListSuccess(name));
    } catch (error) {
      dispatch(filterAssetListFail());
    }
  };
};

const setIsFilteringList = (): FilterAssetListAction => ({
  type: FILTER_ASSET_LIST,
  payload: {},
});

const filterAssetListSuccess = (
  name: string
): FilterAssetListActionSuccess => ({
  type: FILTER_ASSET_LIST_SUCCESS,
  payload: name,
});

const filterAssetListFail = (): FilterAssetListActionFail => ({
  type: FILTER_ASSET_LIST_FAIL,
  payload: [],
});

export const addAssetPicture = (assetImage: AssetImage) => {
  return async (dispatch) => {
    dispatch(setIsAddingAssetImage());
    try {
      await axios.patch(`${BASE_URL}${assetImage.assetId}/`, assetImage.base64);
      dispatch(addAssetImageSucces(assetImage));
      ToastAndroid.show(
        "Image for asset successfully saved.",
        ToastAndroid.SHORT
      );
    } catch (error) {
      dispatch(addAssetImageFail());
      if (error.message.includes("404")) {
        ToastAndroid.show("404.", ToastAndroid.SHORT);
      } else if (error.message.includes("400")) {
        ToastAndroid.show("400.", ToastAndroid.SHORT);
      } else if (error.message.includes("500")) {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
      }
    }
  };
};

const setIsAddingAssetImage = (): AddAssetImageAction => ({
  type: ADD_IMAGE_ASSET,
  payload: {},
});

const addAssetImageSucces = (
  assetImage: AssetImage
): AddAssetImageActionSuccess => ({
  type: ADD_IMAGE_ASSET_SUCCESS,
  payload: assetImage,
});

const addAssetImageFail = (): AddAssetImageActionFail => ({
  type: ADD_IMAGE_ASSET_FAIL,
  payload: null,
});

export const addAssetLocation = (assetLocation: AssetLocation) => {
  return async (dispatch) => {
    dispatch(setIsAddingAssetLocation());
    try {
      await axios.patch(
        `${BASE_URL}${assetLocation.assetId}/?geoLat=${assetLocation.assetLat}&geoLng=${assetLocation.assetLong}`
      );
      dispatch(addAssetLocationSucces(assetLocation));
      ToastAndroid.show(
        "Location for asset successfully saved.",
        ToastAndroid.SHORT
      );
    } catch (error) {
      dispatch(addAssetLocationFail());
      if (error.message.includes("404")) {
        ToastAndroid.show("404.", ToastAndroid.SHORT);
      } else if (error.message.includes("400")) {
        ToastAndroid.show("400.", ToastAndroid.SHORT);
      } else if (error.message.includes("500")) {
        ToastAndroid.show(`${error.message}`, ToastAndroid.SHORT);
      }
    }
  };
};

const setIsAddingAssetLocation = (): AddAssetLocationAction => ({
  type: ADD_LOCATION_ASSET,
  payload: {},
});

const addAssetLocationSucces = (
  assetLocation: AssetLocation
): AddAssetLocationActionSuccess => ({
  type: ADD_LOCATION_ASSET_SUCCESS,
  payload: assetLocation,
});

const addAssetLocationFail = (): AddAssetLocationActionFail => ({
  type: ADD_LOCATION_ASSET_FAIL,
  payload: null,
});

// --- Reducer ---

const reducer: Reducer<AssetState, ActionTypes> = (
  state = {
    list: [],
    isLoadingList: true,
    filteredList: [],
    isFilteringList: false,
    isAddingAssetImage: false,
    isAddingAssetLocation: false,
  },
  action
) => {
  switch (action.type) {
    case LOAD_ASSET_LIST:
      return { ...state, isLoadingList: true };
    case LOAD_ASSET_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        filteredList: action.payload,
        isLoadingList: false,
      };
    case LOAD_ASSET_LIST_FAIL:
      return { ...state, list: action.payload, isLoadingList: false };
    case FILTER_ASSET_LIST:
      return { ...state, isFilteringList: true };
    case FILTER_ASSET_LIST_SUCCESS:
      return {
        ...state,
        filteredList: state.list.filter((asset) =>
          asset.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
        isFilteringList: false,
      };
    case FILTER_ASSET_LIST_FAIL:
      return { ...state, isFilteringList: false };
    case ADD_IMAGE_ASSET:
      return { ...state, isAddingAssetPicture: true };
    case ADD_IMAGE_ASSET_SUCCESS:
      return {
        ...state,
        list: state.list.map((asset) =>
          asset.id === action.payload.assetId
            ? { ...asset, image: action.payload.base64 }
            : { ...asset }
        ),
        filteredList: state.list.map((asset) =>
          asset.id === action.payload.assetId
            ? { ...asset, image: action.payload.base64 }
            : { ...asset }
        ),
        isAddingAssetPicture: false,
      };
    case ADD_IMAGE_ASSET_FAIL:
      return { ...state, isAddingAssetPicture: false };
    case ADD_LOCATION_ASSET:
      return { ...state, isAddingAssetLocation: true };
    case ADD_LOCATION_ASSET_SUCCESS:
      return {
        ...state,
        list: state.list.map((asset) =>
          asset.id === action.payload.assetId
            ? {
                ...asset,
                geoLat: action.payload.assetLat,
                geoLng: action.payload.assetLong,
              }
            : { ...asset }
        ),
        filteredList: state.list.map((asset) =>
          asset.id === action.payload.assetId
            ? {
                ...asset,
                geoLat: action.payload.assetLat,
                geoLng: action.payload.assetLong,
              }
            : { ...asset }
        ),
        isAddingAssetLocation: false,
      };
    case ADD_LOCATION_ASSET_FAIL:
      return { ...state, isAddingAssetLocation: false };
    default:
      return state;
  }
};

export default reducer;
