import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { getBeceQuestions } from '../src/questionLoader';

export default function BeceViewScreen() {
  const router = useRouter();
  const { subject, year, subjectColor } = useLocalSearchParams();
  const color = (subjectColor as string) || '#ffd700';
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [showAll, setShowAll] = useState(false);

  const questions = getBeceQuestions(subject as string, year as string);

  const toggleAnswer = (idx: number) => {
    setRevealedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleAll = () => {
    if (showAll) {
      setRevealedAnswers({});
      setShowAll(false);
    } else {
      const all: Record<number, boolean> = {};
      questions?.forEach((_: any, i: number) => { all[i] = true; });
      setRevealedAnswers(all);
      setShowAll(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{subject}</Text>
          <Text style={[styles.headerYear, { color }]}>BECE {year}</Text>
        </View>
        <TouchableOpacity onPress={toggleAll} style={[styles.toggleBtn, { borderColor: color }]}>
          <Text style={[styles.toggleText, { color }]}>{showAll ? 'Hide All' : 'Show All'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>📖 Tap each question to reveal the answer. Study at your own pace — no timer!</Text>
        </View>

        {!questions || questions.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>Coming Soon!</Text>
            <Text style={styles.emptyText}>{subject} BECE {year} questions will be added soon.</Text>
          </View>
        ) : (
          questions.map((q: any, idx: number) => (
            <View key={idx} style={styles.questionCard}>
              <View style={styles.questionHeader}>
                <View style={[styles.numBadge, { backgroundColor: color + '33', borderColor: color }]}>
                  <Text style={[styles.numText, { color }]}>{idx + 1}</Text>
                </View>
                <Text style={styles.questionText}>{q.q}</Text>
              </View>

              {q.o && (
                <View style={styles.optionsBox}>
                  {q.o.map((opt: string, oIdx: number) => (
                    <View key={oIdx} style={[
                      styles.option,
                      revealedAnswers[idx] && opt === q.a && styles.correctOption
                    ]}>
                      <Text style={[
                        styles.optionText,
                        revealedAnswers[idx] && opt === q.a && styles.correctText
                      ]}>
                        {String.fromCharCode(65 + oIdx)}. {opt}
                        {revealedAnswers[idx] && opt === q.a && ' ✓'}
                      </Text>
                    </View>
                  ))}
                </View>
              )}

              <TouchableOpacity
                style={[styles.answerBtn, { borderColor: color }]}
                onPress={() => toggleAnswer(idx)}
                activeOpacity={0.8}
              >
                <Text style={[styles.answerBtnText, { color }]}>
                  {revealedAnswers[idx] ? '🙈 Hide Answer' : '💡 Show Answer'}
                </Text>
              </TouchableOpacity>

              {revealedAnswers[idx] && (
                <View style={[styles.answerBox, { borderColor: color + '66' }]}>
                  <Text style={[styles.answerLabel, { color }]}>✅ Answer: {q.a}</Text>
                  {q.e && <Text style={styles.explanation}>💡 {q.e}</Text>}
                </View>
              )}
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
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  back: { color: '#a78bfa', fontSize: 16 },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 15, fontWeight: '800' },
  headerYear: { fontSize: 13, fontWeight: '700' },
  toggleBtn: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  toggleText: { fontSize: 12, fontWeight: '700' },
  content: { padding: 16 },
  infoBox: { backgroundColor: 'rgba(255,215,0,0.08)', borderRadius: 12, padding: 12, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255,215,0,0.2)' },
  infoText: { color: '#ffd700', fontSize: 13, textAlign: 'center', lineHeight: 20 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 64, marginBottom: 16 },
  emptyTitle: { fontSize: 22, fontWeight: '800', color: '#fff', marginBottom: 8 },
  emptyText: { color: '#a78bfa', fontSize: 15, textAlign: 'center' },
  questionCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  questionHeader: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  numBadge: { width: 32, height: 32, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  numText: { fontSize: 14, fontWeight: '900' },
  questionText: { flex: 1, color: '#fff', fontSize: 15, lineHeight: 24, fontWeight: '600' },
  optionsBox: { marginBottom: 12, gap: 6 },
  option: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  correctOption: { backgroundColor: 'rgba(16,185,129,0.15)', borderColor: '#10b981' },
  optionText: { color: '#c4b5fd', fontSize: 14 },
  correctText: { color: '#10b981', fontWeight: '700' },
  answerBtn: { borderWidth: 1, borderRadius: 10, padding: 10, alignItems: 'center', marginBottom: 8 },
  answerBtnText: { fontSize: 14, fontWeight: '700' },
  answerBox: { backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: 10, padding: 12, borderWidth: 1 },
  answerLabel: { fontSize: 15, fontWeight: '800', marginBottom: 6 },
  explanation: { color: '#c4b5fd', fontSize: 13, lineHeight: 20 },
});
