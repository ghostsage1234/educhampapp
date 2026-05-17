import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';

const YEARS = ['2021', '2022', '2023', '2024', '2025'];

export default function BeceYearScreen() {
  const router = useRouter();
  const { subject, subjectColor } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.emoji}>📚</Text>
        <Text style={styles.title}>{subject}</Text>
        <Text style={styles.subtitle}>BECE Past Questions</Text>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {YEARS.map((year) => (
            <TouchableOpacity
              key={year}
              style={[styles.card, { borderColor: subjectColor as string || '#ffd700' }]}
              onPress={() => router.push({ pathname: '/beceview', params: { subject, year, subjectColor } })}
              activeOpacity={0.8}
            >
              <Text style={styles.cardEmoji}>📋</Text>
              <View style={styles.cardInfo}>
                <Text style={[styles.cardTitle, { color: subjectColor as string || '#ffd700' }]}>BECE {year}</Text>
                <Text style={styles.cardSub}>Questions & Answers</Text>
              </View>
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
  title: { fontSize: 24, fontWeight: '900', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#ffd700', marginBottom: 24 },
  card: { width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 14, borderWidth: 1 },
  cardEmoji: { fontSize: 32, marginRight: 14 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 20, fontWeight: '800', marginBottom: 2 },
  cardSub: { fontSize: 13, color: '#a78bfa' },
  arrow: { fontSize: 28, color: '#7c3aed' },
  back: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
  backText: { color: '#a78bfa', fontSize: 16 },
});
