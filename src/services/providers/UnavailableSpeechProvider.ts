import type { PronunciationProvider, SpeechToTextProvider, TTSProvider, TranscriptionResult } from "@/services/speech/types";
import type { PronunciationResult } from "@/types/learning";

const unavailable = () => { throw new Error("Speech provider is not configured on the server."); };

export const speechToTextProvider: SpeechToTextProvider = { transcribeAudio: async (_uri):Promise<TranscriptionResult> => unavailable() };
export const pronunciationProvider: PronunciationProvider = { analyze: async (_input):Promise<PronunciationResult> => unavailable() };
export const ttsProvider: TTSProvider = { speak: async (_text) => unavailable() };
