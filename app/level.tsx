import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function LevelScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.emoji}>🎓</Text>
        <Text style={styles.title}>Choose Level</Text>
        <Text style={styles.subtitle}>Which level are you in?</Text>

        <TouchableOpacity
          style={[styles.card, { borderColor: '#7c3aed' }]}
          onPress={() => router.push({ pathname: '/class', params: { level: 'Primary' } })}
          activeOpacity={0.8}
        >
          <Text style={styles.cardEmoji}>📚</Text>
          <Text style={styles.cardTitle}>Primary</Text>
          <Text style={styles.cardSub}>Primary 1 - 6</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { borderColor: '#4f46e5' }]}
          onPress={() => router.push({ pathname: '/class', params: { level: 'JHS' } })}
          activeOpacity={0.8}
        >
          <Text style={styles.cardEmoji}>🏫</Text>
          <Text style={styles.cardTitle}>JHS</Text>
          <Text style={styles.cardSub}>JHS 1 - 3</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0820', justifyContent: 'center', alignItems: 'center' },
  content: { width: '100%', paddingHorizontal: 24, alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 32, fontWeight: '900', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#c4b5fd', marginBottom: 40 },
  card: { width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: 28, alignItems: 'center', marginBottom: 20, borderWidth: 1 },
  cardEmoji: { fontSize: 48, marginBottom: 12 },
  cardTitle: { fontSize: 26, fontWeight: '800', color: '#fff', marginBottom: 4 },
  cardSub: { fontSize: 15, color: '#a78bfa' },
  back: { marginTop: 20 },
  backText: { color: '#a78bfa', fontSize: 16 },
});
