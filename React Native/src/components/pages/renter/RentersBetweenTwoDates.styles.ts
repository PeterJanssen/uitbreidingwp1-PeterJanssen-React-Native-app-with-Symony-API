import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/_colors";

export const styles = StyleSheet.create({
  separator: {
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.listItemSeparator,
  },
  bodyContainer: {
    flex: 1,
  },
  headerContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  DatePickersForm: {
    flexDirection: "column"
  },
  DatepickerForRenters: {
    width: 200,
    paddingBottom: 10,
  },
  TwoDatesForm: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    marginVertical: 32,
    padding: 50,
  },
  renterListContainer: {
    flex: 8,
    marginHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.accentLight,
  },
  noRentersTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noRentersText: {
    fontSize: 22,
  },
  navigationItem: {
    fontSize: 20,
    margin: 14,
  },
});
