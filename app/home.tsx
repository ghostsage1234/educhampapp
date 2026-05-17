import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, ScrollView } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');
const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i, x: Math.random() * width, y: Math.random() * height,
  size: Math.random() * 3 + 1, duration: Math.random() * 2000 + 1500,
}));

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const starAnims = useRef(STARS.map(() => new Animated.Value(0.2))).current;

  useEffect(() => {
    STARS.forEach((star, i) => {
      Animated.loop(Animated.sequence([
        Animated.timing(starAnims[i], { toValue: 1, duration: star.duration, useNativeDriver: true }),
        Animated.timing(starAnims[i], { toValue: 0.2, duration: star.duration, useNativeDriver: true }),
      ])).start();
    });
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      {STARS.map((star, i) => (
        <Animated.View key={star.id} style={[styles.star, {
          left: star.x, top: star.y,
          width: star.size, height: star.size,
          opacity: starAnims[i],
        }]} />
      ))}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.title}>EduChamp GH</Text>
        <Text style={styles.subtitle}>Ghana Education Quiz Champion</Text>
        <View style={styles.flagRow}>
          <Text style={styles.flag}>🔴</Text>
          <Text style={styles.flag}>🟡</Text>
          <Text style={styles.flag}>🟢</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.playBtn}
            onPress={() => router.push('/level')}
            activeOpacity={0.8}
          >
            <Text style={styles.playBtnText}>🎮 Play Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.lbBtn}
            onPress={() => router.push('/leaderboard')}
            activeOpacity={0.8}
          >
            <Text style={styles.lbBtnText}>🏅 Leaderboard</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📚 What's Inside?</Text>
          <Text style={styles.infoText}>✅ Primary 1 - 6 Questions</Text>
          <Text style={styles.infoText}>✅ JHS 1 - 3 Questions</Text>
          <Text style={styles.infoText}>✅ All GES Subjects</Text>
          <Text style={styles.infoText}>✅ Term & Mid-Term Exams</Text>
          <Text style={styles.infoText}>✅ Works 100% Offline</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0820', alignItems: 'center', justifyContent: 'center' },
  star: { position: 'absolute', backgroundColor: '#fff', borderRadius: 50 },
  content: { alignItems: 'center', zIndex: 10, paddingHorizontal: 24, width: '100%' },
  trophy: { fontSize: 72, marginBottom: 12 },
  title: { fontSize: 34, fontWeight: '900', color: '#fff', textShadowColor: '#a78bfa', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20, marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#c4b5fd', marginBottom: 12 },
  flagRow: { flexDirection: 'row', gap: 8, marginBottom: 32 },
  flag: { fontSize: 16 },
  buttons: { width: '100%', gap: 12, marginBottom: 24 },
  playBtn: { backgroundColor: '#7c3aed', borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  playBtnText: { color: '#fff', fontSize: 20, fontWeight: '900' },
  lbBtn: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 16, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  lbBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  infoCard: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 16, width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' },
  infoTitle: { color: '#fff', fontWeight: '800', fontSize: 16, marginBottom: 8 },
  infoText: { color: '#c4b5fd', fontSize: 14, marginBottom: 4 },
});
