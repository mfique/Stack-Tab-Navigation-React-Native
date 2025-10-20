import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.subtitle}>Welcome! You are logged in.</Text>

      <View style={styles.content}>
        <Text style={styles.card}>This is your dashboard content.</Text>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace("/login")}>
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 6,
  },
  content: {
    marginTop: 20,
  },
  card: {
    borderWidth: 1,
    borderColor: "#E6E8EB",
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
  },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "#111111",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});


