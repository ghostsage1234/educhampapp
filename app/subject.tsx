import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';

const SUBJECTS: Record<string, { name: string; color: string; emoji: string }[]> = {
  Primary1: [
    { name: 'Mathematics', color: '#f59e0b', emoji: '🔢' },
    { name: 'English Language', color: '#3b82f6', emoji: '📝' },
    { name: 'Science', color: '#10b981', emoji: '🔬' },
    { name: 'OWOP', color: '#8b5cf6', emoji: '🌍' },
    { name: 'RME', color: '#ec4899', emoji: '🙏' },
    { name: 'Creative Arts', color: '#f97316', emoji: '🎨' },
    { name: 'Ghanaian Language', color: '#14b8a6', emoji: '🗣️' },
    { name: 'PE', color: '#06b6d4', emoji: '⚽' },
    { name: 'History', color: '#a16207', emoji: '📜' },
    { name: 'Computing', color: '#6366f1', emoji: '💻' },
  ],
  Primary4: [
    { name: 'Mathematics', color: '#f59e0b', emoji: '🔢' },
    { name: 'English Language', color: '#3b82f6', emoji: '📝' },
    { name: 'Science', color: '#10b981', emoji: '🔬' },
    { name: 'OWOP', color: '#8b5cf6', emoji: '🌍' },
    { name: 'RME', color: '#ec4899', emoji: '🙏' },
    { name: 'Creative Arts', color: '#f97316', emoji: '🎨' },
    { name: 'Ghanaian Language', color: '#14b8a6', emoji: '🗣️' },
    { name: 'PE', color: '#06b6d4', emoji: '⚽' },
    { name: 'History', color: '#a16207', emoji: '📜' },
    { name: 'Computing', color: '#6366f1', emoji: '💻' },
    { name: 'French', color: '#ef4444', emoji: '🇫🇷' },
  ],
  JHS: [
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
  ],
};

export default function SubjectScreen() {
  const router = useRouter();
  const { level, className } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const getSubjects = () => {
    if (level === 'JHS') return SUBJECTS.JHS;
    const num = parseInt((className as string).replace('Primary ', ''));
    return num >= 4 ? SUBJECTS.Primary4 : SUBJECTS.Primary1;
  };

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>{className}</Text>
        <Text style={styles.subtitle}>Choose a subject</Text>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {getSubjects().map((sub) => (
            <TouchableOpacity
              key={sub.name}
              style={[styles.card, { borderColor: sub.color }]}
              onPress={() => router.push({ pathname: '/examtype', params: { level, className, subject: sub.name } })}
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
  title: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#c4b5fd', marginBottom: 24 },
  card: { width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 12, borderWidth: 1 },
  cardEmoji: { fontSize: 26, marginRight: 14 },
  cardTitle: { fontSize: 17, fontWeight: '700', flex: 1 },
  arrow: { fontSize: 26, color: '#7c3aed' },
  back: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
  backText: { color: '#a78bfa', fontSize: 16 },
});
