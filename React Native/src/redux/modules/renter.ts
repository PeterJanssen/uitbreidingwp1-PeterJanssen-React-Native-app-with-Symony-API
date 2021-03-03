import { Renter } from "../../data";
import { Reducer } from "react";
import axios from "axios";
import { ToastAndroid } from "react-native";
import * as moment from "moment";

// --- API ---

const BASE_URL = "http://localhost:8000/renters/";

// --- Action Types ---

const LOAD_RENTER_LIST = "PXLAssetManagementTool/renter/LOAD_ASSET_LIST";
const LOAD_RENTER_LIST_SUCCESS =
  "PXLAssetManagementTool/renter/LOAD_ASSET_LIST_SUCCESS";
const LOAD_RENTER_LIST_FAIL =
  "PXLAssetManagementTool/renter/LOAD_ASSET_LIST_FAIL";

const FILTER_RENTER_LIST = "PXLAssetManagementTool/renter/FILTER_ASSET_LIST";
const FILTER_RENTER_LIST_SUCCESS =
  "PXLAssetManagementTool/renter/FILTER_ASSET_LIST_SUCCESS";
const FILTER_RENTER_LIST_FAIL =
  "PXLAssetManagementTool/renter/FILTER_ASSET_LIST_FAIL";

const LOAD_RENTER_LIST_BY_TWO_DATES =
  "PXLAssetManagementTool/renter/LOAD_RENTER_LIST_BY_TWO_DATES";
const LOAD_RENTER_LIST_BY_TWO_DATES_SUCCESS =
  "PXLAssetManagementTool/renter/LOAD_RENTER_LIST_BY_TWO_DATES_SUCCES";
const LOAD_RENTER_LIST_BY_TWO_DATES_FAIL =
  "PXLAssetManagementTool/renter/LOAD_RENTER_LIST_BY_TWO_DATES_FAIL";

const LOAD_RENTER_DETAIL = "PXLAssetManagementTool/renter/LOAD_RENTER_DETAIL";
const LOAD_RENTER_DETAIL_SUCCESS =
  "PXLAssetManagementTool/renter/LOAD_RENTER_DETAIL_SUCCESS";
const LOAD_RENTER_DETAIL_FAIL =
  "PXLAssetManagementTool/renter/LOAD_RENTER_DETAIL_FAIL";

type GetRenterListAction = {
  type: typeof LOAD_RENTER_LIST;
  payload: any;
};

type GetRenterListActionSuccess = {
  type: typeof LOAD_RENTER_LIST_SUCCESS;
  payload: Renter[];
};

type GetRenterListActionFail = {
  type: typeof LOAD_RENTER_LIST_FAIL;
  payload: [];
};

type FilterRenterListAction = {
  type: typeof FILTER_RENTER_LIST;
  payload: any;
};

type FilterRenterListActionSuccess = {
  type: typeof FILTER_RENTER_LIST_SUCCESS;
  payload: string;
};

type FilterRenterListActionFail = {
  type: typeof FILTER_RENTER_LIST_FAIL;
  payload: [];
};

type GetRenterDetailAction = {
  type: typeof LOAD_RENTER_DETAIL;
  payload: {};
};

type GetRenterDetailActionSuccess = {
  type: typeof LOAD_RENTER_DETAIL_SUCCESS;
  payload: Renter;
};

type GetRenterDetailActionFail = {
  type: typeof LOAD_RENTER_DETAIL_FAIL;
  payload: {};
};

type GetRentersByTwoDatesAction = {
  type: typeof LOAD_RENTER_LIST_BY_TWO_DATES;
  payload: any;
};

type GetRentersByTwoDatesActionSuccess = {
  type: typeof LOAD_RENTER_LIST_BY_TWO_DATES_SUCCESS;
  payload: Renter[];
};

type GetRentersByTwoDatesActionFail = {
  type: typeof LOAD_RENTER_LIST_BY_TWO_DATES_FAIL;
  payload: [];
};

type ActionTypes =
  | GetRenterListAction
  | GetRenterListActionSuccess
  | GetRenterListActionFail
  | GetRenterDetailAction
  | GetRenterDetailActionSuccess
  | GetRenterDetailActionFail
  | FilterRenterListAction
  | FilterRenterListActionSuccess
  | FilterRenterListActionFail
  | GetRentersByTwoDatesAction
  | GetRentersByTwoDatesActionSuccess
  | GetRentersByTwoDatesActionFail;

// --- State Type ---

type RoomState = {
  list: Renter[];
  isLoadingList: boolean;
  filteredList: Renter[];
  isFilteringList: boolean;
  listByTwoDates: Renter[];
  isLoadingListByTwoDates: boolean;
};

// --- Action Creators ---

export const getRenterList = () => {
  return async (dispatch) => {
    dispatch(setIsLoadingList());
    try {
      const response = await axios.get(BASE_URL);
      dispatch(getRenterListSuccess(response.data));
    } catch (error) {
      dispatch(getRenterListFail());
    }
  };
};

const setIsLoadingList = (): GetRenterListAction => ({
  type: LOAD_RENTER_LIST,
  payload: {},
});

const getRenterListSuccess = (
  renters: Renter[]
): GetRenterListActionSuccess => ({
  type: LOAD_RENTER_LIST_SUCCESS,
  payload: renters,
});

