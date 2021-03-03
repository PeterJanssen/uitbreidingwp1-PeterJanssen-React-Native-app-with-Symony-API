import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/_colors";

export const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  renterContainer: {
    flex: 1,
    margin: 8,
  },
  separator: {
    marginHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.listItemSeparator,
  },
  navigationItemsContainer: {
    flex: 1,
  },
  navigationItem: {
    flex: 1,
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