
import { GoogleGenAI, Type } from "@google/genai";

const getGeminiClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please ensure process.env.API_KEY is configured.");
  }
  return new GoogleGenAI({ apiKey });
};

export const getAcademicAnalysis = async (studentData: any) => {
  try {
    const ai = getGeminiClient();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this SVNIT student's status and provide a 2-sentence tactical summary of their biggest priority. 
      Data: ${JSON.stringify(studentData)}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 150,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Analysis Error:", error);
    return "Unable to generate real-time analysis at this moment. Focus on maintaining subjects above 75%.";
  }
};

export const createAcademicChat = () => {
  const ai = getGeminiClient();
  return ai.chats.create({
    model: "gemini-3-pro-preview",
    config: {
      systemInstruction: `You are the SVNIT Academic Mentor. 
      You help students navigate their academic journey at Sardar Vallabhbhai National Institute of Technology.
      Be encouraging, data-driven, and familiar with the SVNIT SOP (75% attendance rule, CGPA importance).
      If the student asks about specific data, refer to their dashboard values.`,
      temperature: 0.9,
    },
  });
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
