import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';

const getrank = (pct: number) => {
  if (pct === 100) return { label: 'Champion 🏆', color: '#ffd700' };
  if (pct >= 80) return { label: 'Excellent ⭐', color: '#22c55e' };
  if (pct >= 60) return { label: 'Great 📈', color: '#3b82f6' };
  if (pct >= 40) return { label: 'Learner 📚', color: '#f59e0b' };
  return { label: 'Keep Going 💪', color: '#ef4444' };
};

export default function ResultsScreen() {
  const router = useRouter();
  const { playerName, className, subject, examType, score, total, percentage } = useLocalSearchParams();
  const pct = Number(percentage);
  const rank = getrank(pct);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, { toValue: 1, tension: 50, friction: 7, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={[styles.scoreCard, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.rankLabel}>{rank.label}</Text>
          <Text style={[styles.percentage, { color: rank.color }]}>{pct}%</Text>
          <Text style={styles.scoreText}>{score} / {total} correct</Text>
        </Animated.View>

        <Text style={styles.playerName}>🎓 {playerName}</Text>
        <Text style={styles.detail}>{className} • {subject}</Text>
        <Text style={styles.detail}>{examType}</Text>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Text style={styles.retryText}>🔄 Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => router.push('/home')}
            activeOpacity={0.8}
          >
            <Text style={styles.homeText}>🏠 Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.lbBtn}
            onPress={() => router.push('/leaderboard')}
            activeOpacity={0.8}
          >
            <Text style={styles.lbText}>🏅 Leaderboard</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0820', justifyContent: 'center', alignItems: 'center' },
  content: { width: '100%', paddingHorizontal: 24, alignItems: 'center' },
  scoreCard: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 24, padding: 32, alignItems: 'center', width: '100%', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(124,58,237,0.4)' },
  rankLabel: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 12 },
  percentage: { fontSize: 72, fontWeight: '900', marginBottom: 8 },
  scoreText: { fontSize: 18, color: '#c4b5fd' },
  playerName: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 4 },
  detail: { fontSize: 14, color: '#a78bfa', marginBottom: 2 },
  buttons: { width: '100%', marginTop: 32, gap: 12 },
  retryBtn: { backgroundColor: '#7c3aed', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  retryText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  homeBtn: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  homeText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  lbBtn: { backgroundColor: 'rgba(255,215,0,0.1)', borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,215,0,0.3)' },
  lbText: { color: '#ffd700', fontSize: 18, fontWeight: '700' },
});
