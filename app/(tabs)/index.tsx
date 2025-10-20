import { Colors } from '@/constants/theme'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomePage = () => {
  const router = useRouter()
  const scheme = useColorScheme() ?? 'light'
  const themeColors = scheme === 'dark' ? Colors.dark : Colors.light
  return (
    <SafeAreaView>
        <Text style={{ color: '#FFFFFF' }}>This is a home page</Text>
        <TouchableOpacity
          style={[styles.button, { borderColor: themeColors.tint, borderWidth: 1 }]}
          onPress={() => router.replace('/login')}
          activeOpacity={0.85}
        >
          <Text style={{ color: themeColors.tint, fontWeight: '700' }}>Go to Login</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
button: {
  padding: 10,
  borderRadius: 5,
  margin: 10,
}
});

export default HomePage;