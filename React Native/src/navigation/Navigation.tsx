import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer } from "react-navigation";
import RentersListPage from "../components/pages/renter/RenterList";
import RenterDetailPage from "../components/pages/renter/RenterDetail";
import RentersBetweenTwoDatesPage from "../components/pages/renter/RentersBetweenTwoDates";
import RoomDetailPage from "../components/pages/room/RoomDetail";
import RoomsByHappinessScorePage from "../components/pages/room/RoomsByHappinessScoreList";
import RoomsListPage from "../components/pages/room/RoomsList";
import CreateTicketPage from "../components/pages/ticket/CreateTicket";
import TicketDetailPage from "../components/pages/ticket/TicketDetail";
import TicketsListPage from "../components/pages/ticket/TicketsList";
import { Colors } from "../styles/_colors";
import { Ionicons } from "@expo/vector-icons";

const RenterNavigator = createStackNavigator({
  Renters: {
    screen: RentersListPage,
  },
  Renter: {
    screen: RenterDetailPage,
  },
  RentersBetweenTwoDates: {
    screen: RentersBetweenTwoDatesPage,
  },
});

const RoomNavigator = createStackNavigator({
  Home: {
    screen: RoomsListPage,
  },
  RoomsByHappinessScore: {
    screen: RoomsByHappinessScorePage,
  },
  Room: {
    screen: RoomDetailPage,
  },
  Tickets: {
    screen: TicketsListPage,
  },
  Ticket: {
    screen: TicketDetailPage,
  },
  CreateTicket: {
    screen: CreateTicketPage,
  },
});

const tabConfig = {
  Rooms: {
    screen: RoomNavigator,
    navigationOptions: {
      tabBarLabel: "Rooms",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="md-home" size={24} color={tabInfo.tintColor} />;
      },
    },
  },
  Renters: {
    screen: RenterNavigator,
    navigationOptions: {
      tabBarLabel: "Renters",
      tabBarIcon: (tabInfo) => {
        return <Ionicons name="md-person" size={24} color={tabInfo.tintColor} />;
      },
    },
  },
};

const tabNavigator =
  createBottomTabNavigator(tabConfig, {
        tabBarOptions: {
          activeTintColor: Colors.primary,
        },
      });

export default createAppContainer(tabNavigator);
