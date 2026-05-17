import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const medals = ['🥇', '🥈', '🥉'];

export default function LeaderboardScreen() {
  const router = useRouter();
  const [board, setBoard] = useState<any[]>([]);

  useEffect(() => {
    loadBoard();
  }, []);

  const loadBoard = async () => {
    try {
      const data = await AsyncStorage.getItem('leaderboard');
      if (data) setBoard(JSON.parse(data));
    } catch (e) {}
  };

  const clearBoard = () => {
    Alert.alert('Clear Leaderboard', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear', style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('leaderboard');
          setBoard([]);
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🏅 Leaderboard</Text>
        <TouchableOpacity onPress={clearBoard}>
          <Text style={styles.clear}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {board.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🎯</Text>
            <Text style={styles.emptyText}>No scores yet!</Text>
            <Text style={styles.emptySubtext}>Play a quiz to appear here</Text>
          </View>
        ) : (
          board.map((item, index) => (
            <View key={index} style={[styles.row, index < 3 && styles.topRow]}>
              <Text style={styles.medal}>
                {index < 3 ? medals[index] : `${index + 1}.`}
              </Text>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.detail}>{item.class} • {item.subject}</Text>
                <Text style={styles.examType}>{item.examType}</Text>
              </View>
              <View style={styles.scoreBox}>
                <Text style={[styles.score, {
                  color: item.score >= 80 ? '#22c55e' : item.score >= 60 ? '#3b82f6' : item.score >= 40 ? '#f59e0b' : '#ef4444'
                }]}>{item.score}%</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          ))
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0820' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16 },
  back: { color: '#a78bfa', fontSize: 16 },
  title: { fontSize: 20, fontWeight: '900', color: '#fff' },
  clear: { color: '#ef4444', fontSize: 14 },
  empty: { alignItems: 'center', marginTop: 100 },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyText: { fontSize: 22, color: '#fff', fontWeight: '700', marginBottom: 8 },
  emptySubtext: { fontSize: 15, color: '#a78bfa' },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 16, marginBottom: 10, borderRadius: 14, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  topRow: { borderColor: 'rgba(124,58,237,0.4)', backgroundColor: 'rgba(124,58,237,0.1)' },
  medal: { fontSize: 24, marginRight: 12, width: 32 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '800', color: '#fff', marginBottom: 2 },
  detail: { fontSize: 12, color: '#a78bfa', marginBottom: 1 },
  examType: { fontSize: 11, color: '#6b7280' },
  scoreBox: { alignItems: 'flex-end' },
  score: { fontSize: 22, fontWeight: '900' },
  date: { fontSize: 11, color: '#6b7280', marginTop: 2 },
});
