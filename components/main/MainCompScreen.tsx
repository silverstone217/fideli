import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useUserStore } from "../../lib/store";
import { sizeText, theme } from "../../utils";
import { StatusBar } from "expo-status-bar";
import { ButtonComponent } from "../ButtonComponent";
import ClientQrCode from "./ClientQrCode";
import { removeData } from "../../lib/storage";

const MainCompScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, setUser } = useUserStore();

  const removeUser = async () => {
    setLoading(true);
    setError("");
    try {
      setUser(null);
      // remove from storage
      await removeData("user");
      setTimeout(() => setUser(null), 1200);
    } catch (error) {
      setError("Erreur lors de la suppression de l'utilisateur");
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  if (!user) return null;
  return (
    <View style={styles.container}>
      {/* top welcome */}
      <View
        style={{
          width: "100%",
          gap: 5,
          paddingBottom: 60,
          borderBottomRightRadius: 40,
          borderBottomLeftRadius: 40,
          backgroundColor: theme.primary,
          paddingTop: 60,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 5,
          position: "relative",
        }}
      >
        <Text
          style={{
            fontFamily: "Lato_900Black",
            fontSize: sizeText.xl,
            textTransform: "capitalize",
            paddingHorizontal: 20,
            color: theme.textBtn,
          }}
          numberOfLines={1}
        >
          Bonjour {user.username}!
        </Text>
        <Pressable>
          <Text
            style={{
              fontFamily: "Lato_700Bold",
              fontSize: sizeText.sm,
              color: "lightgray",
              paddingHorizontal: 20,
              marginTop: 5,
            }}
          >
            +243-{user.phone}
          </Text>
        </Pressable>

        <Text
          style={{
            fontFamily: "Lato_400Regular",
            fontSize: sizeText.sm,
            color: "lightgray",
            paddingHorizontal: 20,
          }}
          numberOfLines={2}
        >
          Une belle journee s'annonce, pour depenser ou acquerir de points!
        </Text>

        <Text
          style={{
            fontFamily: "Lato_400Regular",
            fontSize: sizeText.xs,
            color: "lightgray",
            position: "absolute",
            bottom: 20,
            right: 20,
            left: 20,
            textAlign: "center",
          }}
        >
          a rejoint le{" "}
          {new Date(user.createdAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>

      {/* main */}
      <View
        style={{
          width: "100%",
          gap: 20,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "Lato_700Bold",
            fontSize: sizeText.md,
            color: theme.text,
            width: "100%",
          }}
        >
          Mes actions
        </Text>

        {/* button qrCode */}
        {/* <ButtonComponent
          title="Générer le code QR"
          variant="default"
          disabled={loading || !user}
          onPress={() => {}}
        /> */}

        {/* Qr code */}
        <ClientQrCode />
      </View>

      {/* bottom */}
      <StatusBar style="light" />
    </View>
  );
};

export default MainCompScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    // paddingHorizontal: 10,
  },
});
