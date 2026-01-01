
import { GoogleGenAI, Type } from "@google/genai";
import { Employee, CardData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateQuotesForEmployees = async (
  employees: Employee[],
  companyName: string,
  referencePhoto?: string | null
): Promise<CardData[]> => {
  const employeeNames = employees.map(e => e.name).join(", ");
  
  const textPart = {
    text: `Generate a unique, heartwarming, and professional "Happy New Year 2026" appreciation quote for each of the following team members: ${employeeNames}. 
    The quotes should express sincere gratitude for being part of our team at "${companyName}" throughout 2025 and looking forward to an even better 2026. 
    Keep each quote between 20-40 words. 
    ${referencePhoto ? "I have attached a reference photo of our team/office. Please try to make the tone of the quotes reflect the vibe or energy seen in this photo." : ""}
    
    Return the results as a JSON array of objects. Each object should have 'name' and 'quote' fields.`
  };

  const contents: any = referencePhoto ? {
    parts: [
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: referencePhoto.split(',')[1],
        },
      },
      textPart
    ]
  } : textPart;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              quote: { type: Type.STRING }
            },
            required: ["name", "quote"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    const parsed: { name: string; quote: string }[] = JSON.parse(text);
    
    return employees.map(emp => {
      const generated = parsed.find(p => p.name.toLowerCase().includes(emp.name.toLowerCase())) 
                        || parsed[0] 
                        || { name: emp.name, quote: "Thank you for being an essential part of our success as we head into 2026. Happy New Year!" };
      
      return {
        employeeId: emp.id,
        name: emp.name,
        quote: generated.quote
      };
    });
  } catch (error) {
    console.error("Error generating quotes:", error);
    return employees.map(emp => ({
      employeeId: emp.id,
      name: emp.name,
      quote: `Your hard work and dedication have been invaluable to our team. Wishing you a joyful 2026 filled with success and happiness!`
    }));
  }
};
