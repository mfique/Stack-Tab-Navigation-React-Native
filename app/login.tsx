import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://10.12.75.73:3000"; // Using your computer's IP address

export default function LoginScreen() {
  const router = useRouter();
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const isDisabled = username.trim().length === 0 || password.trim().length === 0;
  const isSignupDisabled = isDisabled || (isSignup && email.trim().length === 0);

  const handleSignup = async () => {
    if (isSignupDisabled || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.error || 'Failed to create account');
        setLoading(false);
        return;
      }

      Alert.alert('Success', 'Account created successfully! Please login.', [
        { text: 'OK', onPress: () => {
          setIsSignup(false);
          setEmail('');
          setPassword('');
          setLoading(false);
        }}
      ]);
    } catch {
      Alert.alert('Error', 'Could not connect to server. Make sure the backend is running.');
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (isDisabled || loading) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Error', data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      Alert.alert('Success', 'Login successful!');
      setLoading(false);
      router.replace("/dashboard");
    } catch {
      Alert.alert('Error', 'Could not connect to server. Make sure the backend is running.');
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setEmail('');
    setPassword('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{isSignup ? 'Sign Up' : 'Login'}</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          returnKeyType="next"
          editable={!loading}
        />
        {isSignup && (
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            returnKeyType="next"
            editable={!loading}
          />
        )}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          returnKeyType="done"
          onSubmitEditing={isSignup ? handleSignup : handleLogin}
          editable={!loading}
        />
        <TouchableOpacity
          style={[styles.button, (isSignup ? isSignupDisabled : isDisabled) && styles.buttonDisabled]}
          onPress={isSignup ? handleSignup : handleLogin}
          activeOpacity={0.8}
          disabled={isSignup ? isSignupDisabled : isDisabled}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Sign in'}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleMode}
          activeOpacity={0.7}
          disabled={loading}
        >
          <Text style={styles.toggleText}>
            {isSignup 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 24,
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E6E8EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#F9FAFB",
  },
  button: {
    backgroundColor: "#111111",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
  toggleButton: {
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  toggleText: {
    color: "#111111",
    fontSize: 14,
    fontWeight: "500",
  },
});


