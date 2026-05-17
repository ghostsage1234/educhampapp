import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { getEssayQuestions } from '../src/questionLoader';

export default function BeceEssayScreen() {
  const router = useRouter();
  const { subject, year, subjectColor } = useLocalSearchParams();
  const essays = getEssayQuestions(subject as string, year as string);
  const color = (subjectColor as string) || '#ffd700';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{subject}</Text>
        <Text style={styles.headerYear}>BECE {year}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleBox}>
          <Text style={styles.titleEmoji}>📝</Text>
          <Text style={styles.title}>Essay Questions</Text>
          <Text style={styles.subtitle}>BECE {year} • Answer in your book</Text>
          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>📖 Read each question carefully and write your answers in your exercise book. There is no timer for this section.</Text>
          </View>
        </View>

        {essays && essays.length > 0 ? (
          essays.map((section: any, sIdx: number) => (
            <View key={sIdx} style={styles.sectionBox}>
              <Text style={[styles.sectionTitle, { color }]}>{section.section}</Text>
              {section.instruction && (
                <Text style={styles.instruction}>{section.instruction}</Text>
              )}
              {section.questions.map((q: any, qIdx: number) => (
                <View key={qIdx} style={styles.questionBox}>
                  <Text style={styles.questionNum}>Question {q.number} {q.marks && `[${q.marks} marks]`}</Text>
                  <Text style={styles.questionText}>{q.question}</Text>
                  {q.parts && q.parts.map((part: any, pIdx: number) => (
                    <View key={pIdx} style={styles.partBox}>
                      <Text style={styles.partText}>({part.label}) {part.text} {part.marks && <Text style={styles.marks}>[{part.marks} marks]</Text>}</Text>
                      {part.subparts && part.subparts.map((sub: any, sIdx: number) => (
                        <Text key={sIdx} style={styles.subpartText}>{sub.label}. {sub.text} {sub.marks && <Text style={styles.marks}>[{sub.marks} marks]</Text>}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ))
        ) : (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyText}>Essay questions for {subject} {year} coming soon!</Text>
          </View>
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
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '800', flex: 1, textAlign: 'center' },
  headerYear: { color: '#ffd700', fontSize: 14, fontWeight: '700' },
  content: { padding: 20 },
  titleBox: { alignItems: 'center', marginBottom: 24 },
  titleEmoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#ffd700', marginBottom: 12 },
  noticeBox: { backgroundColor: 'rgba(255,215,0,0.1)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(255,215,0,0.3)' },
  noticeText: { color: '#ffd700', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  sectionBox: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 8 },
  instruction: { color: '#c4b5fd', fontSize: 13, marginBottom: 12, fontStyle: 'italic' },
  questionBox: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  questionNum: { color: '#7c3aed', fontSize: 14, fontWeight: '800', marginBottom: 8 },
  questionText: { color: '#fff', fontSize: 15, lineHeight: 24, marginBottom: 8 },
  partBox: { marginLeft: 12, marginBottom: 8 },
  partText: { color: '#e2e8f0', fontSize: 14, lineHeight: 22 },
  marks: { color: '#a78bfa', fontSize: 13 },
  subpartText: { color: '#cbd5e1', fontSize: 13, lineHeight: 20, marginLeft: 16, marginTop: 4 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyText: { color: '#a78bfa', fontSize: 16, textAlign: 'center' },
});
