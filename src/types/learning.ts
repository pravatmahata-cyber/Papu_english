export type EnglishLevel = "beginner"|"elementary"|"intermediate"|"upper_intermediate"|"advanced";
export type LearningGoal = "confidence"|"pronunciation"|"grammar"|"interview"|"travel"|"workplace"|"everyday"|"academic";
export type DailyGoalMinutes = 5|10|15|20|30|45;

export type RecordingState = "IDLE"|"LISTENING"|"RECORDING"|"PROCESSING"|"ANALYZING"|"SUCCESS"|"ERROR";

export interface PronunciationResult {
  overall?: number; pronunciation?: number; fluency?: number; accuracy?: number; completeness?: number;
  words: Array<{expected:string; recognized?:string; score?:number; issue?:string}>;
  provider: string;
}
