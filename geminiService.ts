
import { GoogleGenAI, Type } from "@google/genai";

const getGeminiClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getDecisionAdvice = async (context: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are an expert academic advisor for SVNIT students. Based on the following student dashboard context, provide a concise, high-impact recommendation (max 100 words) on how to improve or what to prioritize next. Context: ${context}`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 250,
    },
  });
  return response.text;
};

export const getAttendClassDecision = async (subject: string, attendance: number, importance: string) => {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Student wants to know if they should attend the next ${subject} class. Current attendance: ${attendance}%. Topic importance: ${importance}. Use the SVNIT SOP rules: 75% is critical. Provide a 'Yes' or 'No' decision with a 1-sentence reason.`,
    config: {
      temperature: 0.2,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          decision: { type: Type.STRING },
          reason: { type: Type.STRING }
        },
        required: ["decision", "reason"]
      }
    }
  });
  return JSON.parse(response.text || "{}");
};
