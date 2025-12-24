
import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const geminiService = {
  /**
   * Analyzes a resolution text against a fiduciary framework.
   */
  async analyzeResolution(agendaText: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze the following board resolution text based on a fiduciary framework for an Independent Director.
      Provide:
      1. A simplified title for the resolution.
      2. 3 Pros (benefits to stakeholders/company).
      3. 3 Cons or Potential Risks.
      4. 5 Specific Suggested Inquiries (questions to ask management).
      5. Risk Level (Low, Medium, High).
      6. A brief Compliance Note.

      Resolution Text: ${agendaText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            pros: { type: Type.ARRAY, items: { type: Type.STRING } },
            cons: { type: Type.ARRAY, items: { type: Type.STRING } },
            inquiries: { type: Type.ARRAY, items: { type: Type.STRING } },
            riskLevel: { type: Type.STRING },
            complianceNotes: { type: Type.STRING }
          },
          required: ["title", "pros", "cons", "inquiries", "riskLevel", "complianceNotes"]
        }
      }
    });

    return JSON.parse(response.text);
  },

  /**
   * Summarizes meeting minutes from a collection of snippets.
   */
  async summarizeMinutes(snippets: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `As an executive assistant to a board director, summarize these meeting notes.
      Identify:
      - Key Decisions
      - Action Items (with owners if mentioned)
      - Significant Dissenting Notes or Concerns Raised
      - Next Steps

      Notes: ${snippets}`,
    });

    return response.text;
  },

  /**
   * Generates a professional summary for an annual report from track record entries.
   */
  async generateTrackRecordSummary(records: any[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Convert the following impact logs of an Independent Director into a professional, executive summary suitable for a Corporate Governance section of an Annual Report. Focus on oversight, fiduciary duty, and stakeholder value.

      Impact Logs: ${JSON.stringify(records)}`,
    });

    return response.text;
  }
};
