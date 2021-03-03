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
  renterDetails: {
    flex: 1,
    flexWrap: "wrap",
    color: Colors.transparentText,
    fontSize: 22,
    textAlign: "center"
  },
  headerContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerRightContainer: {
    flex: 1,
    flexDirection: "row",
  },
  navigationItem: {
    fontSize: 20,
    margin: 14,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginVertical: 32,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    marginVertical: 32,
  },
  errorItem: {
    flex: 1,
  },
});