import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getQuestions, shuffleQuestions } from '../src/questionLoader';
import { playCorrect, playWrong, playWin } from '../src/sounds';
import { playCorrect, playWrong, playWin } from '../src/sounds';

export default function QuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { level, className, subject, examType, playerName } = params;

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');
  const timerRef = useRef<any>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const isAdvanced = level === 'JHS' || ['Primary 4','Primary 5','Primary 6'].includes(className as string);
  const timeLimit = isAdvanced ? 45 : 30;

  useEffect(() => {
    const cn = className as string;
    const sub = subject as string;
    const exam = examType as string;
    const raw = getQuestions(cn, sub, exam);
    const info = `class:"${cn}" sub:"${sub}" exam:"${exam}" found:${raw ? raw.length : 0}`;
    setDebugInfo(info);
    if (raw && raw.length > 0) {
      setQuestions(shuffleQuestions(raw));
    } else {
      setQuestions([
        { q: `No questions found!\n${info}`, o: ["OK", "Back", "Try again", "Exit"], a: "OK", e: "Check selection." }
      ]);
    }
    setLoading(false);
  }, []);

  const goToResults = useCallback(async (finalScore: number, qs: any[]) => {
    clearInterval(timerRef.current);
    const pct = Math.round((finalScore / qs.length) * 100);
    try {
      const existing = await AsyncStorage.getItem('leaderboard');
      const board = existing ? JSON.parse(existing) : [];
      board.push({ name: playerName, class: className, subject, score: pct, date: new Date().toLocaleDateString(), examType });
      board.sort((a: any, b: any) => b.score - a.score);
      await AsyncStorage.setItem('leaderboard', JSON.stringify(board.slice(0, 50)));
    } catch (e) {}
    router.replace({ pathname: '/results', params: { ...params, score: finalScore, total: qs.length, percentage: pct } });
  }, [params]);

  useEffect(() => {
    if (loading || questions.length === 0) return;
    setTimeLeft(timeLimit);
    setSelected(null);
    setAnswered(false);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    Animated.timing(progressAnim, { toValue: (current + 1) / questions.length, duration: 400, useNativeDriver: false }).start();
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAnswer('__timeout__');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [current, loading, questions]);

  const handleAnswer = (option: string) => {
    if (answered) return;
    clearInterval(timerRef.current);
    setSelected(option);
    setAnswered(true);
    const q = questions[current];
    const correct = option === q.a;
    const newScore = correct ? score + 1 : score;
    const newStreak = correct ? streak + 1 : 0;
    setScore(newScore);
    setStreak(newStreak);
    if (correct) { playCorrect(); } else { playWrong(); }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 200, fontSize: 18 }}>Loading questions...</Text>
      </View>
    );
  }

  const q = questions[current];
  const timerColor = timeLeft > 10 ? '#7c3aed' : timeLeft > 5 ? '#f59e0b' : '#ef4444';

  const getOptionStyle = (opt: string) => {
    if (!answered) return styles.option;
    if (opt === q.a) return [styles.option, styles.correct];
    if (opt === selected && opt !== q.a) return [styles.option, styles.wrong];
    return [styles.option, styles.dimmed];
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.questionNum}>{current + 1}/{questions.length}</Text>
        {streak >= 3 && <Text style={styles.streak}>🔥 {streak}</Text>}
        <Text style={[styles.timer, { color: timerColor }]}>{timeLeft}s</Text>
      </View>
      <View style={styles.progressBar}>
        <Animated.View style={[styles.progressFill, { width: progressAnim.interpolate({ inputRange: [0,1], outputRange: ['0%','100%'] }) }]} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.subject}>{subject} • {examType}</Text>
          <Text style={styles.question}>{q.q}</Text>
          {q.o.map((opt: string, idx: number) => (
            <TouchableOpacity key={idx} style={getOptionStyle(opt)} onPress={() => handleAnswer(opt)} disabled={answered} activeOpacity={0.8}>
              <Text style={styles.optionText}>{opt}</Text>
              {answered && opt === q.a && <Text style={styles.tick}>✓</Text>}
              {answered && opt === selected && opt !== q.a && <Text style={styles.cross}>✗</Text>}
            </TouchableOpacity>
          ))}
          {answered && <View style={styles.expBox}><Text style={styles.expText}>💡 {q.e}</Text></View>}
          {answered && (
            <TouchableOpacity
              style={styles.nextBtn}
              onPress={() => {
                if (current + 1 >= questions.length) {
                  playWin();
                  goToResults(score, questions);
                } else {
                  setCurrent(current + 1);
                }
              }}
            >
              <Text style={styles.nextText}>
                {current + 1 >= questions.length ? '🏁 Finish Quiz' : 'Next Question →'}
              </Text>
            </TouchableOpacity>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0820' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50, paddingBottom: 10 },
  questionNum: { color: '#a78bfa', fontSize: 16, fontWeight: '700' },
  streak: { fontSize: 20 },
  timer: { fontSize: 22, fontWeight: '900' },
  progressBar: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 20, borderRadius: 3 },
  progressFill: { height: 6, backgroundColor: '#7c3aed', borderRadius: 3 },
  content: { padding: 20 },
  subject: { color: '#7c3aed', fontSize: 12, fontWeight: '700', marginBottom: 12, textAlign: 'center' },
  question: { fontSize: 20, color: '#fff', fontWeight: '700', marginBottom: 24, lineHeight: 30, textAlign: 'center' },
  option: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  correct: { backgroundColor: 'rgba(16,185,129,0.2)', borderColor: '#10b981' },
  wrong: { backgroundColor: 'rgba(239,68,68,0.2)', borderColor: '#ef4444' },
  dimmed: { opacity: 0.4 },
  optionText: { color: '#fff', fontSize: 16, fontWeight: '600', flex: 1 },
  tick: { color: '#10b981', fontSize: 18, fontWeight: '900' },
  cross: { color: '#ef4444', fontSize: 18, fontWeight: '900' },
  expBox: { backgroundColor: 'rgba(124,58,237,0.2)', borderRadius: 12, padding: 14, marginTop: 8, borderWidth: 1, borderColor: '#7c3aed' },
  expText: { color: '#c4b5fd', fontSize: 14, lineHeight: 22 },
  nextBtn: { backgroundColor: '#7c3aed', borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  nextText: { color: '#fff', fontSize: 18, fontWeight: '800' },
});
