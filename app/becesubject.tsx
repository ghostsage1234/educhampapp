import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';

const BECE_SUBJECTS = [
  { name: 'Mathematics', color: '#f59e0b', emoji: '🔢' },
  { name: 'English Language', color: '#3b82f6', emoji: '📝' },
  { name: 'Integrated Science', color: '#10b981', emoji: '🔬' },
  { name: 'Social Studies', color: '#8b5cf6', emoji: '🌍' },
  { name: 'RME', color: '#ec4899', emoji: '🙏' },
  { name: 'Career Technology', color: '#84cc16', emoji: '⚙️' },
  { name: 'Creative Arts and Design', color: '#f97316', emoji: '🎨' },
  { name: 'Computing', color: '#6366f1', emoji: '💻' },
  { name: 'Ghanaian Language', color: '#14b8a6', emoji: '🗣️' },
  { name: 'French', color: '#ef4444', emoji: '🇫🇷' },
];

export default function BeceSubjectScreen() {
  const router = useRouter();
  const { className } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.emoji}>🎓</Text>
        <Text style={styles.title}>BECE Prep</Text>
        <Text style={styles.subtitle}>JHS 3 • Select Subject</Text>
        <View style={styles.warningBox}>
          <Text style={styles.warningText}>⚠️ This section contains BECE past questions (2021-2025). Objectives are timed. Essay questions are for practice in your book.</Text>
        </View>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {BECE_SUBJECTS.map((sub) => (
            <TouchableOpacity
              key={sub.name}
              style={[styles.card, { borderColor: sub.color }]}
              onPress={() => router.push({ pathname: '/beceyear', params: { className, subject: sub.name, subjectColor: sub.color } })}
              activeOpacity={0.8}
            >
              <Text style={styles.cardEmoji}>{sub.emoji}</Text>
              <Text style={[styles.cardTitle, { color: sub.color }]}>{sub.name}</Text>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={() => router.back()} style={styles.back}>
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0820', alignItems: 'center', paddingTop: 60 },
  content: { width: '100%', paddingHorizontal: 24, alignItems: 'center', flex: 1 },
  emoji: { fontSize: 56, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#ffd700', marginBottom: 12 },
  warningBox: { backgroundColor: 'rgba(255,215,0,0.1)', borderRadius: 12, padding: 12, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,215,0,0.3)', width: '100%' },
  warningText: { color: '#ffd700', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  card: { width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1 },
  cardEmoji: { fontSize: 26, marginRight: 14 },
  cardTitle: { fontSize: 17, fontWeight: '700', flex: 1 },
  arrow: { fontSize: 26, color: '#7c3aed' },
  back: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
  backText: { color: '#a78bfa', fontSize: 16 },
});
