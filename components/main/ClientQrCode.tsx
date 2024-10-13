import { View, Text, Dimensions } from "react-native";
import React, { useMemo, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { sizeText, theme } from "../../utils";
import { useUserStore } from "../../lib/store";

const { width } = Dimensions.get("window");

const ClientQrCode = () => {
  const { user } = useUserStore();

  const [error, setError] = useState("");

  const newQrCodeLink = useMemo(() => {
    const us = {
      id: user?.id,
      phone: user?.phone,
    };
    return JSON.stringify(us);
  }, [user]);

  return (
    <View
      style={{
        width: "100%",
        gap: 20,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!error ? (
        <QRCode
          value={newQrCodeLink}
          color={"#000"}
          backgroundColor={"#fff"}
          size={width * 0.8}
          onError={() =>
            setError("Impossible d'afficher votre QR Code! Revenez plus tard!")
          }
        />
      ) : (
        <Text
          style={{
            fontFamily: "Lato_400Regular",
            fontSize: sizeText.md,
            color: theme.error,
            textAlign: "center",
            width: "100%",
            marginTop: 20,
            marginBottom: 20,
            opacity: 0.5,
          }}
        >
          {error}
        </Text>
      )}

      <Text
        style={{
          fontFamily: "Lato_400Regular",
          fontSize: sizeText.sm,
          color: "dimgray",
          textAlign: "left",
          width: "100%",
        }}
      >
        faites scanner ce code QR pour lire ou echanger des points.
      </Text>
    </View>
  );
};

export default ClientQrCode;
