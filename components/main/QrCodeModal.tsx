import { View, Text, Modal, Alert, TextInput, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import { ButtonComponent } from "../ButtonComponent";
import { sizeText, theme } from "../../utils";
import { useShopStore } from "../../lib/store";
import { isEmptyString } from "../../utils/function";
import QRCode from "react-native-qrcode-svg";

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  type: "vente" | "points";
}

const QrCodeModal = ({ visible, onClose, type }: ModalProps) => {
  const [price, setPrice] = useState("");
  const { shop } = useShopStore();
  //   const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isPriceSet, setIsPriceSet] = useState(false);

  if (!shop) return null;

  const newQrCodeLink = useMemo(() => {
    const linkQr = {
      name: shop.name,
      address: shop.address,
      price: price.trim(),
      secret: "Fideli80",
      type,
      devise: type === "vente" ? "usd" : "undefined",
    };

    return JSON.stringify(linkQr);
  }, [price, shop]);

  //   console.log(typeof newQrCodeLink);

  return (
    <Modal
      style={{
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        gap: 5,
      }}
      animationType="slide"
      // transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        onClose();
      }}
    >
      <View
        style={{
          backgroundColor: theme.secondary,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          paddingHorizontal: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Add your QR code here */}
        {!isPriceSet ? (
          <View
            style={{
              width: "100%",

              gap: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Lato_700Bold",
                fontSize: sizeText.md,
                color: theme.text,
                textAlign: "left",
                width: "100%",
              }}
            >
              Entrez{" "}
              {type === "vente"
                ? "le prix de votre article"
                : "les points du client"}{" "}
              pour générer le code QR
            </Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              placeholder="Prix de l'article"
              keyboardType="numeric"
              returnKeyType="done"
              style={{
                width: "100%",
                padding: 15,
                borderWidth: 1,
                borderColor: "dimgray",
                borderRadius: 10,
              }}
              placeholderTextColor={"dimgray"}
            />
          </View>
        ) : (
          <View
            style={{
              width: "100%",
              gap: 15,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode
              value={newQrCodeLink}
              color={"#000"}
              backgroundColor={"#fff"}
              size={300}
            />

            <Text
              style={{
                fontFamily: "Lato_400Regular",
                fontSize: sizeText.sm,
                color: theme.textBtn,
                textAlign: "left",
                width: "100%",
              }}
            >
              {" "}
              Faites scanner ce code pour effectuer un achat ou lire des points
              de fidelités.
            </Text>

            <Pressable
              onPress={() => setIsPriceSet(false)}
              style={{
                width: "50%",
                padding: 15,
                borderWidth: 1,
                borderColor: "dimgray",
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Lato_700Bold",
                  fontSize: sizeText.sm,
                  color: theme.textBtn,
                }}
              >
                Refixer le prix
              </Text>
            </Pressable>
          </View>
        )}

        <View
          style={{
            width: "100%",
            gap: 15,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          {!isPriceSet && (
            <ButtonComponent
              title={loading ? "en cours..." : "Generer un Qr Code"}
              onPress={() => {
                setLoading(true);
                setTimeout(() => {
                  setIsPriceSet(true);
                  setLoading(false);
                }, 1500);
              }}
              disabled={isEmptyString(price) || loading}
              variant="default"
            />
          )}
          <ButtonComponent
            title="Annuler"
            onPress={onClose}
            disabled={false}
            variant="outline"
          />
        </View>
      </View>
    </Modal>
  );
};

export default QrCodeModal;
