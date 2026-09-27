import type { AIProvider } from "@/services/ai/types";
export const aiProvider: AIProvider = { reply: async () => { throw new Error("AI provider is not configured on the server."); } };
