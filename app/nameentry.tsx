import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

export default function NameEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [name, setName] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: true }).start();
  }, []);

  const startQuiz = () => {
    if (!name.trim()) return;
    router.push({
      pathname: '/quiz',
      params: { ...params, playerName: name.trim() }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.emoji}>✏️</Text>
        <Text style={styles.title}>Enter Your Name</Text>
        <Text style={styles.subtitle}>{params.className} • {params.subject}</Text>
        <Text style={styles.examLabel}>{params.examType}</Text>

        <TextInput
          style={styles.input}
          placeholder="Your name here..."
          placeholderTextColor="#6b7280"
          value={name}
          onChangeText={setName}
          maxLength={30}
          autoFocus
        />

        <TouchableOpacity
          style={[styles.btn, !name.trim() && styles.btnDisabled]}
          onPress={startQuiz}
          activeOpacity={0.8}
          disabled={!name.trim()}
        >
          <Text style={styles.btnText}>🚀 Start Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0820', justifyContent: 'center', alignItems: 'center' },
  content: { width: '100%', paddingHorizontal: 24, alignItems: 'center' },
  emoji: { fontSize: 64, marginBottom: 16 },
  title: { fontSize: 30, fontWeight: '900', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 15, color: '#c4b5fd', marginBottom: 4 },
  examLabel: { fontSize: 13, color: '#7c3aed', marginBottom: 32, fontWeight: '700' },
  input: { width: '100%', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14, padding: 18, fontSize: 18, color: '#fff', borderWidth: 1, borderColor: '#7c3aed', marginBottom: 24, textAlign: 'center' },
  btn: { width: '100%', backgroundColor: '#7c3aed', borderRadius: 14, paddingVertical: 18, alignItems: 'center', marginBottom: 16 },
  btnDisabled: { backgroundColor: '#3d2066', opacity: 0.5 },
  btnText: { color: '#fff', fontSize: 20, fontWeight: '800' },
  back: { marginTop: 8 },
  backText: { color: '#a78bfa', fontSize: 16 },
});
