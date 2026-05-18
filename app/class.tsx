import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef } from 'react';

export default function ClassScreen() {
  const router = useRouter();
  const { level } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const primaryClasses = ['Primary 1','Primary 2','Primary 3','Primary 4','Primary 5','Primary 6'];
  const jhsClasses = ['JHS 1','JHS 2','JHS 3'];
  const classes = level === 'JHS' ? jhsClasses : primaryClasses;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.emoji}>🏫</Text>
        <Text style={styles.title}>{level} Classes</Text>
        <Text style={styles.subtitle}>Select your class</Text>
        <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
          {classes.map((cls) => (
            <TouchableOpacity
              key={cls}
              style={styles.card}
              onPress={() => {
                router.push({ pathname: '/subject', params: { level, className: cls } });
              }}
              activeOpacity={0.8}
            >
              <Text style={styles.cardEmoji}>📖</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{cls}</Text>

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
  emoji: { fontSize: 56, marginBottom: 12 },
  title: { fontSize: 28, fontWeight: '900', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 15, color: '#c4b5fd', marginBottom: 28 },
  card: { width: '100%', backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', marginBottom: 14, borderWidth: 1, borderColor: 'rgba(124,58,237,0.4)' },
  beceCard: { borderColor: '#ffd700', backgroundColor: 'rgba(255,215,0,0.08)' },
  cardEmoji: { fontSize: 28, marginRight: 16 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#fff' },
  beceLabel: { fontSize: 12, color: '#ffd700', fontWeight: '700', marginTop: 2 },
  arrow: { fontSize: 28, color: '#7c3aed' },
  back: { alignItems: 'center', marginTop: 10, marginBottom: 30 },
  backText: { color: '#a78bfa', fontSize: 16 },
});