const getRenterListFail = (): GetRenterListActionFail => ({
  type: LOAD_RENTER_LIST_FAIL,
  payload: [],
});

export const getRenter = (id: number) => {
  return async (dispatch) => {
    dispatch(setIsLoadingDetail());
    try {
      const response = await axios.get(`${BASE_URL}${id}`);
      dispatch(getRenterSuccess(response.data));
    } catch (error) {
      dispatch(getRenterFail());
    }
  };
};

const setIsLoadingDetail = (): GetRenterDetailAction => ({
  type: LOAD_RENTER_DETAIL,
  payload: {},
});

const getRenterSuccess = (renter: Renter): GetRenterDetailActionSuccess => ({
  type: LOAD_RENTER_DETAIL_SUCCESS,
  payload: renter,
});

const getRenterFail = (): GetRenterDetailActionFail => ({
  type: LOAD_RENTER_DETAIL_FAIL,
  payload: {},
});

export const filterRenterList = (name: string) => {
  return async (dispatch) => {
    dispatch(setIsFilteringList());
    try {
      dispatch(filterRenterListSuccess(name));
    } catch (error) {
      dispatch(filterRenterListFail());
    }
  };
};

const setIsFilteringList = (): FilterRenterListAction => ({
  type: FILTER_RENTER_LIST,
  payload: {},
});

const filterRenterListSuccess = (
  name: string
): FilterRenterListActionSuccess => ({
  type: FILTER_RENTER_LIST_SUCCESS,
  payload: name,
});

const filterRenterListFail = (): FilterRenterListActionFail => ({
  type: FILTER_RENTER_LIST_FAIL,
  payload: [],
});

const setIsLoadingListByTwoDates = (): GetRentersByTwoDatesAction => ({
  type: LOAD_RENTER_LIST_BY_TWO_DATES,
  payload: {},
});

const getRentersByTwoDatesSucces = (
  renters: Renter[]
): GetRentersByTwoDatesActionSuccess => ({
  type: LOAD_RENTER_LIST_BY_TWO_DATES_SUCCESS,
  payload: renters,
});

const getRentersByTwoDatesFail = (): GetRentersByTwoDatesActionFail => ({
  type: LOAD_RENTER_LIST_BY_TWO_DATES_FAIL,
  payload: [],
});

export const getRentersByTwoDates = (fromDate: string, toDate: string) => {
  console.log(`${BASE_URL}?fromDate=${fromDate}&toDate=${toDate}`);
  return async (dispatch) => {
    dispatch(setIsLoadingListByTwoDates());
    try {
      const response = await axios.get(
        `${BASE_URL}?fromDate=${fromDate}&toDate=${toDate}`
      );
      dispatch(getRentersByTwoDatesSucces(response.data));
      ToastAndroid.show("Search completed successfully.", ToastAndroid.SHORT);
    } catch (error) {
      dispatch(getRentersByTwoDatesFail());
      if (error.message.includes("404")) {
        //ToastAndroid.show("No renters found.", ToastAndroid.SHORT);
      } else if (error.message.includes("400")) {
        // ToastAndroid.show("Your input was invalid.", ToastAndroid.SHORT);
      } else {
        //ToastAndroid.show("An error occurred.", ToastAndroid.SHORT);
      }
    }
  };
};

// --- Reducer ---

const reducer: Reducer<RoomState, ActionTypes> = (
  state = {
    list: [],
    isLoadingList: true,
    filteredList: [],
    isFilteringList: false,
    listByTwoDates: [],
    isLoadingListByTwoDates: false,
  },
  action
) => {
  switch (action.type) {
    case LOAD_RENTER_LIST:
      return { ...state, isLoadingList: true };
    case LOAD_RENTER_LIST_SUCCESS:
      return {
        ...state,
        list: action.payload,
        filteredList: action.payload,
        isLoadingList: false,
      };
    case LOAD_RENTER_LIST_FAIL:
      return { ...state, list: action.payload, isLoadingList: false };
    case FILTER_RENTER_LIST:
      return { ...state, isFilteringList: true };
    case FILTER_RENTER_LIST_SUCCESS:
      return {
        ...state,
        filteredList: state.list.filter(
          (renter) =>
            renter.lastName
              .toLowerCase()
              .includes(action.payload.toLowerCase()) ||
            renter.firstName
              .toLowerCase()
              .includes(action.payload.toLowerCase())
        ),
        isFilteringList: false,
      };
    case FILTER_RENTER_LIST_FAIL:
      return {
        ...state,
        listByTwoDates: action.payload,
        isFilteringList: false,
      };
    case LOAD_RENTER_LIST_BY_TWO_DATES:
      return { ...state, isLoadingListByTwoDates: true };
    case LOAD_RENTER_LIST_BY_TWO_DATES_SUCCESS:
      console.log(action.payload);
      return {
        ...state,
        listByTwoDates: action.payload,
        isLoadingListByTwoDates: false,
      };
    case LOAD_RENTER_LIST_BY_TWO_DATES_FAIL:
      console.log(action.payload);
      return {
        ...state,
        listByTwoDates: action.payload,
        isLoadingListByTwoDates: false,
      };
    default:
      return state;
  }
};

export default reducer;
