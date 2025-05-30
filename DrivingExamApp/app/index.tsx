import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import styles from "../utils/global.styles";

export default function Index() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Ionicons name="school-outline" size={64} color="#4e73df" style={styles.icon} />

            <Text style={styles.title}>Willkommen zur Prüfungstrainer-App!</Text>
            <Text style={styles.subtitle}>
                Bereite dich effektiv auf deine Führerscheinprüfung vor.
            </Text>

            <Pressable onPress={() => router.push("./(modules)")} style={styles.button}>
                <Text style={styles.buttonText}>Jetzt starten</Text>
            </Pressable>
        </View>
    );
}
