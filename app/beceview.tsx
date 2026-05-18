import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { getBeceQuestions } from '../src/questionLoader';

export default function BeceViewScreen() {
  const router = useRouter();
  const { subject, year, subjectColor, type } = useLocalSearchParams();
  const color = (subjectColor as string) || '#ffd700';
  const [revealedAnswers, setRevealedAnswers] = useState<{[key:string]: boolean}>({});
  const [showAll, setShowAll] = useState(false);

  const questions = getBeceQuestions(subject as string, year as string, type as string);
  const isObjectives = type === 'objectives';

  const toggleAnswer = (key: string) => {
    setRevealedAnswers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{subject}</Text>
        <Text style={[styles.headerYear, { color }]}>BECE {year}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleBox}>
          <Text style={styles.titleEmoji}>{isObjectives ? '✅' : '📝'}</Text>
          <Text style={styles.title}>{isObjectives ? 'Objectives' : 'Essay Questions'}</Text>
          <Text style={[styles.subtitle, { color }]}>BECE {year} • {subject}</Text>
          <View style={styles.noticeBox}>
            <Text style={styles.noticeText}>
              📖 Read each question carefully and tap Show Answer to reveal the correct answer.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.showAllBtn}
            onPress={() => setShowAll(!showAll)}
          >
            <Text style={styles.showAllText}>
              {showAll ? '🙈 Hide All Answers' : '👁️ Show All Answers'}
            </Text>
          </TouchableOpacity>
        </View>

        {!questions || questions.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyText}>Questions for {subject} {year} coming soon!</Text>
          </View>
        ) : isObjectives ? (
          questions.map((q: any, idx: number) => (
            <View key={idx} style={styles.questionBox}>
              <Text style={[styles.questionNum, { color }]}>Question {idx + 1}</Text>
              {q.image && (
                <View style={styles.imagePlaceholder}>
                  <Text style={styles.imageText}>📊 [Diagram - See textbook]</Text>
                </View>
              )}
              <Text style={styles.questionText}>{q.q}</Text>
              <View style={styles.optionsBox}>
                {q.o.map((opt: string, oIdx: number) => (
                  <View key={oIdx} style={[
                    styles.optionRow,
                    (showAll || revealedAnswers[`obj_${idx}`]) && opt === q.a && styles.correctOption
                  ]}>
                    <Text style={[
                      styles.optionLabel,
                      (showAll || revealedAnswers[`obj_${idx}`]) && opt === q.a && styles.correctText
                    ]}>
                      {String.fromCharCode(65 + oIdx)}.
                    </Text>
                    <Text style={[
                      styles.optionText,
                      (showAll || revealedAnswers[`obj_${idx}`]) && opt === q.a && styles.correctText
                    ]}>
                      {opt}
                    </Text>
                    {(showAll || revealedAnswers[`obj_${idx}`]) && opt === q.a && (
                      <Text style={styles.tick}>✓</Text>
                    )}
                  </View>
                ))}
              </View>
              {(showAll || revealedAnswers[`obj_${idx}`]) && q.e && (
                <View style={styles.expBox}>
                  <Text style={styles.expText}>💡 {q.e}</Text>
                </View>
              )}
              {!showAll && (
                <TouchableOpacity
                  style={[styles.revealBtn, revealedAnswers[`obj_${idx}`] && styles.hideBtn]}
                  onPress={() => toggleAnswer(`obj_${idx}`)}
                >
                  <Text style={styles.revealText}>
                    {revealedAnswers[`obj_${idx}`] ? '🙈 Hide Answer' : '👁️ Show Answer'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        ) : (
          questions.map((section: any, sIdx: number) => (
            <View key={sIdx} style={styles.sectionBox}>
              <Text style={[styles.sectionTitle, { color }]}>{section.section}</Text>
              {section.instruction && (
                <Text style={styles.instruction}>{section.instruction}</Text>
              )}
              {section.questions.map((q: any, qIdx: number) => (
                <View key={qIdx} style={styles.questionBox}>
                  <Text style={[styles.questionNum, { color }]}>
                    Question {q.number} {q.marks && `[${q.marks}]`}
                  </Text>
                  {q.image && (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imageText}>📊 [Diagram - See textbook]</Text>
                    </View>
                  )}
                  <Text style={styles.questionText}>{q.question}</Text>
                  {q.parts && q.parts.map((part: any, pIdx: number) => (
                    <View key={pIdx} style={styles.partBox}>
                      <Text style={styles.partText}>
                        ({part.label}) {part.text}
                        {part.marks && <Text style={styles.marks}> [{part.marks}]</Text>}
                      </Text>
                      {part.subparts && part.subparts.map((sub: any, ssIdx: number) => (
                        <Text key={ssIdx} style={styles.subpartText}>
                          {sub.label}. {sub.text}
                          {sub.marks && <Text style={styles.marks}> [{sub.marks}]</Text>}
                        </Text>
                      ))}
                    </View>
                  ))}
                  {q.answer && (
                    <>
                      {(showAll || revealedAnswers[`essay_${sIdx}_${qIdx}`]) && (
                        <View style={styles.answerBox}>
                          <Text style={styles.answerTitle}>📋 Model Answer:</Text>
                          <Text style={styles.answerText}>{q.answer}</Text>
                        </View>
                      )}
                      {!showAll && (
                        <TouchableOpacity
                          style={[styles.revealBtn, revealedAnswers[`essay_${sIdx}_${qIdx}`] && styles.hideBtn]}
                          onPress={() => toggleAnswer(`essay_${sIdx}_${qIdx}`)}
                        >
                          <Text style={styles.revealText}>
                            {revealedAnswers[`essay_${sIdx}_${qIdx}`] ? '🙈 Hide Answer' : '👁️ Show Model Answer'}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
                </View>
              ))}
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
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: '800', flex: 1, textAlign: 'center' },
  headerYear: { fontSize: 14, fontWeight: '700' },
  content: { padding: 20 },
  titleBox: { alignItems: 'center', marginBottom: 24 },
  titleEmoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 4 },
  subtitle: { fontSize: 14, marginBottom: 12 },
  noticeBox: { backgroundColor: 'rgba(255,215,0,0.1)', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: 'rgba(255,215,0,0.3)', marginBottom: 12, width: '100%' },
  noticeText: { color: '#ffd700', fontSize: 13, lineHeight: 20, textAlign: 'center' },
  showAllBtn: { backgroundColor: 'rgba(124,58,237,0.3)', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 20, borderWidth: 1, borderColor: '#7c3aed' },
  showAllText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  questionBox: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  questionNum: { fontSize: 13, fontWeight: '800', marginBottom: 8 },
  questionText: { color: '#fff', fontSize: 15, lineHeight: 24, marginBottom: 12 },
  imagePlaceholder: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: 16, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderStyle: 'dashed' },
  imageText: { color: '#a78bfa', fontSize: 13 },
  optionsBox: { marginBottom: 8 },
  optionRow: { flexDirection: 'row', alignItems: 'center', padding: 10, borderRadius: 8, marginBottom: 6, backgroundColor: 'rgba(255,255,255,0.03)' },
  correctOption: { backgroundColor: 'rgba(16,185,129,0.2)', borderWidth: 1, borderColor: '#10b981' },
  optionLabel: { color: '#a78bfa', fontSize: 14, fontWeight: '700', marginRight: 8, width: 20 },
  optionText: { color: '#e2e8f0', fontSize: 14, flex: 1 },
  correctText: { color: '#10b981', fontWeight: '700' },
  tick: { color: '#10b981', fontSize: 16, fontWeight: '900' },
  expBox: { backgroundColor: 'rgba(124,58,237,0.15)', borderRadius: 8, padding: 10, marginTop: 8, borderWidth: 1, borderColor: 'rgba(124,58,237,0.3)' },
  expText: { color: '#c4b5fd', fontSize: 13, lineHeight: 20 },
  answerBox: { backgroundColor: 'rgba(16,185,129,0.1)', borderRadius: 8, padding: 12, marginTop: 8, borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)' },
  answerTitle: { color: '#10b981', fontSize: 13, fontWeight: '800', marginBottom: 6 },
  answerText: { color: '#e2e8f0', fontSize: 14, lineHeight: 22 },
  revealBtn: { backgroundColor: 'rgba(124,58,237,0.3)', borderRadius: 10, paddingVertical: 10, alignItems: 'center', marginTop: 8, borderWidth: 1, borderColor: '#7c3aed' },
  hideBtn: { backgroundColor: 'rgba(239,68,68,0.2)', borderColor: '#ef4444' },
  revealText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  sectionBox: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '900', marginBottom: 8 },
  instruction: { color: '#c4b5fd', fontSize: 13, marginBottom: 12, fontStyle: 'italic' },
  partBox: { marginLeft: 12, marginBottom: 8 },
  partText: { color: '#e2e8f0', fontSize: 14, lineHeight: 22 },
  marks: { color: '#a78bfa', fontSize: 13 },
  subpartText: { color: '#cbd5e1', fontSize: 13, lineHeight: 20, marginLeft: 16, marginTop: 4 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 56, marginBottom: 16 },
  emptyText: { color: '#a78bfa', fontSize: 16, textAlign: 'center' },
});
