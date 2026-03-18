
import { GoogleGenAI, Type } from "@google/genai";
import { AIInsight } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getMarketInsights(marketName: string, productCount: number): Promise<AIInsight | null> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a brief agricultural market insight for ${marketName} in Kaduna State, Nigeria. 
      The user is viewing ${productCount} products. 
      Provide a market condition overview, 3 actionable trading tips, and an outlook (bullish, bearish, or neutral).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            marketCondition: { type: Type.STRING },
            tradingTips: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            outlook: { 
              type: Type.STRING,
              enum: ['bullish', 'bearish', 'neutral']
            }
          },
          required: ["marketCondition", "tradingTips", "outlook"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text.trim()) as AIInsight;
    }
    return null;
  } catch (error) {
    console.error("Gemini Insight Error:", error);
    return null;
  }
}
