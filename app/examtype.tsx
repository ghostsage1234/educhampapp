import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';

const EXAM_TYPES = [
  { name: '1st Term Exam', emoji: '📋', color: '#7c3aed' },
  { name: '2nd Term Exam', emoji: '📋', color: '#4f46e5' },
  { name: '3rd Term Exam', emoji: '📋', color: '#2563eb' },
  { name: '1st Term Mid-Term', emoji: '📝', color: '#0891b2' },
  { name: '2nd Term Mid-Term', emoji: '📝', color: '#0d9488' },
  { name: '3rd Term Mid-Term', emoji: '📝', color: '#059669' },
];

export default function ExamTypeScreen() {
  const router = useRouter();
  const { level, className, subject } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.emoji}>📚</Text>
        <Text style={styles.title}>Exam Type</Text>
        <Text style={styles.subtitle}>{subject}</Text>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {EXAM_TYPES.map((exam) => (
            <TouchableOpacity
              key={exam.name}
              style={[styles.card, { borderColor: exam.color }]}
              onPress={() => router.push({ pathname: '/nameentry', params: { level, className, subject, examType: exam.name } })}
              activeOpacity={0.8}
            >
              <Text style={styles.cardEmoji}>{exam.emoji}</Text>
              <Text style={[styles.cardTitle, { color: exam.color }]}>{exam.name}</Text>
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
  subtitle: { fontSize: 15, color: '#c4b5fd', marginBottom: 24 },
  card: { width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1 },
  cardEmoji: { fontSize: 26, marginRight: 14 },
  cardTitle: { fontSize: 17, fontWeight: '700', flex: 1 },
  arrow: { fontSize: 26, color: '#7c3aed' },
  back: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
  backText: { color: '#a78bfa', fontSize: 16 },
});
