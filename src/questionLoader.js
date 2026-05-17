import { P1_QUESTIONS } from './p1questions';
import { P2_QUESTIONS } from './p2questions';
import { P3_QUESTIONS } from './p3questions';
import { P4_QUESTIONS } from './p4questions';
import { P5_QUESTIONS } from './p5questions';
import { P6_QUESTIONS } from './p6questions';

const ALL_QUESTIONS = {
  ...P1_QUESTIONS,
  ...P2_QUESTIONS,
  ...P3_QUESTIONS,
  ...P4_QUESTIONS,
  ...P5_QUESTIONS,
  ...P6_QUESTIONS,
};

export function getQuestions(className, subject, examType) {
  try {
    const classData = ALL_QUESTIONS[className];
    if (!classData) return null;
    const subjectData = classData[subject];
    if (!subjectData) return null;
    const questions = subjectData[examType];
    if (!questions || questions.length === 0) return null;
    return questions;
  } catch (e) {
    return null;
  }
}

export function shuffleQuestions(questions, max = 20) {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(max, shuffled.length));
}
