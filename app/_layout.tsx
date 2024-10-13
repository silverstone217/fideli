import React from "react";
import { Stack } from "expo-router";
import {
  Lato_100Thin,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
  useFonts,
} from "@expo-google-fonts/lato";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { getData } from "../lib/storage";
import { useShopStore, useUserNameStore, useUserStore } from "../lib/store";
import { ShopType, UserType } from "../types";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  });

  const { username, setUsername } = useUserNameStore();
  const { shop, setShop } = useShopStore();
  const { user, setUser } = useUserStore();

  // get username
  useEffect(() => {
    const getName = async () => {
      const myName = await getData("username");
      if (myName) {
        setUsername(myName);
      } else {
        setUsername(null);
      }
    };
    getName();
  }, []);

  // get user
  useEffect(() => {
    const getUser = async () => {
      const myUser = (await getData("user")) as UserType | null;
      if (myUser) {
        setUser(myUser);
      } else {
        setUser(null);
      }
    };
    getUser();
  }, []);

  // get shop
  useEffect(() => {
    const getShopData = async () => {
      const myShop = (await getData("shop")) as ShopType | null;
      if (myShop) {
        setShop(myShop);
      } else {
        setShop(null);
      }
    };
    getShopData();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </>
  );
}
