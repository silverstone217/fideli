import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { sizeText, theme } from "../utils";
import { Redirect } from "expo-router";
import { ButtonComponent } from "../components/ButtonComponent";
import { useState } from "react";
import { isEmptyString } from "../utils/function";
import { useUserNameStore, useUserStore } from "../lib/store";
import { storeData } from "../lib/storage";
import uuid from "react-native-uuid";
import { UserType } from "../types";

export default function App() {
  const [myUsername, setMyUsername] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { username, setUsername } = useUserNameStore();
  const { user, setUser } = useUserStore();

  if (user) {
    return <Redirect href={"/main"} />;
  }

  const handleChange = async () => {
    if (isEmptyString(myUsername) || isEmptyString(phone)) {
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const trimUserName = myUsername.trim();
      // const saveData = await storeData("username", trimUserName);
      const id = uuid.v4().toString().replace(/-/g, "");

      const formData: UserType = {
        username: trimUserName,
        phone: phone.trim(),
        id,
        createdAt: Date.now(),
      };

      const savedUser = await storeData("user", formData);
      setTimeout(() => setSuccess("Bienvenue, " + trimUserName), 1000);
      setTimeout(() => {
        // setUsername(trimUserName as string);
        setUser(formData as UserType);
        setError("");
        setPhone("");
        setMyUsername("");
      }, 1500);
    } catch (error) {
      setError("Erreur lors de l'enregistrement");
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View style={styles.container}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontFamily: "Lato_900Black", fontSize: sizeText.xxl }}>
            Bienvenue sur <Text style={{ color: theme.primary }}>Fideli!</Text>
          </Text>
          <Text
            style={{ fontFamily: "Lato_400Regular", fontSize: sizeText.sm }}
          >
            Conserver vos points de fidelités, gouter au meilleur de service de
            reduction sur achat!
          </Text>
        </View>

        {/* separator */}
        <View
          style={{
            height: 15,
          }}
        />

        <TextInput
          style={{
            fontFamily: "Lato_400Regular",
            fontSize: sizeText.md,
            width: "100%",
            borderWidth: 0.5,
            borderColor: "#000",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          placeholder="Entrer un nom d'utilisateur"
          value={myUsername}
          onChangeText={setMyUsername}
          autoCorrect={false}
          returnKeyType="next"
        />

        <TextInput
          style={{
            fontFamily: "Lato_400Regular",
            fontSize: sizeText.md,
            width: "100%",
            borderWidth: 0.5,
            borderColor: "#000",
            borderRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
          placeholder="Votre numero "
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={9}
          returnKeyType="done"
        />
        {/* hint */}
        <Text
          style={{
            fontFamily: "Lato_400Regular",
            fontSize: sizeText.xs,
            color: "dimgray",
            marginVertical: 5,
          }}
        >
          Entrez votre nom d'utilisateur et votre numéro pour commencer à
          utiliser Fideli! Le numero doit pas contenire 0 ou +234 au debut.
        </Text>

        {error && (
          <Text
            style={{
              fontFamily: "Lato_400Regular",
              fontSize: sizeText.xs,
              color: theme.error,
            }}
          >
            {error}
          </Text>
        )}

        {success && (
          <Text
            style={{
              fontFamily: "Lato_400Regular",
              fontSize: sizeText.xs,
              color: theme.success,
            }}
          >
            {success}
          </Text>
        )}

        <ButtonComponent
          title={loading ? "en cours..." : "Commencer"}
          variant="default"
          disabled={
            isEmptyString(myUsername) || isEmptyString(phone) || loading
          }
          onPress={handleChange}
        />

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
          Fideli inc 2024
        </Text>

        <StatusBar style="dark" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 20,
  },
});
