import type { PronunciationResult } from "@/types/learning";

export interface TranscriptionResult {
  transcript:string;
  detectedLanguage?:string;
  confidence?:number;
  timestamps?:Array<{word:string; start:number; end:number}>;
}
export interface SpeechToTextProvider { transcribeAudio(uri:string):Promise<TranscriptionResult>; }
export interface PronunciationProvider { analyze(input:{audioUri:string; expectedText:string; transcript:string}):Promise<PronunciationResult>; }
export interface TTSProvider { speak(text:string):Promise<void>; }
