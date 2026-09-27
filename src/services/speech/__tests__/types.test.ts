import type { RecordingState } from "@/types/learning";
test("recording state contract includes processing states",()=>{const states:RecordingState[]=["IDLE","LISTENING","RECORDING","PROCESSING","ANALYZING","SUCCESS","ERROR"]; expect(states).toHaveLength(7);});
