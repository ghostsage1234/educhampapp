import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';

const YEARS = ['2021', '2022', '2023', '2024', '2025'];

export default function BeceYearScreen() {
  const router = useRouter();
  const { className, subject, subjectColor } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.emoji}>📅</Text>
        <Text style={styles.title}>{subject}</Text>
        <Text style={styles.subtitle}>Select BECE Year</Text>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {YEARS.map((year) => (
            <View key={year} style={styles.yearSection}>
              <Text style={[styles.yearTitle, { color: subjectColor as string || '#ffd700' }]}>📋 BECE {year}</Text>
              <TouchableOpacity
                style={styles.typeBtn}
                onPress={() => router.push({ pathname: '/nameentry', params: { level: 'JHS', className, subject, examType: `BECE ${year} Objectives`, isBece: 'true' } })}
                activeOpacity={0.8}
              >
                <Text style={styles.typeEmoji}>✅</Text>
                <View>
                  <Text style={styles.typeTitle}>Objectives</Text>
                  <Text style={styles.typeSub}>40 questions • Timed • Auto-marked</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, styles.essayBtn]}
                onPress={() => router.push({ pathname: '/beceessay', params: { className, subject, year, subjectColor } })}
                activeOpacity={0.8}
              >
                <Text style={styles.typeEmoji}>📝</Text>
                <View>
                  <Text style={styles.typeTitle}>Essay Questions</Text>
                  <Text style={styles.typeSub}>Answer in your book • No timer</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  subtitle: { fontSize: 15, color: '#c4b5fd', marginBottom: 24 },
  yearSection: { width: '100%', marginBottom: 20 },
  yearTitle: { fontSize: 18, fontWeight: '800', marginBottom: 10 },
  typeBtn: { backgroundColor: 'rgba(124,58,237,0.15)', borderRadius: 14, padding: 16, flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: 'rgba(124,58,237,0.4)', gap: 12 },
  essayBtn: { backgroundColor: 'rgba(255,215,0,0.1)', borderColor: 'rgba(255,215,0,0.4)' },
  typeEmoji: { fontSize: 28 },
  typeTitle: { fontSize: 16, fontWeight: '700', color: '#fff', marginBottom: 2 },
  typeSub: { fontSize: 12, color: '#a78bfa' },
  back: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
  backText: { color: '#a78bfa', fontSize: 16 },
});
