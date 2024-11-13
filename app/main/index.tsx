import { ScrollView, Text } from "react-native";
import React from "react";
import { sizeText, theme } from "../../utils";
import { useShopStore, useUserNameStore, useUserStore } from "../../lib/store";
import { Redirect } from "expo-router";
import MainCompScreen from "../../components/main/MainCompScreen";
import { StatusBar } from "expo-status-bar";

const MainScreen = () => {
  const { username } = useUserNameStore();
  const { shop } = useShopStore();
  const { user, setUser } = useUserStore();

  if (!user) {
    return <Redirect href={"/"} />;
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: theme.background,
        position: "relative",
      }}
    >
      <MainCompScreen />

      <Text
        style={{
          fontFamily: "Lato_400Regular",
          fontSize: sizeText.xs,
          color: theme.text,
          position: "absolute",
          bottom: 20,
          right: 20,
          left: 20,
          textAlign: "center",
        }}
      >
        Servi group inc 2024
      </Text>
      <StatusBar style="light" />
      {/* {shop ? <MainComponent /> : <ShopForm />} */}
    </ScrollView>
  );
};

export default MainScreen;
