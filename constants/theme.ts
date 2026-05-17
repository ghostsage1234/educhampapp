export const COLORS = {
  bg1: "#0a0820",
  bg2: "#12103a",
  purple: "#7c3aed",
  purple2: "#4f46e5",
  white: "#ffffff",
  glass: "rgba(255,255,255,0.07)",
  glassBorder: "rgba(255,255,255,0.15)",
};

export const SUBJECTS = {
  "Primary 1": ["Mathematics","English Language","Science","OWOP","RME","Creative Arts","Ghanaian Language","PE","History","Computing"],
  "Primary 2": ["Mathematics","English Language","Science","OWOP","RME","Creative Arts","Ghanaian Language","PE","History","Computing"],
  "Primary 3": ["Mathematics","English Language","Science","OWOP","RME","Creative Arts","Ghanaian Language","PE","History","Computing"],
  "Primary 4": ["Mathematics","English Language","Science","OWOP","RME","Creative Arts","Ghanaian Language","PE","History","Computing","French"],
  "Primary 5": ["Mathematics","English Language","Science","OWOP","RME","Creative Arts","Ghanaian Language","PE","History","Computing","French"],
  "Primary 6": ["Mathematics","English Language","Science","OWOP","RME","Creative Arts","Ghanaian Language","PE","History","Computing","French"],
  "JHS 1": ["Mathematics","English Language","Integrated Science","Social Studies","RME","Career Technology","Creative Arts and Design","Computing","Ghanaian Language","French"],
  "JHS 2": ["Mathematics","English Language","Integrated Science","Social Studies","RME","Career Technology","Creative Arts and Design","Computing","Ghanaian Language","French"],
  "JHS 3": ["Mathematics","English Language","Integrated Science","Social Studies","RME","Career Technology","Creative Arts and Design","Computing","Ghanaian Language","French"]
};

export const SUBJECT_COLORS: Record<string,string> = {
  "Mathematics": "#f59e0b",
  "English Language": "#3b82f6",
  "Science": "#10b981",
  "Integrated Science": "#10b981",
  "OWOP": "#8b5cf6",
  "Social Studies": "#8b5cf6",
  "RME": "#ec4899",
  "Creative Arts": "#f97316",
  "Creative Arts and Design": "#f97316",
  "Ghanaian Language": "#14b8a6",
  "PE": "#06b6d4",
  "History": "#a16207",
  "Computing": "#6366f1",
  "French": "#ef4444",
  "Career Technology": "#84cc16"
};

export const SUBJECT_ICONS: Record<string,string> = {
  "Mathematics": "🔢",
  "English Language": "📖",
  "Science": "🔬",
  "Integrated Science": "⚗️",
  "OWOP": "🌍",
  "Social Studies": "🌏",
  "RME": "🕌",
  "Creative Arts": "🎨",
  "Creative Arts and Design": "🖌️",
  "Ghanaian Language": "🗣️",
  "PE": "⚽",
  "History": "📜",
  "Computing": "💻",
  "French": "🇫🇷",
  "Career Technology": "🔧"
};

export const EXAM_TYPES = [
  "1st Term Exam",
  "2nd Term Exam",
  "3rd Term Exam",
  "1st Term Mid-Term",
  "2nd Term Mid-Term",
  "3rd Term Mid-Term"
];

export const getRank = (pct: number) => {
  if (pct === 100) return {label:"Champion 🏆", color:"#ffd700"};
  if (pct >= 80) return {label:"Excellent ⭐", color:"#22c55e"};
  if (pct >= 60) return {label:"Great 📈", color:"#3b82f6"};
  if (pct >= 40) return {label:"Learner 📚", color:"#f59e0b"};
  return {label:"Keep Going 💪", color:"#ef4444"};
};
