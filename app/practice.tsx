import { useRef, useState } from "react";
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder } from "expo-audio";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { prepareRecording, stopRecording } from "../src/services/speech/recorder";

export default function Practice() {
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recordingRef = useRef(recorder);
  const [state, setState] = useState<"idle" | "recording" | "processing" | "ready" | "error">("idle");
  const [uri, setUri] = useState<string | null>(null);
  const [message, setMessage] = useState("Tap the microphone and speak naturally.");

  const toggle = async () => {
    if (state === "recording") {
      setState("processing");
      try {
        const u = await stopRecording(recordingRef.current);
        setUri(u);
        setMessage("Recording saved locally. Server-side speech analysis is not configured yet.");
        setState("ready");
      } catch (e) {
        setMessage(e instanceof Error ? e.message : "Could not stop recording.");
        setState("error");
      }
      return;
    }

    try {
      const permission = await AudioModule.requestRecordingPermissionsAsync();
      if (!permission.granted) {
        throw new Error("Microphone permission was denied.");
      }
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      recordingRef.current = recorder;
      setUri(null);
      await prepareRecording(recordingRef.current);
      setMessage("Listening… say the sentence clearly.");
      setState("recording");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Microphone could not start.");
      setState("error");
    }
  };

  return <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F8FC", padding: 24 }}>
    <Text style={{ fontSize: 32, fontWeight: "800", marginTop: 24 }}>Speak Now</Text>
    <Text style={{ fontSize: 17, color: "#656A7A", marginTop: 10 }}>“I want to speak English with confidence.”</Text>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 22 }}>
      <Pressable onPress={toggle} style={{ width: 150, height: 150, borderRadius: 75, backgroundColor: state === "recording" ? "#E5484D" : "#5B5FEF", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "800" }}>{state === "recording" ? "Stop" : "Speak"}</Text>
      </Pressable>
      <Text style={{ textAlign: "center", fontSize: 16, color: "#555", maxWidth: 320 }}>{message}</Text>
      {uri && <Text style={{ fontSize: 13, color: "#777" }}>Audio ready for upload.</Text>}
    </View>
  </SafeAreaView>;
}
