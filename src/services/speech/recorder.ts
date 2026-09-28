import { AudioRecorder, RecordingPresets } from "expo-audio";

export type RecordingHandle = AudioRecorder;

export async function prepareRecording(recorder: RecordingHandle): Promise<void> {
  await recorder.prepareToRecordAsync({
    ...RecordingPresets.HIGH_QUALITY,
    directory: "document",
  });
  recorder.record();
}

export async function stopRecording(recorder: RecordingHandle): Promise<string> {
  await recorder.stop();
  const uri = recorder.uri;
  if (!uri) throw new Error("Recording finished without an audio file.");
  return uri;
}
